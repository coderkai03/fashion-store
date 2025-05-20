"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortOption, setSortOption] = useState("newest")

  const categories = [
    { id: "shirts", name: "Shirts" },
    { id: "pants", name: "Pants" },
    { id: "dresses", name: "Dresses" },
    { id: "accessories", name: "Accessories" },
  ]

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams)

    // Update category filter
    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","))
    } else {
      params.delete("category")
    }

    // Update price filter
    params.set("price", `${priceRange[0]}-${priceRange[1]}`)

    // Update sort option
    params.set("sort", sortOption)

    router.push(`/products?${params.toString()}`)
  }

  const resetFilters = () => {
    setPriceRange([0, 500])
    setSelectedCategories([])
    setSortOption("newest")
    router.push("/products")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category.id])
                  } else {
                    setSelectedCategories(selectedCategories.filter((id) => id !== category.id))
                  }
                }}
              />
              <Label htmlFor={category.id}>{category.name}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Price Range</h3>
        <Slider defaultValue={priceRange} max={500} step={10} onValueChange={setPriceRange} />
        <div className="flex justify-between mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Sort By</h3>
        <RadioGroup defaultValue={sortOption} onValueChange={setSortOption}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="newest" id="newest" />
            <Label htmlFor="newest">Newest</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-low" id="price-low" />
            <Label htmlFor="price-low">Price: Low to High</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-high" id="price-high" />
            <Label htmlFor="price-high">Price: High to Low</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-2">
        <Button onClick={applyFilters}>Apply Filters</Button>
        <Button variant="outline" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  )
}
