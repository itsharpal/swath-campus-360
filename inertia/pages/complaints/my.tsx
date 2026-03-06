import { Link } from '@adonisjs/inertia/react'

type Complaint = {
  id: number
  complaintCode: string
  status: string
  priority: string
  createdAt: string
}

type Props = {
  complaints: Complaint[]
}

export default function My({ complaints }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Complaints</h1>

      <div className="space-y-3">
        {complaints.length === 0 && (
          <div className="border rounded p-4 text-gray-500">No complaints found</div>
        )}

        {complaints.map((complaint) => (
          <div key={complaint.id} className="border rounded p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{complaint.complaintCode}</p>
              <p className="text-sm text-gray-600">Status: {complaint.status}</p>
              <p className="text-sm text-gray-600">Priority: {complaint.priority}</p>
            </div>

            <Link href={`/complaints/${complaint.id}`} className="text-blue-600 hover:underline">
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
