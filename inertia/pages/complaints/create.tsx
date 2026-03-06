import { useForm } from '@inertiajs/react'

interface Props {
  zones: { id: number; name: string }[]
  categories: { id: number; name: string }[]
}

export default function CreateComplaint({ zones, categories }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    zoneId: 0,
    categoryId: 0,
    description: '',
    photoUrl: '',
    isAnonymous: false,
  })

  const submit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/complaints')
  }

  return (
    <div className="p-6 max-w-lg">

      <h1 className="text-2xl font-bold mb-6">
        Report Complaint
      </h1>

      <form onSubmit={submit} className="space-y-4">

        <select
          value={data.zoneId}
          onChange={(e) => setData('zoneId', Number(e.target.value))}
          className="w-full border p-2"
        >
          <option value="0">Select Zone</option>
          {zones.map((z) => (
            <option key={z.id} value={z.id}>
              {z.name}
            </option>
          ))}
        </select>
        {errors.zoneId && <p className="text-red-500 text-sm">{errors.zoneId}</p>}

        <select
          value={data.categoryId}
          onChange={(e) => setData('categoryId', Number(e.target.value))}
          className="w-full border p-2"
        >
          <option value="0">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId}</p>}

        <textarea
          placeholder="Description"
          className="w-full border p-2"
          value={data.description}
          onChange={(e) => setData('description', e.target.value)}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.isAnonymous}
            onChange={(e) => setData('isAnonymous', e.target.checked)}
          />
          Report anonymously
        </label>

        <button
          disabled={processing}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Submit Complaint
        </button>

      </form>
    </div>
  )
}
