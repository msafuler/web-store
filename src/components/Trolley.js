import React from 'react';
import trolley from '../icons/trolley.png';
import CheckoutProduct  from './CheckoutProduct';
import { Link } from "react-router-dom";

export default class Trolley extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTrolleyOpen: false
    };

    this.toggleTrolleyList = this.toggleTrolleyList.bind(this)
  }

  toggleTrolleyList() {
    this.setState(prevState => ({
      isTrolleyOpen: !prevState.isTrolleyOpen
    }));
    this.props.changeOverlay()
  }

  render() {
    return (
      <div>
        <img src={trolley} alt="trolley" id='trolley'
          onClick={() => this.toggleTrolleyList()}
        />
        <span className="trolley-quantity-counter">{this.props.quantity}</span>
        <div
          className={`trolley-content ${this.state.isTrolleyOpen ? '' : 'hidden-trolley'}`}
        >
            <h2>My bag: {this.props.quantity}</h2>
            {Object.keys(this.props.trolley).map((id) => {
              return (
                <div key={id}>
                  {this.props.trolley[id].map((cartItem) => {
                    return (
                      <div
                        className="trolley-products-container"
                        key={cartItem.attributes.toString()}
                        >
                        <div className='trolley-products'>
                          <CheckoutProduct
                            cartItem={cartItem}
                            currencies={this.props.currencies}
                            currency={this.props.currency}
                            addToTrolley={this.props.addToTrolley}
                            removeFromTrolley={this.props.removeFromTrolley}
                            trolley={this.props.trolley}
                            displayButtons={false}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
            <span className="total-price">Total: {this.props.currency.symbol} {this.props.priceSum.toFixed(2)}</span>
            <div className="trolley-buttons-container">
              <Link to="/checkout">
                <button
                  className="view-bag-button"
                  onClick={() => this.toggleTrolleyList()}
                >
                  VIEW BAG
                </button>
              </Link>
                <button
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
