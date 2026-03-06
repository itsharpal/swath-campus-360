interface Zone {
  id: number
  name: string
  complaints: number
}

interface Props {
  zones: Zone[]
}

export default function HeatmapAnalytics({ zones }: Props) {

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Zone Complaint Heatmap
      </h1>

      <div className="grid grid-cols-3 gap-4">

        {zones.map((z) => (
          <div
            key={z.id}
            className="p-4 rounded shadow bg-white"
          >
            <p className="font-semibold">{z.name}</p>

            <p className="text-gray-600">
              Complaints: {z.complaints}
            </p>
          </div>
        ))}

      </div>

    </div>
  )
}
