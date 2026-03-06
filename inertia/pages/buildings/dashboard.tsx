import React from "react"

export default function Dashboard({ building, stats }: any) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        {building.name} Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">

        <div className="p-4 bg-white shadow rounded">
          <p className="text-gray-500">Zones</p>
          <p className="text-2xl font-bold">{stats.zones}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <p className="text-gray-500">Complaints</p>
          <p className="text-2xl font-bold">{stats.complaints}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <p className="text-gray-500">Open Complaints</p>
          <p className="text-2xl font-bold">{stats.openComplaints}</p>
        </div>

      </div>
    </div>
  )
}