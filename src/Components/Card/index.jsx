import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { CheckIcon, PlusIcon } from '@heroicons/react/24/solid'
import { formatMoney } from '../../utils/formats'

export default function Card({ product }) {
  const { cartProducts, openProductDetail, productInDetail, addProductToCart, removeProductToCart } =
    useContext(ShoppingCartContext)

  const { images, title, price, description, category, id } = product
  const image = images?.[0]
  const { name: categoryName } = category

  const showProduct = () => {
    productInDetail(product)
    openProductDetail()
  }

  const handleAddProductToCart = (event, product) => {
    event.stopPropagation()
    addProductToCart(product)
  }

  const handleRemoveProductToCart = (event, product) => {
    event.stopPropagation()
    removeProductToCart(product.id)
  }

  const renderIcon = (id) => {
    const classContainer = (bgColor) =>
      `absolute top-0 right-0 m-2 flex justify-center items-center w-6 h-6 rounded-full ${bgColor} hover:scale-110 transition`
    const isInCart = cartProducts.filter((product) => product.id === id).length > 0
    if (isInCart)
      return (
        <div className={classContainer('bg-green-950')} onClick={(event) => handleRemoveProductToCart(event, product)}>
          <CheckIcon className='w-4 h-4 text-white' />
        </div>
      )
    return (
      <div className={classContainer('bg-white')} onClick={(event) => handleAddProductToCart(event, product)}>
        <PlusIcon className='w-4 h-4 text-black' />
      </div>
    )
  }

  return (
    <div
      className='bg-white cursor-pointer w-56 h-60 rounded-lg overflow-hidden m-auto hover:shadow-lg group'
      onClick={showProduct}
    >
      <figure className='relative mb-2 w-full h-4/5'>
        <span className='absolute bottom-0 left-0 m-2 bg-white/60 rounded-lg text-black text-xs px-2 py-1'>
          {categoryName}
        </span>
        <img className='h-full w-full object-cover' src={image} alt={description} />
        {renderIcon(id)}
      </figure>
      <p className='flex justify-between mx-2'>
        <span className='text-sm font-light'>{title}</span>
        <span className='text-lg font-medium'>${formatMoney(price)}</span>
      </p>
    </div>
  )
}
