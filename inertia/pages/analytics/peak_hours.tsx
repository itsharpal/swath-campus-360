interface HourData {
  hour: number
  total: number
}

interface Props {
  hours: HourData[]
}

export default function PeakHours({ hours }: Props) {

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Peak Complaint Hours
      </h1>

      <div className="bg-white shadow rounded">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Hour</th>
              <th className="p-3 text-left">Complaints</th>
            </tr>
          </thead>

          <tbody>

            {hours.map((h, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{h.hour}:00</td>
                <td className="p-3">{h.total}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}
