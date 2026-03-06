import { Link } from '@adonisjs/inertia/react'

interface Complaint {
  id: number
  complaintCode: string
  status: string
  priority: string
  createdAt: string
  zone?: { name: string }
  category?: { name: string }
}

interface Props {
  complaints: Complaint[]
}

export default function ComplaintsIndex({ complaints }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Complaints</h1>

      <div className="bg-white shadow rounded">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Zone</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left"></th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.complaintCode}</td>
                <td className="p-3">{c.zone?.name}</td>
                <td className="p-3">{c.category?.name}</td>
                <td className="p-3">{c.status}</td>
                <td className="p-3">{c.priority}</td>

                <td className="p-3">
                  <Link
                    href={`/complaints/${c.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
