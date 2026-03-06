import React from "react"
import { router } from "@inertiajs/react"

export default function ShowZone({ zone }: any) {

  if (!zone) return <div>Loading...</div>

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold">
        {zone.name}
      </h1>

      <p className="text-gray-500 mt-2">
        Zone Type: {zone.zoneType?.name}
      </p>

      <p className="mt-4">
        Cleaning Frequency: {zone.cleaningFrequencyHours} hours
      </p>

      <p className="mt-4">
        Cleanliness Score: {zone.cleanlinessScore}
      </p>

      <div className="mt-8 flex gap-4">

        <button
          onClick={() => router.visit(`/zones/${zone.id}/edit`)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => router.visit(`/zones/${zone.id}/qr`)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Generate QR
        </button>

      </div>

    </div>
  )
}