import React from 'react';
import trolley from '../icons/trolley.png';
import CheckoutProduct  from './CheckoutProduct';
import { Link } from "react-router-dom";
import { findPrice } from '../utilities/utility';

export default class Trolley extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTrolleyOpen: false
    };
    this.toggleTrolleyList.bind = this.toggleTrolleyList.bind(this);
  }

  toggleTrolleyList = () => {
    this.setState(prevState => ({
      isTrolleyOpen: !prevState.isTrolleyOpen
    }));
  };

  render() {
    let priceSum = 0;
    let quantity = 0;

    return (
      <div>
        <img src={trolley} alt="trolley" id='trolley'
          onClick={this.toggleTrolleyList}
        /> { /* TODO:issue with closing the trolley */ }
        <div className={`trolley-content ${this.state.isTrolleyOpen ? '' : 'hidden-trolley'}`}>
          {Object.keys(this.props.trolley).map((id) => {
            return this.props.trolley[id].map((cartItem) => {
              priceSum += findPrice(cartItem.product.prices, this.props.currency).amount * cartItem.quantity
              quantity += cartItem.quantity;

              return (
                <>
                  <h2>My bag: {quantity}</h2>   { /* TODO:issue with the bag size */}
                <div className='trolley-products'>
                  <CheckoutProduct
                    cartItem={cartItem}
                    currencies={this.props.currencies}
                    currency={this.props.currency}
                    addToTrolley={this.props.addToTrolley}
                    removeFromTrolley={this.props.removeFromTrolley}
                    trolley={this.props.trolley}
                    key={cartItem.attributes.toString()}
                    displayButtons={false}
                    displayLine={false}
                  />
                </div>
                </>
              )
            })
          })}
          <span className="total-price">Total: {this.props.currency.symbol} {priceSum.toFixed(2)}</span>
          <div className="trolley-buttons-container">
            <Link to="/checkout">
              <button
                className="view-bag-button"
              >
                VIEW BAG
              </button>
            </Link>
              <button
                onClick={this.toggleTrolley}
                className="checkout-button"
              >
                CHECKOUT
              </button>
          </div>
        </div>
      </div>
    )
  }
}
