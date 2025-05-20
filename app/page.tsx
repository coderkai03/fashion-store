import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import ProductGrid from "@/components/product-grid"

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Fashion Forward</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the latest trends and elevate your style with our curated collection of fashion essentials.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button asChild size="lg">
              <Link href="/products">
                Shop Now <ShoppingBag className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        <ProductGrid featured={true} />
      </section>

      <section className="py-12 bg-muted rounded-lg p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">New Season Collection</h2>
            <p className="text-muted-foreground">
              Our latest collection features premium materials and timeless designs that will keep you looking stylish
              all season long.
            </p>
            <Button asChild variant="secondary">
              <Link href="/products?collection=new-season">View Collection</Link>
            </Button>
          </div>
          <div className="aspect-video bg-background rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Collection Preview Image</p>
          </div>
        </div>
      </section>
    </div>
  )
}
