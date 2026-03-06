import { useForm } from '@inertiajs/react'

interface Props {
  complaint: {
    id: number
    complaintCode: string
    status: string
  }
}

export default function ResolveComplaint({ complaint }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    resolutionRemark: '',
    resolutionPhotoUrl: '',
  })

  const submit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    put(`/complaints/${complaint.id}/resolve`)
  }

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Resolve Complaint</h1>

      <div className="mb-4 rounded border p-3 text-sm text-gray-700">
        <p>
          <b>Code:</b> {complaint.complaintCode}
        </p>
        <p>
          <b>Current Status:</b> {complaint.status}
        </p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <textarea
          placeholder="Resolution remark"
          value={data.resolutionRemark}
          onChange={(e) => setData('resolutionRemark', e.target.value)}
          className="w-full border p-2"
        />
        {errors.resolutionRemark && <p className="text-red-500 text-sm">{errors.resolutionRemark}</p>}

        <input
          placeholder="Photo URL"
          value={data.resolutionPhotoUrl}
          onChange={(e) => setData('resolutionPhotoUrl', e.target.value)}
          className="w-full border p-2"
        />
        {errors.resolutionPhotoUrl && <p className="text-red-500 text-sm">{errors.resolutionPhotoUrl}</p>}

        <button disabled={processing} className="px-4 py-2 bg-green-600 text-white rounded">Resolve Complaint</button>
      </form>
    </div>
  )
}
