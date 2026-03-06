import { useForm, usePage } from "@inertiajs/react"
import React from "react"

export default function CreateZone() {

  const page: any = usePage()
  const floor = page.props.floor

  const { data, setData, post, processing, errors } = useForm({
    name: "",
  zoneTypeId: 0,
  cleaningFrequencyHours: 4,
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    post(`/floors/${floor.id}/zones`)
  }

  return (
    <div className="p-8 max-w-xl">

      <h1 className="text-2xl font-bold mb-6">
        Create Zone
      </h1>

      <form onSubmit={submit} className="space-y-4">

        <input
          placeholder="Zone Name"
          className="border p-3 rounded w-full"
          value={data.name}
          onChange={(e) => setData("name", (e.target as any).value)}
        />

        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name}</p>
        )}

        <input
          type="number"
          placeholder="Zone Type ID"
          className="border p-3 rounded w-full"
          value={data.zoneTypeId}
          onChange={(e) =>
            setData("zoneTypeId", Number((e.target as any).value))
          }
        />

        <input
          type="number"
          placeholder="Cleaning Frequency (hours)"
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
          Create Zone
        </button>

      </form>

    </div>
  )
}