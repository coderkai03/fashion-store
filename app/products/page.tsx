"use client"

import { Suspense, useEffect, useState } from "react"
import ProductGrid from "@/components/product-grid"
import ProductFilters from "@/components/product-filters"
import { Skeleton } from "@/components/ui/skeleton"
import { useProducts } from "@/lib/hooks/useProducts"
import { useSearchParams } from "next/navigation"

function ProductsPageContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const { getAllProducts } = useProducts()

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts({ category: category || undefined })
      setProducts(products)
      console.log(products)
    }
    fetchProducts()
  }, [category])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        <ProductFilters />

        <div className="space-y-6">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid category={category || undefined} products={products} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPageContent />
    </Suspense>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
    </div>
  )
}
