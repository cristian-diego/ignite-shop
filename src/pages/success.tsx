import { stripe } from '@/lib/stripe'
import { SuccessContainer, ImageContainer } from '@/styles/pages/success'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'

interface SuccessProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <SuccessContainer>
      <h1>Compra efetuada</h1>

      <ImageContainer>
        <Image src={product.imageUrl} alt='' width={120} height={110} />
      </ImageContainer>

      <p>
        Uhuul <strong>{customerName}</strong>, sua{' '}
        <strong>{product.name}</strong> já está a caminho da sua casa.
      </p>

      <Link href='/'>Voltar ao catálogo</Link>
    </SuccessContainer>
  )
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  if (query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = query.session_id as string

  if (!sessionId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  return {
    props: {
      customerName: session.customer_details?.name,
      product: {
        name: session.line_items?.data[0].price?.product.name,
        imageUrl: session.line_items?.data[0].price?.product.images[0],
      },
    },
  }
}
