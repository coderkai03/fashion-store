"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useProducts } from "@/lib/hooks/useProducts"
import AddToCartButton from "@/components/add-to-cart-button"
import React, { useState, useEffect } from "react"
import { useParams } from "next/navigation"

export default function ProductPage() {
  console.log("ProductPage")
  const params = useParams()
  const { id } = params
  console.log("id", id)
  const { getProductById } = useProducts()
  
  const [productResponse, setProductResponse] = useState<Product>()

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductById(id as string)
      console.log("Product", product)
      setProductResponse(product)
    }
    fetchProduct()
  }, [id])

  if (!productResponse) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <Image
              src={`http://localhost:3000${productResponse.images[0]?.upload?.url}` || "/placeholder.svg?height=600&width=600"}
              alt={productResponse.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {productResponse.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {productResponse.images.slice(1, 5).map((image, index) => (
                <div key={index} className="aspect-square relative overflow-hidden rounded-lg">
                  <Image
                    src={`http://localhost:3000${image.upload?.url}` || "/placeholder.svg?height=150&width=150"}
                    alt={`${productResponse.name} - Image ${index + 2}`}
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
            <h1 className="text-3xl font-bold">{productResponse.name}</h1>
            <p className="text-2xl font-bold mt-2">${productResponse.price.toFixed(2)}</p>
          </div>

          {productResponse.tags && (
            <div className="flex gap-2">
              {productResponse.tags.map((tag) => (
                <span key={tag.tag} className="bg-muted px-3 py-1 rounded-full text-sm">
                  {tag.tag}
                </span>
              ))}
            </div>
          )}

          <p className="text-muted-foreground">{productResponse.description}</p>

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
              <AddToCartButton productId={productResponse.id} className="flex-1" />
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
              {productResponse.details ||
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

      {/* <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <ProductGrid limit={4} products={productResponse.docs} />
      </section> */}
    </div>
  )
}
