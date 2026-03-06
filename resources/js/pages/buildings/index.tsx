import { router } from "@inertiajs/react"
// import Card from "@/components/ui/card"
// import Button from "@/components/ui/button"
import React from "react"
import Card from "../../components/ui/card.tsx"
import Button from "../../components/ui/button.tsx"

export default function Buildings({ buildings }: any) {
  return (
    <div className="p-8">

      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Buildings</h1>

        <Button
          onClick={() => router.visit("/buildings/create")}
        >
          Add Building
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">

        {buildings.data.map((building: any) => (

          <Card key={building.id}>

            <h2 className="text-xl font-semibold">
              {building.name}
            </h2>

            <p className="text-gray-500">{building.code}</p>

            <p className="text-sm mt-2">
              {building.description}
            </p>

            <div className="flex gap-4 mt-4">

              <Button
                variant="secondary"
                onClick={() => router.visit(`/buildings/${building.id}`)}
              >
                View
              </Button>

              <Button
                variant="secondary"
                onClick={() => router.visit(`/buildings/${building.id}/edit`)}
              >
                Edit
              </Button>

              <Button
                variant="danger"
                // onClick={() => router.delete(`/buildings/${building.id}`)}
                onClick={() => {
                  // @ts-ignore
  if (confirm("Deactivate this building?")) {
    router.delete(`/buildings/${building.id}`)
  }
}}
              >
                Deactivate
              </Button>

            </div>

          </Card>

        ))}

      </div>

    </div>
  )
}