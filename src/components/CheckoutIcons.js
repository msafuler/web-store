import React from 'react';
import CurrencyList from './CurrencyList';
import Trolley from './Trolley'

export default class CheckoutIcons extends React.Component {

  render() {
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
          />
        </div>
      </div>
    )
  }
}
