import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'

export default function Log() {
  const ShoppingCard = useContext(ShoppingCartContext)
  return (
    <div className='fixed z-50 bottom-2 left-2 bg-slate-100/80 p-8 rounded-lg backdrop-blur-lg max-w-sm max-h-30 overflow-y-auto hover:max-h-96 hover:max-w-lg group'>
      <div className='group-hover:flex hidden'>{JSON.stringify(ShoppingCard, null, 2)}</div>
      <div className='group-hover:hidden flex'>Context</div>
    </div>
  )
}
