import { useForm, usePage } from "@inertiajs/react"
import React from "react"

export default function EditFloor() {

//   const { floor }: any = usePage().props

const page: any = usePage()
  const floor = page.props.floor

  const { data, setData, put, processing, errors } = useForm({
    floorNumber: floor?.floorNumber || "",
    name: floor?.name || "",
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()

    put(`/floors/${floor.id}`)
  }

  if (!floor) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8 max-w-xl">

      <h1 className="text-2xl font-bold mb-6">
        Edit Floor
      </h1>

      <form onSubmit={submit} className="space-y-4">

        <div>
          <label className="block mb-1 text-sm">Floor Number</label>

          <input
            type="number"
            className="border p-3 rounded w-full"
            value={data.floorNumber}
            onChange={(e) => setData("floorNumber", Number((e.target as any).value))}
          />

          {errors.floorNumber && (
            <p className="text-red-500 text-sm">{errors.floorNumber}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm">Floor Name</label>

          <input
            className="border p-3 rounded w-full"
            value={data.name}
            onChange={(e) => setData("name", (e.target as any).value)}
          />

          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>

        <button
          disabled={processing}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Floor
        </button>

      </form>

    </div>
  )
}