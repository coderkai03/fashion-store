import { Suspense } from "react"
import ProductGrid from "@/components/product-grid"
import ProductFilters from "@/components/product-filters"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductsPageProps {
  searchParams: {
    category?: string
    price?: string
    sort?: string
  }
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category, price, sort } = searchParams

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        <ProductFilters />

        <div className="space-y-6">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid category={category} />
          </Suspense>
        </div>
      </div>
    </div>
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
