import { Link } from '@adonisjs/inertia/react'
import { router } from '@inertiajs/react'

interface Zone {
  id: number
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
  createdAt: string
}

interface Props {
  jobs: Job[]
}

export default function JobQueue({ jobs }: Props) {
  function startJob(id: number) {
    router.put(`/job-cards/${id}/start`, {
      status: 'in_progress',
    })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Supervisor Job Queue</h1>

      <div className="bg-white shadow rounded">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Job</th>
              <th className="p-3 text-left">Zone</th>
              <th className="p-3 text-left">Complaint</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-t">
                <td className="p-3">#{job.id}</td>

                <td className="p-3">{job.zone?.name ?? '-'}</td>

                <td className="p-3">{job.complaint?.complaintCode ?? '-'}</td>

                <td className="p-3 capitalize">{job.type}</td>

                <td className="p-3 capitalize">{job.status}</td>

                <td className="p-3 flex gap-3">
                  <Link href={`/job-cards/${job.id}`} className="text-blue-600 hover:underline">
                    View
                  </Link>

                  {job.status === 'pending' && (
                    <button
                      onClick={() => startJob(job.id)}
                      className="text-green-600 hover:underline"
                    >
                      Start
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
