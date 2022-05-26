import React from 'react';
import { Link } from "react-router-dom";
import CategoryList from './CategoryList';
import CheckoutIcons from './CheckoutIcons';
import bag from '../icons/bag.png';
import '../styles/styles.scss';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='navbar-container'>
        <CategoryList
          currencies={this.props.currencies}
          currency={this.props.currency}
          category={this.props.category}
          changeCategory={this.props.changeCategory}
        />
        <div className='bag-container'>
          <Link to="/products">
            <img src={bag} alt="green-bag" id='green-bag' />
          </Link>
        </div>
        <CheckoutIcons
          changeCurrency={this.props.changeCurrency}
          currencies={this.props.currencies}
          currency={this.props.currency}
        />
      </div>
    )
  }
}
