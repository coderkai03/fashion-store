import { useEffect } from 'react'
import { useProducts } from '@/lib/hooks/useProducts'
import Image from 'next/image'
export function ProductList() {
  const { 
    data: products, 
    loading, 
    error, 
    getAllProducts 
  } = useProducts()

  useEffect(() => {
    getAllProducts({ featured: true })
  }, [getAllProducts])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products?.map(product => (
        <div key={product.id} className="border rounded-lg p-4">
          <Image 
            src={product.images[0]?.url} 
            alt={product.images[0]?.alt || product.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  )
} 