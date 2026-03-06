interface Stats {
  totalComplaints: number
  openComplaints: number
  resolvedComplaints: number
  activeJobs: number
  buildings: number
}

interface Complaint {
  id: number
  complaintCode: string
  status: string
  zone?: { name: string }
  category?: { name: string }
}

interface Props {
  stats: Stats
  recentComplaints: Complaint[]
}

export default function AdminDashboard({ stats, recentComplaints }: Props) {
  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* Stats */}

      <div className="grid grid-cols-5 gap-4 mb-8">

        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Total Complaints</p>
          <p className="text-xl font-bold">{stats.totalComplaints}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Open</p>
          <p className="text-xl font-bold">{stats.openComplaints}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Resolved</p>
          <p className="text-xl font-bold">{stats.resolvedComplaints}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Active Jobs</p>
          <p className="text-xl font-bold">{stats.activeJobs}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Buildings</p>
          <p className="text-xl font-bold">{stats.buildings}</p>
        </div>

      </div>

      {/* Recent Complaints */}

      <div className="bg-white shadow rounded">

        <h2 className="text-lg font-semibold p-4 border-b">
          Recent Complaints
        </h2>

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Zone</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>

            {recentComplaints.map((c) => (
              <tr key={c.id} className="border-t">

                <td className="p-3">{c.complaintCode}</td>

                <td className="p-3">
                  {c.zone?.name ?? '-'}
                </td>

                <td className="p-3">
                  {c.category?.name ?? '-'}
                </td>

                <td className="p-3 capitalize">
                  {c.status}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}
