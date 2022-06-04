import React from 'react';
import CurrencyList from './CurrencyList';
import Trolley from './Trolley';
import { findPrice } from '../utilities/utility';

export default class CheckoutIcons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isListOpen: false
    };

    this.box = React.createRef();
    this.toggleList = this.toggleList.bind(this);
  }

  toggleList() {
    this.setState(prevState => ({
      isListOpen: !prevState.isListOpen
    }));
  };

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (event) => {
    if (this.box.current && !this.box.current.contains(event.target)) {
      this.setState({ isListOpen: false });
    }
  }

  render() {
    let quantity = 0;
    let priceSum = 0;

    Object.keys(this.props.trolley).forEach((id) => {
      this.props.trolley[id].forEach((cartItem) => {
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
          innerRef={this.box}
          toggleList={this.toggleList}
          isListOpen={this.state.isListOpen}
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
          overlay={this.props.overlay}
          changeOverlay={this.props.changeOverlay}
          emptyTrolley={this.props.emptyTrolley}
          />
        </div>
      </div>
    )
  }
}
