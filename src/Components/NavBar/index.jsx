import { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { ShoppingCartContext } from '../../Context'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'

export default function NavBar() {
  const { totalProducts, openCheckoutSideMenu, setCategory } = useContext(ShoppingCartContext)

  const activeStyle = 'underline underline-offset-4'

  return (
    <nav className='h-20 flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-normal top-0 backdrop-blur-3xl bg-white/50'>
      <ul className='flex items-center'>
        <li className='font-semibold text-lg pr-3'>
          <NavLink to='/' onClick={() => setCategory('')}>
            Shopi
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/'
            onClick={() => setCategory('')}
            className={({ isActive }) => `px-3 py-2 rounded-md hover:bg-slate-50/50 ${isActive ? activeStyle : ''}`}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/clothes'
            onClick={() => setCategory('clothes')}
            className={({ isActive }) => `px-3 py-2 rounded-md hover:bg-slate-50/50 ${isActive ? activeStyle : ''}`}
          >
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/electronics'
            onClick={() => setCategory('electronics')}
            className={({ isActive }) => `px-3 py-2 rounded-md hover:bg-slate-50/50 ${isActive ? activeStyle : ''}`}
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/furnitures'
            onClick={() => setCategory('furnitures')}
            className={({ isActive }) => `px-3 py-2 rounded-md hover:bg-slate-50/50 ${isActive ? activeStyle : ''}`}
          >
            Furnitures
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/toys'
            onClick={() => setCategory('toys')}
            className={({ isActive }) => `px-3 py-2 rounded-md hover:bg-slate-50/50 ${isActive ? activeStyle : ''}`}
          >
            Toys
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/others'
            onClick={() => setCategory('others')}
            className={({ isActive }) => `px-3 py-2 rounded-md hover:bg-slate-50/50 ${isActive ? activeStyle : ''}`}
          >
            Others
          </NavLink>
        </li>
      </ul>
      <ul className='flex flex-row items-center'>
        <li className='text-black/60'>drummes12@example.com</li>
        <li>
          <NavLink
            to='/my-orders'
            className={({ isActive }) => `px-3 py-2 rounded-md hover:bg-slate-50/50 ${isActive ? activeStyle : ''}`}
          >
            My Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/my-account'
            className={({ isActive }) => `px-3 py-2 rounded-md hover:bg-slate-50/50 ${isActive ? activeStyle : ''}`}
          >
            My Account
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/sign-in'
            className={({ isActive }) => `px-3 py-2 rounded-md hover:bg-slate-50/50 ${isActive ? activeStyle : ''}`}
          >
            Sign In
          </NavLink>
        </li>
        <li className='flex gap-1 items-center cursor-pointer' onClick={openCheckoutSideMenu}>
          <ShoppingBagIcon className='h-6 w-6 text-black' /> {totalProducts.totalProducts}
        </li>
      </ul>
    </nav>
  )
}
