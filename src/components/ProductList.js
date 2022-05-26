import React from 'react';
import Product from './Product';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
  }

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
              inStock={product.inStock}
              currency={this.props.currency}
              price={product.prices.filter(price => price.currency.label === this.props.currency.label)[0]}
            />
          ))}
        </div>
      </div>
    )
  }
}
