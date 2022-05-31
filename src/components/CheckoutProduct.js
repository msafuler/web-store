import React from 'react';
import AttributeDetails from './AttributeDetails';
import { findPrice } from '../utilities/utility';

export default class CheckoutProduct extends React.Component {

  render() {
    const price = findPrice(this.props.cartItem.product.prices, this.props.currency)

    return (
      <>
      <div className="checkout-product-container">
        <div className="checkout-product">
          <h3>
            {this.props.cartItem.product.brand}
          </h3>
          <h2>
            {this.props.cartItem.product.name}
          </h2>
            <span className="product-attribute-price">
              {this.props.currency.symbol} {price.amount}
            </span>
          {this.props.cartItem.product.attributes.map((attribute, attributeIndex) => {
            return (
              <AttributeDetails
                attribute={attribute}
                key={attribute.name}
                attributeIndex={attributeIndex}
                selectedAttributeItem={this.props.cartItem.attributes[attributeIndex]}
                changeSelectedAttributeItem={() => {}}
              />
            )
          }
          )}
        </div>
        <div className="checkout-buttons-container">
            <button onClick={() => this.props.addToTrolley(this.props.cartItem.product, this.props.cartItem.attributes)}>+</button>
          {this.props.cartItem.quantity}
            <button onClick={() => this.props.removeFromTrolley(this.props.cartItem.product, this.props.cartItem.attributes)}>-</button>
        </div>
        <div className="checkout-picture-container">
          <img src={this.props.cartItem.product.gallery[0]} alt="checkout-pic" className="checkout-pic" />
        </div>
      </div>
      <hr className="line-break"></hr>
      </>
    )
  }
}