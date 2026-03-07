import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ComplaintService from '#services/complaint_service'
import Zone from '#models/zone'
import Building from '#models/building'
import Floor from '#models/floor'
import ComplaintCategory from '#models/complaint_category'
// Runtime import: use the package path so Node can resolve without IoC loader
// Use a runtime package import so Node can resolve Application when IoC alias
// resolution isn't active (some dev setups run files without the Adonis loader).
// @ts-ignore: runtime-only module resolution
// Use process.cwd() + /public/uploads to avoid importing Adonis Application here.
import fs from 'node:fs'
import path from 'node:path'

import {
  createComplaintValidator,
  updateStatusValidator,
  resolveComplaintValidator,
} from '#validators/complaint'

@inject()
export default class ComplaintsController {
  constructor(private complaintService: ComplaintService) {}

  private canManageComplaint(user?: { id?: number; roleId?: number | null }) {
    if (!user?.id) {
      return false
    }

    const roleId = Number(user.roleId ?? 0)
    return roleId !== 4 && roleId !== 5
  }

  /**
   * GET /complaints/create
   */
  async create({ request, inertia }: HttpContext) {
    const zoneRecords = await Zone.query().orderBy('name', 'asc')
    const categoryRecords = await ComplaintCategory.query().orderBy('name', 'asc')
    const buildingRecords = await Building.query().orderBy('name', 'asc')
    const floorRecords = await Floor.query().orderBy('name', 'asc')

    const zones = zoneRecords.map((zone) => zone.serialize())
    const categories = categoryRecords.map((category) => category.serialize())
    const buildings = buildingRecords.map((b) => b.serialize())
    const floors = floorRecords.map((f) => f.serialize())

    // Prefill values if provided via query params (e.g. from QR redirect)
    const prefillZoneId = Number(request.input('zoneId', 0))
    const prefillBuildingId = Number(request.input('buildingId', 0))
    const prefillFloorId = Number(request.input('floorId', 0))

    return inertia.render(
      'complaints/create' as any,
      {
        zones,
        categories,
        buildings,
        floors,
        prefillZoneId,
        prefillBuildingId,
        prefillFloorId,
      } as any
    )
  }

  /**
   * GET /complaints
   */
  async index({ inertia, auth }: HttpContext) {
    const complaintRecords = await this.complaintService.list({
      rankPublic: true,
      viewerUserId: auth.user?.id,
      statuses: ['open', 'in_progress', 'overdue'],
    })

    const complaints = complaintRecords.map((complaint) => ({
      ...complaint.serialize(),
      upvoteCount: Number(complaint.$extras.upvoteCount ?? 0),
      isTeacherPriority: Boolean(complaint.$extras.isTeacherPriority),
      hasUpvoted: Boolean(complaint.$extras.hasUpvoted),
    }))

    return inertia.render(
      'complaints/index' as any,
      {
        complaints,
      } as any
    )
  }

  /**
   * GET /complaints/:id
   */
  async show({ params, inertia, auth }: HttpContext) {
    const complaintRecord = await this.complaintService.findById(Number(params.id))
    const complaint = complaintRecord.serialize()
    const canManageActions = this.canManageComplaint(auth.user)

    return inertia.render(
      'complaints/show' as any,
      {
        complaint,
        canManageActions,
      } as any
    )
  }

  /**
   * GET /complaints/:id/resolve
   */
  async showResolve({ params, inertia, auth, response, session }: HttpContext) {
    const complaintRecord = await this.complaintService.findById(Number(params.id))

    if (!this.canManageComplaint(auth.user)) {
      session.flash('error', 'Only non-student and non-teacher roles can resolve this complaint.')
      return response.redirect(`/complaints/${params.id}`)
    }

    const complaint = complaintRecord.serialize()

    return inertia.render(
      'complaints/resolve' as any,
      {
        complaint,
      } as any
    )
  }

  /**
   * POST /complaints
   */
  async store({ request, auth, response, session }: HttpContext) {
    if (!auth.user) {
      session.flash('error', 'Please login to submit a complaint.')
      return response.redirect('/login')
    }

    const payload = await request.validateUsing(createComplaintValidator)
    const uploadedFile = request.file('complaintPhoto', {
      size: '10mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp'],
    })

    let photoUrl: string | null = null

    if (uploadedFile) {
      if (!uploadedFile.isValid) {
        session.flash('error', 'Invalid complaint image. Please upload a JPG, PNG, or WEBP file up to 10MB.')
        return response.redirect().back()
      }

      const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'complaints')
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true })
      }

      const timestamp = Date.now()
      const clientName = uploadedFile.clientName || `complaint_${timestamp}`
      const safeName = `${timestamp}_${clientName.replace(/[^a-zA-Z0-9._-]/g, '_')}`

      await uploadedFile.move(uploadsDir, { name: safeName })
      photoUrl = path.posix.join('/uploads/complaints', safeName)
    }

    await this.complaintService.create(
      {
        ...payload,
        photoUrl,
      },
      auth.user.id
    )

    session.flash('success', 'Complaint submitted successfully')

    return response.redirect('/complaints')
  }

  /**
   * GET /complaints/track/:code
   */
  async track({ params, inertia }: HttpContext) {
    const complaintRecord = await this.complaintService.trackByCode(params.code)
    const complaint = complaintRecord.serialize()

    return inertia.render(
      'complaints/track' as any,
      {
        complaint,
      } as any
    )
  }

  /**
   * GET /complaints/my
   */
  async my({ auth, inertia }: HttpContext) {
    const complaintRecords = await this.complaintService.list({
      userId: auth.user!.id,
      viewerUserId: auth.user!.id,
    })

    const complaints = complaintRecords.map((complaint) => ({
      ...complaint.serialize(),
      upvoteCount: Number(complaint.$extras.upvoteCount ?? 0),
      isTeacherPriority: Boolean(complaint.$extras.isTeacherPriority),
      hasUpvoted: Boolean(complaint.$extras.hasUpvoted),
    }))

    return inertia.render(
      'complaints/my' as any,
      {
        complaints,
      } as any
    )
  }

  /**
   * PUT /complaints/:id/status
   */
  async markInProgress({ params, request, auth, response, session }: HttpContext) {
    await request.validateUsing(updateStatusValidator)

    if (!this.canManageComplaint(auth.user)) {
      session.flash('error', 'Only non-student and non-teacher roles can mark this complaint in progress.')
      return response.redirect(`/complaints/${params.id}`)
    }

    await this.complaintService.markInProgress(Number(params.id), auth.user!.id)

    return response.redirect().back()
  }

  /**
   * PUT /complaints/:id/resolve
   */
  async resolve({ params, request, response, session, auth }: HttpContext) {
    if (!this.canManageComplaint(auth.user)) {
      const isXhr =
        String(request.header('x-requested-with') || '').toLowerCase() === 'xmlhttprequest'
      const isInertia = !!request.header('x-inertia')

      if (isXhr || isInertia) {
        return response.status(403).json({
          success: false,
          message: 'Only non-student and non-teacher roles can resolve this complaint.',
        })
      }

      session.flash('error', 'Only non-student and non-teacher roles can resolve this complaint.')
      return response.redirect(`/complaints/${params.id}`)
    }

    const payload = await request.validateUsing(resolveComplaintValidator)
    // Handle uploaded file (multipart/form-data). Field name: resolutionPhoto
    const uploadedFile = request.file('resolutionPhoto', {
      size: '10mb',
      extnames: ['jpg', 'jpeg', 'png'],
    })

    if (!uploadedFile) {
      session.flash('error', 'Please attach a proof photo (camera capture).')
      return response.redirect().back()
    }

  // Ensure uploads directory exists under public
  // We avoid importing Adonis Application here to keep the controller resolvable
  // even when the IoC loader isn't active. Use process.cwd() to locate public.
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    // Build a safe filename and move file to public/uploads
    const timestamp = Date.now()
    const clientName = uploadedFile.clientName || `photo_${timestamp}`
    const safeName = `${timestamp}_${clientName.replace(/[^a-zA-Z0-9._-]/g, '_')}`

    await uploadedFile.move(uploadsDir, { name: safeName })

    // Store the public URL path (served from /uploads)
    const publicUrl = path.posix.join('/uploads', safeName)

    // Pass resolutionPhotoUrl as the stored public URL to the service
    const payloadWithPhoto = {
      ...payload,
      resolutionPhotoUrl: publicUrl,
    }

    await this.complaintService.resolve(Number(params.id), payloadWithPhoto)

    // If the request is an XHR/Inertia request, return JSON so fetch/ajax callers
    // don't receive a redirect (which can cause redirect loops and 'too many redirects').
    const isXhr = String(request.header('x-requested-with') || '').toLowerCase() === 'xmlhttprequest'
    const isInertia = !!request.header('x-inertia')

    if (isXhr || isInertia) {
      return response.status(200).json({ success: true, redirectUrl: `/complaints/${params.id}` })
    }

    return response.redirect().back()
  }

  /**
   * POST /complaints/:id/upvote
   */
  async upvote({ params, auth, response, session }: HttpContext) {
    const result = await this.complaintService.upvote(Number(params.id), Number(auth.user!.id))

    session.flash('success', result.hasUpvoted ? 'Upvote recorded' : 'Upvote removed')
    return response.redirect().back()
  }
}
