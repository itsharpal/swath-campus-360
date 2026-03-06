interface Category {
  categoryId: number
  total: number
}

interface Props {
  categories: Category[]
}

export default function CategoryAnalytics({ categories }: Props) {

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Complaint Categories
      </h1>

      <div className="bg-white shadow rounded">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Category ID</th>
              <th className="p-3 text-left">Complaints</th>
            </tr>
          </thead>

          <tbody>

            {categories.map((c) => (
              <tr key={c.categoryId} className="border-t">
                <td className="p-3">{c.categoryId}</td>
                <td className="p-3">{c.total}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
} 
