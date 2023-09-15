import { useContext } from 'react'

import { ShoppingCartContext } from '../../Context'
import OrderCard from '../../Components/OrderCard'

import Layout from '../../Components/Layout'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link, useParams } from 'react-router-dom'
import { formatMoney } from '../../utils/formats'

function Home() {
  const { orders } = useContext(ShoppingCartContext)
  const { id } = useParams()
  const order = id === 'last' ? orders?.[orders?.length - 1] : orders?.find((order) => order.id === id)

  return (
    <Layout>
      <div className='flex flex-col h-[calc(100vh-5rem)] w-full max-w-2xl overflow-hidden p-6'>
        <header className='flex items-center mb-8 h-fit'>
          <Link to='/my-orders'>
            <ChevronLeftIcon className='h-8 w-8 text-black' />
          </Link>
          <h2 className='font-medium text-3xl ml-4'>My Order</h2>
        </header>
        <div className='flex-1 overflow-y-auto'>
          <div className='flex flex-col h-fit gap-4'>
            {order?.products?.map((product) => {
              const { id, images, title, price } = product
              const image = images?.[0]
              return <OrderCard key={id} id={id} title={title} image={image} price={price} />
            })}
          </div>
        </div>
        <footer>
          <div className='bg-white w-full h-24 rounded-lg flex items-center mt-8 p-6 justify-between'>
            <h2 className='font-light flex flex-col'>
              <span>Total</span>
              <span className='font-medium'>{order?.totalProducts} products</span>
            </h2>
            <p className='font-medium text-2xl'>${formatMoney(order?.totalPriceProducts)}</p>
          </div>
        </footer>
      </div>
    </Layout>
  )
}

export default Home
