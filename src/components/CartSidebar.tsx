import { styled } from '@/styles'
import { useCart } from '@/contexts/CartContext'
import { X } from 'phosphor-react'
import Image from 'next/image'

interface CartSidebarProps {
  onClose: () => void
}

export function CartSidebar({ onClose }: CartSidebarProps) {
  const { cartItems, formattedCartTotal, removeFromCart, totalItems } =
    useCart()

  return (
    <SidebarContainer>
      <CloseButton onClick={onClose}>
        <X size={24} />
      </CloseButton>
      <h2>Carrinho de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem key={item.id}>
              {/* Renderize as informações do item aqui */}
              <ImageContainer>
                <Image src={item.imageUrl} width={100} height={90} alt='' />
              </ImageContainer>

              <CartItemInfo>
                <CartItemName>{item.name}</CartItemName>
                <CartItemPrice>{item.price}</CartItemPrice>
                <RemoveButton onClick={() => removeFromCart(item.id)}>
                  Remover
                </RemoveButton>
              </CartItemInfo>
            </CartItem>
          ))}

          <div>
            <QuantityContainer>
              <p>Quantidade</p>
              <strong>{totalItems} itens</strong>
            </QuantityContainer>

            <TotalContainer>
              <p>Valor total</p>
              <strong>{formattedCartTotal}</strong>
            </TotalContainer>
          </div>

          <CheckoutButton>Finalizar compra</CheckoutButton>
        </>
      )}
    </SidebarContainer>
  )
}

const SidebarContainer = styled('aside', {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  width: '30rem',
  backgroundColor: '$gray800',
  padding: '3rem',
  boxShadow: '-4px 0 30px rgba(0, 0, 0, 0.8)',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1000,
})

const CloseButton = styled('button', {
  position: 'absolute',
  top: '1.5rem',
  right: '1.5rem',
  background: 'none',
  border: 'none',
  color: '$gray300',
  cursor: 'pointer',
})

const CartItem = styled('div', {
  // Estilize o item do carrinho
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: '1rem',
  padding: '1rem',
  border: '1px solid $gray700',
  borderRadius: '4px',
})

const CartItemInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginLeft: '1rem',
  gap: '0.25rem',
})

const CartItemName = styled('p', {
  fontSize: '1rem',
  color: '$gray300',
})

const CartItemPrice = styled('p', {
  fontSize: '1rem',
  color: '$gray100',
  fontWeight: 'bold',
})

const RemoveButton = styled('button', {
  background: 'none',
  border: 'none',
  color: '$green500',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 'bold',
  marginTop: '0.25rem',
})

const QuantityContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const TotalContainer = styled('div', {
  marginTop: '0.25rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: 'bold',

  p: {
    fontSize: '$md',
  },

  strong: {
    fontSize: '$2xl',
  },
})

const CheckoutButton = styled('button', {
  marginTop: '2rem',
  backgroundColor: '$green500',
  color: '$white',
  border: 'none',
  borderRadius: '8px',
  padding: '1.25rem',
  fontWeight: 'bold',
  fontSize: '1.125rem',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$green300',
  },
})

export const ImageContainer = styled('div', {
  maxWidth: 100,
  height: 90,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})
