import Layout from '../../Components/Layout'
import Card from '../../Components/Card'

import ProductDetail from '../../Components/ProductDetail'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import { useContext, useEffect } from 'react'
import { ShoppingCartContext } from '../../Context'
import { Search } from '../../Components/Search'

function Home() {
  const { products, filteredProducts, setCategory, searchByTitle, loadingProducts, errorProducts } =
    useContext(ShoppingCartContext)

  useEffect(() => {
    const { pathname: currentPath } = window.location
    const categoryPath = currentPath.substring(currentPath.lastIndexOf('/') + 1)
    setCategory(categoryPath)
  }, [setCategory])

  const renderProducts = () => {
    if (loadingProducts || errorProducts) return <></>

    let productsToRender = products ?? []

    if (searchByTitle !== '') {
      productsToRender = filteredProducts || []
    }

    if (productsToRender.length === 0) {
      return <p className='w-full text-center'>We don&apos;t have anything ^_^</p>
    }

    return (
      <div className='grid grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-screen-lg'>
        {productsToRender.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    )
  }

  return (
    <Layout>
      <Search />
      {loadingProducts && (
        <svg
          className='animate-spin m-40 h-10 w-10 text-black'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      )}
      {errorProducts && <div>{errorProducts}</div>}
      {renderProducts()}
      <ProductDetail />
      <CheckoutSideMenu />
    </Layout>
  )
}

export default Home
