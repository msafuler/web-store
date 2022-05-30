import React from 'react';
import { Link } from "react-router-dom";
import CurrencyList from './CurrencyList';
import trolley from '../icons/trolley.png';

export default class CheckoutIcons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='right-side-icons'>
        <CurrencyList
          currency={this.props.currency}
          changeCurrency={this.props.changeCurrency}
          currencies={this.props.currencies}
        />
        <Link to="/checkout">
          <img src={trolley} alt="trolley" id='trolley' />
        </Link>
      </div>
    )
  }
}
