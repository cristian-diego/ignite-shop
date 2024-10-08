import { styled } from '@/styles'

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100dvw - ((100dvw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 'calc(100vh - 10rem)',
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 9,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },

  footer: {
    opacity: 0,
    transform: 'translateY(100%)',
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    strong: {
      fontSize: '$lg',
      color: '$gray100',
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',
    },

    div: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
})

export const AddToCartButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '$green500',
  borderRadius: 9,
  padding: '0.75rem',
  cursor: 'pointer',
  border: 'none',
  color: '$white',
  transition: 'background-color 0.2s',

  '&:hover': {
    backgroundColor: '$green300',
  },
})
