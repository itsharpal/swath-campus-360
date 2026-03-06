interface Supervisor {
  id: number
  name: string
  completedJobs: number
}

interface Props {
  supervisors: Supervisor[]
}

export default function SupervisorRanking({ supervisors }: Props) {

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Supervisor Ranking
      </h1>

      <div className="bg-white shadow rounded">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Supervisor</th>
              <th className="p-3 text-left">Completed Jobs</th>
            </tr>
          </thead>

          <tbody>

            {supervisors.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.completedJobs}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}
