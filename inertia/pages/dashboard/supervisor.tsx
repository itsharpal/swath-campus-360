import { Link } from '@adonisjs/inertia/react'

interface Stats {
  totalJobs: number
  pendingJobs: number
  activeJobs: number
  completedJobs: number
}

interface Job {
  id: number
  status: string
  zone?: { name: string }
  complaint?: { complaintCode: string }
}

interface Props {
  stats: Stats
  recentJobs: Job[]
}

export default function SupervisorDashboard({ stats, recentJobs }: Props) {

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Supervisor Dashboard
      </h1>

      {/* Stats */}

      <div className="grid grid-cols-4 gap-4 mb-8">

        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Total Jobs</p>
          <p className="text-xl font-bold">{stats.totalJobs}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-xl font-bold">{stats.pendingJobs}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="text-xl font-bold">{stats.activeJobs}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-xl font-bold">{stats.completedJobs}</p>
        </div>

      </div>

      {/* Recent Jobs */}

      <div className="bg-white shadow rounded">

        <h2 className="text-lg font-semibold p-4 border-b">
          Recent Jobs
        </h2>

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Job</th>
              <th className="p-3 text-left">Zone</th>
              <th className="p-3 text-left">Complaint</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left"></th>
            </tr>
          </thead>

          <tbody>

            {recentJobs.map((job) => (
              <tr key={job.id} className="border-t">

                <td className="p-3">#{job.id}</td>

                <td className="p-3">
                  {job.zone?.name ?? '-'}
                </td>

                <td className="p-3">
                  {job.complaint?.complaintCode ?? '-'}
                </td>

                <td className="p-3 capitalize">
                  {job.status}
                </td>

                <td className="p-3">

                  <Link
                    href={`/job-cards/${job.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}
