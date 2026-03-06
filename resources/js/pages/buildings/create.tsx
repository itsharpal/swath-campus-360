import { useForm } from '@inertiajs/react'
import React from 'react'

export default function CreateBuilding() {

  const { data, setData, post } = useForm({
    name: '',
    code: '',
    description: '',
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    post('/buildings')
  }

  return (
    <div className="p-8 max-w-xl">

      <h1 className="text-2xl font-bold mb-6">
        Create Building
      </h1>

      <form onSubmit={submit} className="space-y-4">

        <input
          placeholder="Building Name"
          value={data.name}
          onChange={(e) => setData('name', (e.target as any).value)}
          className="border p-3 w-full rounded"
        />

        <input
          placeholder="Code"
          value={data.code}
          onChange={(e) => setData('code', (e.target as any).value)}
          className="border p-3 w-full rounded"
        />

        <textarea
          placeholder="Description"
          value={data.description}
          onChange={(e) => setData('description', (e.target as any).value)}
          className="border p-3 w-full rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>

      </form>

    </div>
  )
}