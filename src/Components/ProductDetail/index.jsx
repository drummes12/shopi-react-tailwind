import { useContext } from 'react'

import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import { formatMoney } from '../../utils/formats'

export default function ProductDetail() {
  const { productToShow, isProductDetailOpen, closeProductDetail } = useContext(ShoppingCartContext)

  const { images, title, price, description } = productToShow
  const image = images?.[0]

  if (!isProductDetailOpen) return <></>
  return (
    <aside className='w-[360px] h-[calc(100vh-5rem)] top-[5rem] fixed right-0 p-4'>
      <div className='h-full rounded-lg backdrop-blur-3xl bg-white/50 border-gray-500/20 border-2'>
        <header className='flex justify-between items-center p-6'>
          <h2 className='font-medium text-xl'>Detail</h2>
          <button
            className='p-1 hover:scale-110 ease-in rounded-full hover:bg-slate-50 duration-75 shadow-sm'
            onClick={() => closeProductDetail()}
          >
            <XMarkIcon className='h-4 w-4 text-black' />
          </button>
        </header>
        <figure className='px-6'>
          <img className='h-full aspect-square rounded-lg object-cover' src={image} alt={title} />
        </figure>
        <p className='flex flex-col bg-slate-50 m-6 p-3 rounded-lg'>
          <span className='font-medium text-2xl mb-2'>${formatMoney(price)}</span>
          <span className='font-medium text-md'>{title}</span>
          <span className='font-light text-sm'>{description}</span>
        </p>
      </div>
    </aside>
  )
}
