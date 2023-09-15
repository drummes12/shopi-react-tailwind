import { createContext, useState, useEffect } from 'react'
import { urlCategories, urlProducts, urlProductsByCategory } from '../services/endPoints'
import { accessData, getData } from '../utils/accessData'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const ShoppingCartContext = createContext()

export function ShoppingCartProvider({ children }) {
  const [cartProducts, setCartProducts] = useLocalStorage('cartProducts', [])
  const [orders, setOrders] = useLocalStorage('orders', [])
  const [totalProducts, setTotalProducts] = useLocalStorage('totalProducts', {})
  const [productToShow, setProductToShow] = useState({})
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
  const [products, setProducts] = useState(null)
  const [filteredProducts, setFilteredProducts] = useState(null)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [errorProducts, setErrorProducts] = useState(null)
  const [searchByTitle, setSearchByTitle] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    let totalPrice = 0
    cartProducts.forEach(({ price }) => (totalPrice += price))

    setTotalProducts({
      totalPrice,
      totalProducts: cartProducts.length,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartProducts])

  const productInDetail = (product) => setProductToShow(product)
  const openProductDetail = () => {
    setIsProductDetailOpen(true)
    setIsCheckoutSideMenuOpen(false)
  }
  const closeProductDetail = () => setIsProductDetailOpen(false)

  const openCheckoutSideMenu = () => {
    setIsCheckoutSideMenuOpen(true)
    setIsProductDetailOpen(false)
  }
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

  const addProductToCart = (product) => {
    setCartProducts((prevCartProducts) => {
      const existsProduct = prevCartProducts.find(({ id }) => id === product.id)
      if (existsProduct) return prevCartProducts
      const newCartProducts = [...prevCartProducts, product]
      return newCartProducts
    })
    openCheckoutSideMenu()
  }

  const removeProductToCart = (deleteIndex) => {
    setCartProducts((prevCartProducts) => {
      const newCartProducts = prevCartProducts.filter(({ id }) => id !== deleteIndex)
      return newCartProducts
    })
  }

  const addOrder = () => {
    if (totalProducts.totalProducts === 0) return
    setSearchByTitle('')
    const orderToAdd = {
      id: crypto.randomUUID(),
      date: new Date(),
      products: cartProducts,
      totalProducts: totalProducts.totalProducts,
      totalPriceProducts: totalProducts.totalPrice,
    }
    setOrders((prevOrders) => [...prevOrders, orderToAdd])
    setCartProducts([])
  }

  useEffect(() => {
    if (category === '') {
      accessData(urlProducts, setErrorProducts, setLoadingProducts, setProducts)
    } else {
      getData(urlCategories).then((categories) => {
        const categoryId = categories?.find((categoryAPI) =>
          categoryAPI?.name?.toLowerCase().includes(category?.toLowerCase())
        )?.id
        if (categoryId) accessData(urlProductsByCategory(categoryId), setErrorProducts, setLoadingProducts, setProducts)
        else setProducts([])
      })
    }
  }, [category])

  useEffect(() => {
    if (searchByTitle !== '') {
      const filteredProducts = products?.filter((product) =>
        product.title.toLowerCase().includes(searchByTitle.toLowerCase())
      )
      setFilteredProducts(filteredProducts)
    }
  }, [products, searchByTitle])

  useEffect(() => {
    setSearchByTitle('')
    setCategory(category)
  }, [category])

  return (
    <ShoppingCartContext.Provider
      value={{
        isProductDetailOpen,
        openProductDetail,
        closeProductDetail,
        productToShow,
        productInDetail,
        cartProducts,
        addProductToCart,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        removeProductToCart,
        totalProducts,
        orders,
        addOrder,
        products,
        filteredProducts,
        loadingProducts,
        errorProducts,
        searchByTitle,
        setSearchByTitle,
        setCategory,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
