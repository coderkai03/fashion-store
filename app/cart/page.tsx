import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react"
import { getCart } from "@/lib/api"
import CartItemQuantity from "@/components/cart-item-quantity"

export default async function CartPage() {
  const cart = await getCart()
  const subtotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + shipping

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cart.items.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-[1fr_350px] gap-8">
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg?height=96&width=96"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between">
                    <Link href={`/products/${item.productId}`} className="font-medium hover:underline">
                      {item.name}
                    </Link>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>

                  <p className="text-sm text-muted-foreground">{item.variant}</p>

                  <div className="mt-auto flex items-center justify-between">
                    <CartItemQuantity itemId={item.id} initialQuantity={item.quantity} />
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-muted p-6 rounded-lg h-fit space-y-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button asChild className="w-full">
              <Link href="/checkout">
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <p className="text-xs text-center text-muted-foreground">Shipping and taxes calculated at checkout</p>
          </div>
        </div>
      )}
    </div>
  )
}
