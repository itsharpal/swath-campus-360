import { useForm, usePage } from "@inertiajs/react"
import React from "react"

export default function EditBuilding({ building }: any) {

  // const page: any = usePage()
  // const building = page.props.building

  const { data, setData, put } = useForm({
  name: building.name,
  code: building.code,
  description: building.description,
  supervisorId: building.supervisorId ?? "",
})

  function submit(e: React.FormEvent) {
  e.preventDefault()

  put(`/buildings/${building.id}`)
}

  if (!building) return <div>Loading...</div>

  return (
    <div className="p-8 max-w-xl">

      <h1 className="text-2xl font-bold mb-6">
        Edit Building
      </h1>

      <form onSubmit={submit} className="space-y-4">

         <input
          className="border p-3 rounded w-full"
          value={data.name}
          onChange={(e) => setData("name", e.currentTarget.value)}
          placeholder="Building Name"
        />

        <input
          className="border p-3 rounded w-full"
          value={data.code}
          onChange={(e) => setData("code", e.currentTarget.value)}
          placeholder="Building Code"
        />
        {/* <input
          className="border p-3 rounded w-full"
          value={data.name}
          onChange={(e) => setData("name", (e.target as any).value)}
        /> */}
        <textarea
          className="border p-3 rounded w-full"
          value={data.description}
          onChange={(e) => setData("description", e.currentTarget.value)}
          placeholder="Description"
        />

        {/* <textarea
          className="border p-3 rounded w-full"
          value={data.description}
          onChange={(e) => setData("description", (e.target as any).value)}
        /> */}

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Update
        </button>

      </form>

    </div>
  )
}