import { HomeContainer, Product } from '@/styles/pages/home'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { getProducts } from '@/lib/stripe'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'
import Link from 'next/link'

interface HomeProps {
  formattedProducts: {
    id: string
    name: string
    imageUrl: string
    price: number
  }[]
}

export default function Home({ formattedProducts }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1.8,
      spacing: 48,
    },
  })

  return (
    <>
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
                <strong>{product.name}</strong>
                <span>{product.price}</span>
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
    }
  })

  return {
    props: {
      formattedProducts,
    },
    revalidate: 60, // 60 seconds
  }
}
