import {useState, useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home'
import LoginRoute from './components/LoginRoute'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import NxtMartContext from './context/NxtMartContext'
import './App.css'

const getLocalCartData = () => {
  const localCartData = localStorage.getItem('cartData')
  if (localCartData === null) {
    return []
  } else {
    return JSON.parse(localCartData)
  }
}

const App = () => {
  const [cartList, setCartList] = useState(getLocalCartData())

  const addCartItem = product => {
    setCartList(prevCartList => {
      prevCartList = prevCartList || []

      const existingItem = prevCartList.find(item => item.id === product.id)
      if (existingItem) {
        const updatedCartList = prevCartList.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + 1}
            : item,
        )
        localStorage.setItem('cartData', JSON.stringify(updatedCartList))
        return updatedCartList
      } else {
        const updatedCartList = [...prevCartList, product]
        localStorage.setItem('cartData', JSON.stringify(updatedCartList))
        return updatedCartList
      }
    })
    console.log(cartList)
  }

  const incrementCartItemQuantity = id => {
    setCartList(prevCartList => {
      const updatedCartList = prevCartList.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      )
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
      return updatedCartList
    })
  }

  const decrementCartItemQuantity = id => {
    setCartList(prevCartList => {
      const updatedCartList = prevCartList.map(item =>
        item.id === id && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      )
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
      return updatedCartList
    })
  }

  const removeCartItem = id => {
    setCartList(prevCartList => prevCartList.filter(item => item.id !== id))
    localStorage.removeItem('cartData')
  }

  return (
    <NxtMartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      <Switch>
        <Route exact path="/login" component={LoginRoute} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </NxtMartContext.Provider>
  )
}

export default App
