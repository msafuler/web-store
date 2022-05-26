import React from 'react';
import { Link } from "react-router-dom";
import greentrolley from '../icons/green-trolley.png';

export default class Product extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Link to={`/products/${this.props.id}`}>
        <div className='product'>
          <div className='img-container'>
            <img src={this.props.gallery} alt="product-pic" className={`product-img ${this.props.inStock ? '' : 'out-of-stock'}`} />
            {!this.props.inStock && <span className="no-stock-txt">OUT OF STOCK</span>}
          </div>
          <img src={greentrolley} alt="green-trolley" className='green-trolley' />
          <div className='product-info'>
            <span className="product-name">{this.props.name}</span>
            <span className="product-price">{this.props.price.amount} {this.props.currency.symbol}</span>
          </div>
        </div>
      </Link>
    )
  }
}
