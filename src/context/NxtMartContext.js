import React from 'react'

const NxtMartContext = React.createContext({
  cartList: [],
  removeCartItem: () => {},
  addCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default NxtMartContext
