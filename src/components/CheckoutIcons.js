import React from 'react';
import CurrencyList from './CurrencyList';
import Trolley from './Trolley';
import { findPrice } from '../utilities/utility';

export default class CheckoutIcons extends React.Component {

  render() {
    let quantity = 0;
    let priceSum = 0;

    Object.keys(this.props.trolley).map((id) => {
      return this.props.trolley[id].map((cartItem) => {
        priceSum += findPrice(cartItem.product.prices, this.props.currency).amount * cartItem.quantity
        quantity += cartItem.quantity;
      })
    });

    return (
      <div className='right-side-icons'>
        <CurrencyList
          currency={this.props.currency}
          changeCurrency={this.props.changeCurrency}
          currencies={this.props.currencies}
        />
        <div>
          <Trolley
          trolley={this.props.trolley}
          currency={this.props.currency}
          currencies={this.props.currencies}
          addToTrolley={this.props.addToTrolley}
          removeFromTrolley={this.props.removeFromTrolley}
          products={this.props.products}
          quantity={quantity}
          priceSum ={priceSum}
          />
        </div>
      </div>
    )
  }
}
