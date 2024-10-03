import { styled } from '@/styles'
import { ShoppingCart } from 'phosphor-react'
import { useCart } from '@/contexts/CartContext'
import { useState } from 'react'
import { CartSidebar } from '@/components/CartSidebar'
import Image from 'next/image'
import logo from '@/assets/logo.svg'

export default function Header() {
  const { cartItems } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)

  const handleOpenCart = () => setIsCartOpen(true)
  const handleCloseCart = () => setIsCartOpen(false)

  return (
    <HeaderContainer>
      <Image src={logo} alt='' />
      <CartIcon onClick={handleOpenCart}>
        <ShoppingCart size={24}></ShoppingCart>
        {cartItems.length > 0 && <CartBadge>{cartItems.length}</CartBadge>}
      </CartIcon>
      {isCartOpen && <CartSidebar onClose={handleCloseCart} />}
    </HeaderContainer>
  )
}

const HeaderContainer = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
})

const CartIcon = styled('div', {
  cursor: 'pointer',
  position: 'relative',
})

const CartBadge = styled('span', {
  position: 'absolute',
  top: '-8px',
  right: '-8px',
  backgroundColor: '$green500',
  color: 'white',
  borderRadius: '50%',
  padding: '2px 6px',
  fontSize: '12px',
})
