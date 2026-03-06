import { useForm, usePage } from "@inertiajs/react"
import React from "react"

export default function EditZone() {

  const page: any = usePage()
//   const zone = page.props.zone
const zone = page.props.zone || {}

  const { data, setData, put, processing, errors } = useForm({
    name: zone?.name || "",
  zoneTypeId: zone?.zoneTypeId || "",
  cleaningFrequencyHours: zone?.cleaningFrequencyHours || 4,
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    put(`/zones/${zone.id}`)
  }

  if (!zone) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8 max-w-xl">

      <h1 className="text-2xl font-bold mb-6">
        Edit Zone
      </h1>

      <form onSubmit={submit} className="space-y-4">

        <input
          className="border p-3 rounded w-full"
          value={data.name}
          onChange={(e) => setData("name", (e.target as any).value)}
        />

        <input
          type="number"
          className="border p-3 rounded w-full"
          value={data.zoneTypeId}
          onChange={(e) =>
            setData("zoneTypeId", Number((e.target as any).value))
          }
        />

        <input
          type="number"
          className="border p-3 rounded w-full"
          value={data.cleaningFrequencyHours}
          onChange={(e) =>
            setData("cleaningFrequencyHours", Number((e.target as any).value))
          }
        />

        <button
          disabled={processing}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Zone
        </button>

      </form>

    </div>
  )
}