import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProductById } from "@/lib/api"
import ProductGrid from "@/components/product-grid"
import AddToCartButton from "@/components/add-to-cart-button"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <Image
              src={product.images[0]?.url || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((image, index) => (
                <div key={index} className="aspect-square relative overflow-hidden rounded-lg">
                  <Image
                    src={image.url || "/placeholder.svg?height=150&width=150"}
                    alt={`${product.name} - Image ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
          </div>

          {product.tags && (
            <div className="flex gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="bg-muted px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Size</label>
                <select className="w-full border rounded-md p-2">
                  <option>Select Size</option>
                  <option value="xs">XS</option>
                  <option value="s">S</option>
                  <option value="m">M</option>
                  <option value="l">L</option>
                  <option value="xl">XL</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Quantity</label>
                <select className="w-full border rounded-md p-2">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <AddToCartButton productId={product.id} className="flex-1" />
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="mb-12">
        <TabsList>
          <TabsTrigger value="details">Product Details</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="p-4">
          <div className="prose max-w-none">
            <p>
              {product.details ||
                "This premium product is crafted with high-quality materials to ensure comfort and durability. The design features a modern silhouette that's both stylish and functional for everyday wear."}
            </p>
            <ul>
              <li>Premium quality materials</li>
              <li>Comfortable fit</li>
              <li>Easy care instructions</li>
              <li>Versatile styling options</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="shipping" className="p-4">
          <div className="prose max-w-none">
            <h3>Shipping Information</h3>
            <p>
              We offer free standard shipping on all orders over $50. Standard shipping typically takes 3-5 business
              days.
            </p>

            <h3>Return Policy</h3>
            <p>
              We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in their original
              packaging with all tags attached.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <ProductGrid limit={4} />
      </section>
    </div>
  )
}
