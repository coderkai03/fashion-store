"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { addToCart } from "@/lib/cart-actions"

interface AddToCartButtonProps {
  productId: string
  className?: string
}

export default function AddToCartButton({ productId, className }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      await addToCart(productId)
      setIsAdded(true)
      toast({
        title: "Added to cart",
        description: "This product has been added to your cart",
      })

      // Reset button after 2 seconds
      setTimeout(() => {
        setIsAdded(false)
      }, 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not add to cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isLoading}
      className={className}
      variant={isAdded ? "secondary" : "default"}
    >
      {isAdded ? (
        <>
          <Check className="mr-2 h-4 w-4" /> Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </>
      )}
    </Button>
  )
}
