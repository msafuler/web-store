import React from 'react';
import { withRouter } from "react-router-dom";
import AttributeDetails from './AttributeDetails'

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    const productId = this.props.match.params.id;
    const thisProduct = this.props.products.filter(product => productId === product.id)[0]

    this.state = {
      picture: thisProduct.gallery[0],
      cart: {}
    }
  }

  changePicture(nextPicture) {
    this.setState({ picture: nextPicture })
  }

  render() {

    const productId = this.props.match.params.id;
    const thisProduct = this.props.products.filter(product => productId === product.id)[0]

    if (!thisProduct) {
      return <h1 className="product-error">Product not found</h1>
    } else {
      const price = thisProduct.prices.filter(price => price.currency.label === this.props.currency.label)[0]
      return (
        <div className="product-details-container">
          <div className="small-pic-container">
            {thisProduct.gallery.map(picture => {
              return <img src={picture} alt="small-pic" className="small-pic" key={picture} onClick={() => this.changePicture(picture)} />
            })}
          </div>
          <div className="main-pic-container">
            <img src={this.state.picture} alt="main-pic" className={`main-pic ${thisProduct.inStock ? '' : 'out-of-stock'}`} />
            {!thisProduct.inStock && <span className="no-stock-txt">OUT OF STOCK</span>}
          </div>
          <div className="product-details-info-container">
            <h3 className="product-detail-brand">
              {thisProduct.brand}
            </h3>
            <h2 className="product-detail-name">
              {thisProduct.name}
            </h2>
            {thisProduct.attributes.map((attribute) =>
              {
                return (
                  <AttributeDetails attribute={attribute} key={attribute.name}/>
                )
              }
            )}
            <span className="product-attribute">PRICE:</span>
            <span className="product-attribute-price">{this.props.currency.symbol} {price.amount}</span>
            <button
              className="add-to-cart-btn"
              onClick={() => this.props.addToTrolley()}
            >
              ADD TO CART
            </button>
            <div className="product-description" dangerouslySetInnerHTML={{ __html: thisProduct.description }}></div>
          </div>
        </div>
      )
    }
  }
}

export default withRouter(ProductDetails);
