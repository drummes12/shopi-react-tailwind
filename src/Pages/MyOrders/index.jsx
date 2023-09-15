import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'

import Layout from '../../Components/Layout'
import OrdersCard from '../../Components/OrdersCard'
import { Link } from 'react-router-dom'

function Home() {
  const { orders } = useContext(ShoppingCartContext)
  return (
    <Layout>
      <div className='flex flex-col h-[calc(100vh-5rem)] w-full max-w-2xl overflow-hidden p-6'>
        <header className='flex justify-between items-center mb-8 h-fit'>
          <h2 className='font-medium text-3xl'>My Orders</h2>
        </header>
        <div className='flex-1 overflow-y-auto'>
          <div className='grid grid-cols-2 max-sm:grid-cols-1 h-fit gap-4'>
            {orders.map(({ id, date, totalProducts, totalPriceProducts }) => (
              <Link key={id} to={`/my-orders/${id}`}>
                <OrdersCard date={date} totalPrice={totalPriceProducts} totalProducts={totalProducts} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
