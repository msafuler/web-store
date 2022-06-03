import React from 'react';
import CategoryList from './CategoryList';
import CheckoutIcons from './CheckoutIcons';
import bag from '../icons/bag.png';
import '../styles/styles.scss';

export default class Navbar extends React.Component {

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
          <img src={bag} alt="green-bag" id='green-bag' />
        </div>
        <CheckoutIcons
          changeCurrency={this.props.changeCurrency}
          currencies={this.props.currencies}
          currency={this.props.currency}
          trolley={this.props.trolley}
          products={this.props.products}
          addToTrolley={this.props.addToTrolley}
          removeFromTrolley={this.props.removeFromTrolley}
          overlay={this.props.overlay}
          changeOverlay={this.props.changeOverlay}
        />
      </div>
    )
  }
}
