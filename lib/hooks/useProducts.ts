import { useCallback } from 'react'
import { useApi } from './useApi'

export function useProducts() {
  const api = useApi<ProductResponse>()
  const singleProductApi = useApi<Product>()

  const getAllProducts = useCallback(async (params?: ProductQueryParams) => {
    const queryParams = new URLSearchParams()
    if (params?.featured) queryParams.append('featured', String(params.featured))
    if (params?.category) queryParams.append('category', params.category)
    if (params?.limit) queryParams.append('limit', String(params.limit))

    return api.execute(`/api/products/all?${queryParams}`)
  }, [api])

  const getProductById = useCallback(async (id: string) => {
    return singleProductApi.execute(`/api/products/${id}`)
  }, [singleProductApi])

  const addProduct = useCallback(async (product: Omit<Product, 'id'>) => {
    return api.execute('/api/products/add', {
      method: 'POST',
      body: JSON.stringify(product),
    })
  }, [api])

  return {
    ...api,
    getAllProducts,
    getProductById,
    addProduct,
  }
} 