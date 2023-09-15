import { XMarkIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { formatMoney } from '../../utils/formats'

export default function OrderCard({ id, image, title, price, canDelete = false }) {
  const { removeProductToCart } = useContext(ShoppingCartContext)
  return (
    <div className='bg-white w-full h-24 rounded-lg overflow-hidden flex flex-row justify-between'>
      <figure
        className={`relative h-full aspect-square group ${canDelete ? 'cursor-pointer' : ''}`}
        onClick={() => removeProductToCart(id)}
      >
        <img className='object-cover' src={image} alt={title} />
        {canDelete && (
          <div className='hidden group-hover:grid absolute inset-0 place-items-center bg-gray-500/20 backdrop-blur-sm rounded-l-lg'>
            <XMarkIcon className='h-10 w-10 text-white' />
          </div>
        )}
      </figure>
      <p className='flex flex-col justify-between w-full h-full px-2'>
        <span className='text-lg font-medium h-full flex items-center'>${formatMoney(price)}</span>
        <span className='text-sm font-light h-full flex items-center'>{title}</span>
      </p>
    </div>
  )
}
