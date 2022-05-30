import React from 'react';

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: {}
    }
  }

  render() {
    return (
      <div className="cart-container">
        <h1>CART</h1>
        <span>PRODUCTS</span>
        <span>Tax 21%:</span>
        <span>Quantity:</span>
        <span>Total:</span>
        <button className="order-btn">ORDER</button>
      </div>
    )
  }
}
