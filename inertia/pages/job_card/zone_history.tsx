interface ZoneJob {
  id: number
  status: string
  type: string
  completedAt?: string
  supervisor?: {
    name: string
  }
}

interface Props {
  jobs: ZoneJob[]
}

export default function ZoneHistory({ jobs }: Props) {

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Zone Job History
      </h1>

      <div className="bg-white shadow rounded">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Job</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Supervisor</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Completed</th>
            </tr>
          </thead>

          <tbody>

            {jobs.map((job) => (
              <tr key={job.id} className="border-t">

                <td className="p-3">#{job.id}</td>

                <td className="p-3 capitalize">
                  {job.type}
                </td>

                <td className="p-3">
                  {job.supervisor?.name ?? '-'}
                </td>

                <td className="p-3 capitalize">
                  {job.status}
                </td>

                <td className="p-3">
                  {job.completedAt ?? '-'}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}
