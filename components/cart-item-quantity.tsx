"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { updateCartItemQuantity } from "@/lib/cart-actions"

interface CartItemQuantityProps {
  itemId: string
  initialQuantity: number
}

export default function CartItemQuantity({ itemId, initialQuantity }: CartItemQuantityProps) {
  const [quantity, setQuantity] = useState(initialQuantity)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 10 || isUpdating) return

    setIsUpdating(true)
    try {
      setQuantity(newQuantity)
      await updateCartItemQuantity(itemId, newQuantity)
    } catch (error) {
      // Revert on error
      setQuantity(quantity)
      console.error("Failed to update quantity", error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="flex items-center border rounded-md">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none"
        onClick={() => handleQuantityChange(quantity - 1)}
        disabled={quantity <= 1 || isUpdating}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="w-8 text-center">{quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none"
        onClick={() => handleQuantityChange(quantity + 1)}
        disabled={quantity >= 10 || isUpdating}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  )
}
