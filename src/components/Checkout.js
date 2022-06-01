import React from 'react';
import CheckoutProduct from './CheckoutProduct';
import { findPrice } from '../utilities/utility';

export default class Checkout extends React.Component {

  render() {
    let priceSum = 0;
    let quantity = 0;

    return (
      <div className="cart-container">
        <h1 className="cart-div">CART</h1>
        {Object.keys(this.props.trolley).map((id) => {
          return this.props.trolley[id].map((cartItem) => {
            priceSum += findPrice(cartItem.product.prices, this.props.currency).amount * cartItem.quantity
            quantity += cartItem.quantity;

            return (
              <CheckoutProduct
                cartItem={cartItem}
                currencies={this.props.currencies}
                currency={this.props.currency}
                addToTrolley={this.props.addToTrolley}
                removeFromTrolley={this.props.removeFromTrolley}
                trolley={this.props.trolley}
                key={cartItem.attributes.toString()}
                displayButtons={true}
                displayLine={true}
              />
            )
          })
        })}
        <span>Tax 21%: {this.props.currency.symbol} { (.21 * priceSum).toFixed(2) }</span>
        <span>Quantity: { quantity}</span>
        <span>Total: { this.props.currency.symbol } { priceSum.toFixed(2) }</span>
        <button className="order-btn">ORDER</button>
      </div>
    )
  }
}
