import React from "react";

export default function ShowBuilding({ building }: any) {

  if (!building) return <div>Loading...</div>

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold">
        {building.name}
      </h1>

      <p className="text-gray-500 mt-2">
        {building.code}
      </p>

      <p className="mt-4">
        {building.description}
      </p>

      <div className="mt-8">

        <h2 className="text-xl font-semibold mb-4">
          Floors
        </h2>

        <ul>
          {(building.floors || []).map((floor: any) => (
            <li key={floor.id}>
              Floor {floor.floorNumber} - {floor.name}
            </li>
          ))}
        </ul>

      </div>

    </div>
  )
}