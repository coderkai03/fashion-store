import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ProductGridProps {
  featured?: boolean
  category?: string
  limit?: number
  products?: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products?.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={product.images[0]?.url || "/placeholder.svg?height=400&width=400"}
                alt={product.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <span className="font-bold">${product.price.toFixed(2)}</span>
              {product.tags && (
                <div className="flex gap-2">
                  {product.tags.slice(0, 1).map((tag) => (
                    <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
