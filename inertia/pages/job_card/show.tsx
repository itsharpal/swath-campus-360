import { useForm } from '@inertiajs/react'

interface Zone {
  name: string
}

interface Complaint {
  complaintCode: string
}

interface Job {
  id: number
  status: string
  type: string
  zone?: Zone
  complaint?: Complaint
}

interface Props {
  job: Job
}

export default function JobDetails({ job }: Props) {
  const { data, setData, put, processing } = useForm({
    proofPhotoUrl: '',
    remark: '',
  })

  function submit(e: any) {
    e.preventDefault()

    put(`/job-cards/${job.id}/complete`)
  }

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Job #{job.id}</h1>

      <div className="space-y-2 mb-6">
        <p>
          <b>Status:</b> {job.status}
        </p>

        <p>
          <b>Type:</b> {job.type}
        </p>

        <p>
          <b>Zone:</b> {job.zone?.name}
        </p>

        <p>
          <b>Complaint:</b> {job.complaint?.complaintCode ?? '-'}
        </p>
      </div>

      {job.status === 'in_progress' && (
        <form onSubmit={(e) => submit(e)} className="space-y-4">
          <input
            placeholder="Proof Photo URL"
            className="w-full border p-2"
            value={data.proofPhotoUrl}
            onChange={(e) => setData('proofPhotoUrl', e.target.value)}
          />

          <textarea
            placeholder="Remark"
            className="w-full border p-2"
            value={data.remark}
            onChange={(e) => setData('remark', e.target.value)}
          />

          <button disabled={processing} className="px-4 py-2 bg-green-600 text-white rounded">
            Complete Job
          </button>
        </form>
      )}
    </div>
  )
}
