import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'

import { ShoppingCartContext } from '../../Context'
import MiniCard from '../OrderCard'
import { formatMoney } from '../../utils/formats'

export default function CheckoutSideMenu() {
  const { cartProducts, isCheckoutSideMenuOpen, closeCheckoutSideMenu, totalProducts, addOrder } =
    useContext(ShoppingCartContext)

  if (!isCheckoutSideMenuOpen) return <></>
  return (
    <aside className='w-[360px] h-[calc(100vh-5rem)] top-[5rem] fixed right-0 p-4'>
      <div className='flex flex-col h-full overflow-hidden rounded-lg backdrop-blur-3xl bg-white/50 p-6 border-gray-500/20 border-2'>
        <header className='flex justify-between items-center mb-8 h-fit'>
          <h2 className='font-medium text-xl'>My Order</h2>
          <button
            className='p-1 hover:scale-110 ease-in rounded-full hover:bg-slate-50 duration-75 shadow-sm'
            onClick={() => closeCheckoutSideMenu()}
          >
            <XMarkIcon className='h-4 w-4 text-black' />
          </button>
        </header>
        <div className='flex-1 overflow-y-auto'>
          <div className='flex flex-col h-fit gap-4'>
            {cartProducts.map((product) => {
              const { id, images, title, price } = product
              const image = images?.[0]
              return <MiniCard key={id} id={id} title={title} image={image} price={price} canDelete={true} />
            })}
          </div>
        </div>
        <footer>
          <div className='bg-white w-full h-24 rounded-lg flex items-center mt-8 p-6 justify-between'>
            <h2 className='font-light flex flex-col'>
              <span>Total</span>
              <span className='font-medium'>{totalProducts.totalProducts} products</span>
            </h2>
            <p className='font-medium text-2xl'>${formatMoney(totalProducts.totalPrice)}</p>
          </div>
          <Link to='/my-orders/last'>
            <button
              className='bg-gray-700/50 backdrop-blur-sm w-full h-10 rounded-lg flex items-center mt-8 p-6 justify-between text-white [&>*]:hover:scale-110'
              onClick={addOrder}
            >
              <h1 className='font-bold'>Checkout</h1>
              <ShoppingCartIcon className='h-6 w-6' />
            </button>
          </Link>
        </footer>
      </div>
    </aside>
  )
}
