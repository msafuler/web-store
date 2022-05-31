import React from 'react';
import CheckoutProduct from './CheckoutProduct';
import { findPrice } from '../utilities/utility';

export default class Checkout extends React.Component {

  render() {
    let priceSum = 0;

    return (
      <div className="cart-container">
        <h1 className="cart-div">CART</h1>
        {Object.keys(this.props.trolley).map((id) => {
          return this.props.trolley[id].map((cartItem) => {
            priceSum += findPrice(cartItem.product.prices, this.props.currency).amount * cartItem.quantity

            return (
              <CheckoutProduct
                cartItem={cartItem}
                currencies={this.props.currencies}
                currency={this.props.currency}
                addToTrolley={this.props.addToTrolley}
                removeFromTrolley={this.props.removeFromTrolley}
                trolley={this.props.trolley}
                key={cartItem.attributes.toString()}
              />
            )
          })
        })}
        <span>Tax 21%: </span>
        <span>Quantity: </span>
        <span>Total: {priceSum.toFixed(2)}</span>
        <button className="order-btn">ORDER</button>
      </div>
    )
  }
}
