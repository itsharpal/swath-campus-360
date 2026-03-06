import { router, usePage } from "@inertiajs/react"
import React from "react"
import { Plus, Pencil, Trash2, QrCode } from "lucide-react"

export default function ZonesIndex() {
  const page: any = usePage()

  const floor = page.props.floor
  const zones = page.props.zones

  function deleteZone(id: number) {
    //@ts-ignore
    if (!confirm("Delete this zone?")) return
    router.delete(`/zones/${id}`)
  }

  function showQr(id: number) {
    router.visit(`/zones/${id}/qr`)
  }

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {floor.name} Zones
        </h1>

        <button
          onClick={() => router.visit(`/floors/${floor.id}/zones/create`)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          <Plus size={18} />
          Add Zone
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">

        {zones?.map((zone: any) => (
          <div
            key={zone.id}
            className="bg-white shadow rounded-lg p-6 border"
          >

            <h3 className="text-xl font-semibold">
              {zone.name}
            </h3>

            <p className="text-gray-500 mt-2">
              Type: {zone.zoneType?.name}
            </p>

            <p className="text-sm text-gray-400 mt-2">
              Cleaning Frequency: {zone.cleaningFrequencyHours} hrs
            </p>

            <div className="flex gap-3 mt-6">

              <button
                onClick={() => router.visit(`/zones/${zone.id}`)}
                className="text-gray-700"
              >
                View
              </button>

              <button
                onClick={() => router.visit(`/zones/${zone.id}/edit`)}
                className="flex items-center gap-1 text-blue-600"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                onClick={() => showQr(zone.id)}
                className="flex items-center gap-1 text-green-600"
              >
                <QrCode size={16} />
                QR
              </button>

              <button
                onClick={() => deleteZone(zone.id)}
                className="flex items-center gap-1 text-red-600"
              >
                <Trash2 size={16} />
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

      {zones.length === 0 && (
        <p className="text-gray-500 mt-6">
          No zones added yet.
        </p>
      )}

    </div>
  )
}