import { usePage, router } from "@inertiajs/react"
import React, { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"

export default function FloorsPage() {

  // const { building, floors }: any = usePage().props
  const page: any = usePage()
const building = page.props.building
const floors = page.props.floors

  const [floorNumber, setFloorNumber] = useState("")
  const [name, setName] = useState("")

  function createFloor(e: React.FormEvent) {
    e.preventDefault()

    router.post(`/buildings/${building.id}/floors`, {
      floorNumber,
      name,
    })
  }

  function deleteFloor(id: number) {
    // @ts-ignore
    if (!confirm("Delete this floor?")) return

    router.delete(`/floors/${id}`)
  }

  return (
    <div className="p-8">

      {/* <h1 className="text-3xl font-bold mb-8">
        {building.name} Floors
      </h1> */}

      {/* Create Floor */}
      <div className="flex justify-between items-center mb-8">

  <h1 className="text-3xl font-bold">
    {building.name} Floors
  </h1>

  <button
    onClick={() => router.visit(`/buildings/${building.id}/floors/create`)}
    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
  >
    <Plus size={18} />
    Add Floor
  </button>

</div>
      {/* Floors Grid */}

      <div className="grid grid-cols-3 gap-6">

        {floors.map((floor: any) => (
          <div
            key={floor.id}
            className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition"
          >

            <h3 className="text-xl font-semibold">
              Floor {floor.floorNumber}
            </h3>

            <p className="text-gray-500 mt-1">
              {floor.name}
            </p>

            <p className="text-sm text-gray-400 mt-3">
              Zones: {floor.zones.length}
            </p>

            <div className="flex gap-3 mt-6">

              <button
                className="flex items-center gap-1 text-blue-600"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                onClick={() => deleteFloor(floor.id)}
                className="flex items-center gap-1 text-red-600"
              >
                <Trash2 size={16} />
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

      {floors.length === 0 && (
        <p className="text-gray-500 mt-6">
          No floors added yet.
        </p>
      )}

    </div>
  )
}