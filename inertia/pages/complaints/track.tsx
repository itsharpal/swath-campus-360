type Complaint = {
  id: number
  complaintCode: string
  status: string
  priority: string
  description: string | null
  createdAt: string
  zone?: { name: string }
  category?: { name: string }
}

type Props = {
  complaint: Complaint
}

export default function TrackComplaint({ complaint }: Props) {
  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Track Complaint</h1>

      <div className="border rounded p-4 space-y-2">
        <p>
          <b>Complaint Code:</b> {complaint.complaintCode}
        </p>
        <p>
          <b>Status:</b> {complaint.status}
        </p>
        <p>
          <b>Priority:</b> {complaint.priority}
        </p>
        <p>
          <b>Zone:</b> {complaint.zone?.name ?? '-'}
        </p>
        <p>
          <b>Category:</b> {complaint.category?.name ?? '-'}
        </p>
        <p>
          <b>Description:</b> {complaint.description ?? '-'}
        </p>
      </div>
    </div>
  )
}
