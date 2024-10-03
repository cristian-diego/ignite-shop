import { styled } from '@/styles'
import { useCart } from '@/contexts/CartContext'
import { X } from 'phosphor-react'

interface CartSidebarProps {
  onClose: () => void
}

export function CartSidebar({ onClose }: CartSidebarProps) {
  const { cartItems } = useCart()

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
              <p>{item.name}</p>
              <p>{item.price}</p>
            </CartItem>
          ))}
          <TotalContainer>
            <p>Total:</p>
            <strong>{/* Calcule e exiba o total aqui */}</strong>
          </TotalContainer>
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
  marginBottom: '1rem',
  padding: '1rem',
  border: '1px solid $gray700',
  borderRadius: '4px',
})

const TotalContainer = styled('div', {
  marginTop: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: 'bold',
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
