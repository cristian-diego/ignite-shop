import { getProductById } from '@/lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import { ShoppingCart } from 'phosphor-react'
import Stripe from 'stripe'
import { styled } from '@stitches/react'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  const { addToCart, cartItems } = useCart()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setIsAdded(true)
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsAdded(false), 2000)
    return () => clearTimeout(timer)
  }, [isAdded])

  if (isFallback) {
    return <h1>Carregando...</h1>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt='' width={520} height={480} />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>
          <button
            disabled={isCreatingCheckoutSession || isAdded}
            onClick={handleAddToCart}
          >
            {isCreatingCheckoutSession
              ? 'Carregando...'
              : isAdded
              ? 'Adicionado ao carrinho'
              : 'Adicionar ao carrinho'}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log('estou no server side')
  const productId = params?.id

  const productFromStripe = await getProductById(productId as string)
  const price = productFromStripe.default_price as Stripe.Price

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format((price.unit_amount ?? 0) / 100)

  return {
    props: {
      product: {
        id: productFromStripe.id,
        name: productFromStripe.name,
        imageUrl: productFromStripe.images[0],
        price: formattedPrice,
        description: productFromStripe.description,
        defaultPriceId: price.id,
      },
    },
  }
}
