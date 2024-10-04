import React, { createContext, useState, useContext, useEffect } from 'react'

interface CartItem {
  id: string
  name: string
  price: string
  priceUnitAmount: number
  imageUrl: string
  quantity: number
  defaultPriceId: string
}

interface CartContextData {
  cartItems: CartItem[]
  addToCart: (product: any) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  formattedCartTotal: string
  totalItems: number
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')

    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    if (cartItems.length > 0) {
      console.log('will persist', cartItems)
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
  }, [cartItems])

  const addToCart = (product: any) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      const updatedItems = existingItem
        ? prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevItems, { ...product, quantity: 1 }]

      return updatedItems
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.priceUnitAmount * item.quantity,
    0
  )

  const formattedCartTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cartTotal / 100)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        formattedCartTotal,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
