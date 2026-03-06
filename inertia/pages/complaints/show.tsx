import { Link } from '@adonisjs/inertia/react'
import { router } from '@inertiajs/react'

interface Complaint {
  id: number
  complaintCode: string
  description: string | null
  status: string
  priority: string
  createdAt?: string
  resolutionRemark?: string | null
  zone?: { name: string }
  building?: { name: string }
  floor?: { name: string }
  category?: { name: string }
}

interface Props {
  complaint: Complaint
}

export default function ComplaintShow({ complaint }: Props) {
  function markInProgress() {
    router.put(`/complaints/${complaint.id}/status`, {
      status: 'in_progress',
    })
  }

  return (
    <div className="p-6 max-w-xl">

      <h1 className="text-2xl font-bold mb-4">
        Complaint {complaint.complaintCode}
      </h1>

      <div className="space-y-2">

        <p>
          <b>Zone:</b> {complaint.zone?.name}
        </p>

        <p>
          <b>Category:</b> {complaint.category?.name}
        </p>

        <p>
          <b>Building:</b> {complaint.building?.name ?? '-'}
        </p>

        <p>
          <b>Floor:</b> {complaint.floor?.name ?? '-'}
        </p>

        <p>
          <b>Status:</b> {complaint.status}
        </p>

        <p>
          <b>Priority:</b> {complaint.priority}
        </p>

        <p>
          <b>Description:</b> {complaint.description ?? '-'}
        </p>

        {complaint.resolutionRemark && (
          <p>
            <b>Resolution Remark:</b> {complaint.resolutionRemark}
          </p>
        )}

      </div>

      <div className="mt-6 flex gap-3">
        {complaint.status === 'open' && (
          <button
            onClick={markInProgress}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Mark In Progress
          </button>
        )}

        {complaint.status !== 'resolved' && (
          <Link href={`/complaints/${complaint.id}/resolve`} className="px-4 py-2 bg-green-600 text-white rounded">
            Resolve Complaint
          </Link>
        )}
      </div>
    </div>
  )
}
