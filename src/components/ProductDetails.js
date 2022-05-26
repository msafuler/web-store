import React from 'react';
import { withRouter } from "react-router-dom";

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const productId = this.props.match.params.id;
    const thisProduct = this.props.products.filter(product => productId === product.id)[0]

    console.log(thisProduct);

    if (!thisProduct) {
      return <h1 className="product-error">Product not found</h1>
    } else {
      const price = thisProduct.prices.filter(price => price.currency.label === this.props.currency.label)[0]
      return (
        <div className="product-details-container">

          <div className="small-pic-container">
            <img src={thisProduct.gallery} alt="small-pic" className="small-pic" />
          </div>
          <div className="main-pic-container">
            <img src={thisProduct.gallery} alt="main-pic" className={`main-pic ${thisProduct.inStock ? '' : 'out-of-stock'}`} />
            {!thisProduct.inStock && <span className="no-stock-txt">OUT OF STOCK</span>}
          </div>
            <div className="product-details-info-container">
              <h3 className="product-detail-brand">
                {thisProduct.brand}
              </h3>
              <h2 className="product-detail-name">
                {thisProduct.name}
              </h2>
              <span className="product-property">SIZE:</span>
              <ul className="product-attribute-buttons-container">
                <li className="product-size-button">XS</li>
                <li className="product-size-button">S</li>
                <li className="product-size-button">M</li>
                <li className="product-size-button">L</li>
              </ul>
              <span className="product-property">COLOR:</span>
              <ul className="product-color-buttons-container">
                <li className="product-color-button" />
                <li className="product-color-button" />
                <li className="product-color-button" />
              </ul>
              <span className="product-property">PRICE:</span>
              <span>{this.props.currency.symbol} {price.amount}</span>
            </div>
          <div></div>
        </div>
      )
    }
  }
}

export default withRouter(ProductDetails);
