"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, X } from "lucide-react"

export default function NewProductPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real application, this would submit to Payload CMS
    console.log("Product submitted")

    setIsSubmitting(false)
    router.push("/admin/products")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="variants">Variants & Inventory</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the basic details of your product.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" placeholder="Enter product name" required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Enter product description" rows={4} required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="price">Price</Label>
                      <Input id="price" type="number" min="0" step="0.01" placeholder="0.00" required />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shirts">Shirts</SelectItem>
                          <SelectItem value="pants">Pants</SelectItem>
                          <SelectItem value="dresses">Dresses</SelectItem>
                          <SelectItem value="accessories">Accessories</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag) => (
                        <div key={tag} className="flex items-center bg-muted px-3 py-1 rounded-full text-sm">
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-2 text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                      />
                      <Button type="button" onClick={handleAddTag} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="details">Product Details</Label>
                    <Textarea id="details" placeholder="Enter additional product details" rows={4} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="images" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>Upload images of your product.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <Label>Main Image</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <div className="mx-auto w-32 h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
                        <Plus className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Drag and drop an image, or click to browse</p>
                      <Button type="button" variant="secondary" size="sm">
                        Upload Image
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <Label>Additional Images</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop up to 5 additional images, or click to browse
                      </p>
                      <Button type="button" variant="secondary" size="sm">
                        Upload Images
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="variants" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Variants & Inventory</CardTitle>
                  <CardDescription>Manage product variants and inventory.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <Label>Size Variants</Label>
                      <Button type="button" variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" /> Add Size
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                          <Label htmlFor="size-xs">XS</Label>
                          <Input id="size-xs" type="number" min="0" placeholder="Quantity" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="size-s">S</Label>
                          <Input id="size-s" type="number" min="0" placeholder="Quantity" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="size-m">M</Label>
                          <Input id="size-m" type="number" min="0" placeholder="Quantity" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="size-l">L</Label>
                          <Input id="size-l" type="number" min="0" placeholder="Quantity" className="mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <Label>Color Variants</Label>
                      <Button type="button" variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" /> Add Color
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="color-black">Black</Label>
                          <Input id="color-black" type="number" min="0" placeholder="Quantity" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="color-white">White</Label>
                          <Input id="color-white" type="number" min="0" placeholder="Quantity" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="color-blue">Blue</Label>
                          <Input id="color-blue" type="number" min="0" placeholder="Quantity" className="mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
