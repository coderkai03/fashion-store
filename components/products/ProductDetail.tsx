import { useEffect } from 'react'
import { useProducts } from '@/lib/api'

interface ProductDetailProps {
  id: string
}

export function ProductDetail({ id }: ProductDetailProps) {
  const { 
    data: product, 
    loading, 
    error, 
    getProductById 
  } = useProducts()

  useEffect(() => {
    getProductById(id)
  }, [getProductById, id])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!product) return <div>Product not found</div>

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.images[0]?.url} 
            alt={product.images[0]?.alt || product.name}
            className="w-full rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold mt-2">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-gray-600">{product.description}</p>
          {product.tags && (
            <div className="mt-4 flex gap-2">
              {product.tags.map(tag => (
                <span 
                  key={tag}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 