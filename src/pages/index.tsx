import { AddToCartButton, HomeContainer, Product } from '@/styles/pages/home'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { getProducts } from '@/lib/stripe'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'
import Link from 'next/link'
import Head from 'next/head'
import { ShoppingCart } from 'phosphor-react'
import { useCart } from '@/contexts/CartContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface HomeProps {
  formattedProducts: {
    id: string
    name: string
    imageUrl: string
    price: number
    priceUnitAmount: number
  }[]
}

export default function Home({ formattedProducts }: HomeProps) {
  const { addToCart } = useCart()
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1.8,
      spacing: 48,
    },
  })

  const handleAddToCart = (event: React.MouseEvent, product: any) => {
    event.preventDefault()
    event.stopPropagation()
    addToCart(product)
    toast.success('Product added to cart!')
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className='keen-slider'>
        {formattedProducts.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            prefetch={false}
          >
            <Product className='keen-slider__slide'>
              <Image src={product.imageUrl} width={520} height={480} alt='' />

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>

                <AddToCartButton onClick={(e) => handleAddToCart(e, product)}>
                  <ShoppingCart size={32} weight='bold' />
                </AddToCartButton>
              </footer>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts()

  const formattedProducts = products.data.map((product) => {
    const price = product.default_price as Stripe.Price
    const formattedPrice = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format((price.unit_amount ?? 0) / 100)

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: formattedPrice,
      priceUnitAmount: price.unit_amount ?? 0,
    }
  })

  return {
    props: {
      formattedProducts,
    },
    revalidate: 60, // 60 seconds
  }
}
