import React from 'react';
import Product from './Product';
import { findPrice } from '../utilities/utility'

export default class ProductList extends React.Component {

  render() {
    return (
      <div>
        <h1 className="capitalize">{this.props.category.name}</h1>
        <div className='product-container'>
          {this.props.products.map(product => (
            < Product
              key={product.id}
              id={product.id}
              gallery={product.gallery[0]}
              name={product.name}
              brand={product.brand}
              inStock={product.inStock}
              currency={this.props.currency}
              price={findPrice(product.prices, this.props.currency)}
            />
          ))}
        </div>
      </div>
    )
  }
}
