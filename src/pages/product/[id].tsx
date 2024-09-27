import { getProductById } from '@/lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Stripe from 'stripe'

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

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  if (isFallback) {
    return <h1>Carregando...</h1>
  }

  const handleBuyProduct = async () => {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId: product.defaultPriceId }),
      })

      const { checkoutUrl } = await response.json()

      window.location.href = checkoutUrl
    } catch (error) {
      console.error(error)
    } finally {
      setIsCreatingCheckoutSession(false)
    }
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt='' width={520} height={480} />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession}>
          Comprar
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: '' },
      },
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
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
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
