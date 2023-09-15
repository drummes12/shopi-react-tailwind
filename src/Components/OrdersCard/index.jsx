import { formatMoney } from '../../utils/formats.js'

export default function OrdersCard({ date, totalPrice, totalProducts }) {
  return (
    <div className='w-full rounded-lg overflow-hidden p-6 border-gray-500/20 border-2 hover:bg-gray-500/50 flex justify-between items-center'>
      <div className='flex flex-col justify-between '>
        <h1 className='font-light text-sm text-black/80'>{new Date(date).toLocaleString('en-US')}</h1>
        <p className='font-medium'>{totalProducts} products</p>
      </div>
      <h2 className='font-medium text-2xl'>${formatMoney(totalPrice)}</h2>
    </div>
  )
}
