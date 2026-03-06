import React from "react";

export default function AppLayout({ children }: any) {

  return (
    <div className="flex">

      <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">

        <h1 className="text-2xl font-bold mb-6">
          Campus360
        </h1>

        <nav className="space-y-4">

          <a href="/dashboard">Dashboard</a>
          <a href="/buildings">Buildings</a>
          <a href="/zones">Zones</a>
          <a href="/complaints">Complaints</a>

        </nav>

      </aside>

      <main className="flex-1 bg-gray-100 min-h-screen">

        {children}

      </main>

    </div>
  )
}