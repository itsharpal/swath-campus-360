interface Trend {
  date: string
  total: number
}

interface Props {
  trends: Trend[]
}

export default function ComplaintTrends({ trends }: Props) {

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Complaint Trends
      </h1>

      <div className="bg-white shadow rounded">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Complaints</th>
            </tr>
          </thead>

          <tbody>

            {trends.map((t, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{t.date}</td>
                <td className="p-3">{t.total}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}
