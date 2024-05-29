import {useState, useContext} from 'react'
import {MdCurrencyRupee} from 'react-icons/md'
import {GoPlus} from 'react-icons/go'
import {FaMinus} from 'react-icons/fa'

import NxtMartContext from '../../context/NxtMartContext'
import './index.css'

const ProductItem = props => {
  const [quantity, setQuantity] = useState(1)
  const [showQuantityControl, setShowQuantityControl] = useState(false)

  const {addCartItem} = useContext(NxtMartContext) // Use useContext hook instead of Consumer
  const {product} = props
  const {id, name, weight, price, image} = product
  const actualPrice = parseFloat(price.slice(1)).toFixed(2)

  const increaseProductQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
    addCartItem({...product, quantity: quantity + 1})
  }

  const decreaseProductQuantity = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1)
      addCartItem({...product, quantity: quantity - 1})
    }
    // Hide decrement and increment buttons, show add button when quantity is 0
    if (quantity === 0) {
      setShowQuantityControl(false)
    }
  }

  const handleQuantity = () => {
    setShowQuantityControl(true)
    addCartItem({...product, quantity})
  }

  return (
    <div className="product-list-container">
      <li>
        <img src={image} alt={name} className="product-image" />
        <div className="content-container">
          <div>
            <p className="name">{name}</p>
            <p className="description">{weight}</p>
            <p className="price-tag">
              <MdCurrencyRupee /> {actualPrice}
            </p>
          </div>
          <div>
            <button
              type="button"
              className={showQuantityControl ? 'not-show-add-btn' : 'add-btn'}
              onClick={handleQuantity}
              data-testid="add-button"
            >
              Add
            </button>
            {showQuantityControl && (
              <div className="button-container">
                <button
                  type="button"
                  onClick={decreaseProductQuantity}
                  className="quantity-btn"
                  data-testid="decrement-count"
                >
                  <FaMinus />
                </button>
                <button
                  data-testid="active-count"
                  className="quantity-value-button"
                >
                  {quantity}
                </button>
                <button
                  type="button"
                  onClick={increaseProductQuantity}
                  className="quantity-btn"
                  data-testid="increment-count"
                >
                  <GoPlus />
                </button>
              </div>
            )}
          </div>
        </div>
      </li>
    </div>
  )
}

export default ProductItem
