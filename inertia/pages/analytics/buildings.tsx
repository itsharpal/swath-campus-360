interface Building {
  id: number
  name: string
  totalComplaints: number
}

interface Props {
  buildings: Building[]
}

export default function BuildingsAnalytics({ buildings }: Props) {
  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Building Performance
      </h1>

      <div className="bg-white shadow rounded">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Building</th>
              <th className="p-3 text-left">Total Complaints</th>
            </tr>
          </thead>

          <tbody>
            {buildings.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-3">{b.name}</td>
                <td className="p-3">{b.totalComplaints}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  )
}
