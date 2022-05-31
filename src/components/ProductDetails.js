import React from 'react';
import { withRouter } from "react-router-dom";
import AttributeDetails from './AttributeDetails';
import { findPrice } from '../utilities/utility';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    const productId = this.props.match.params.id;
    const thisProduct = this.props.products.filter(product => productId === product.id)[0]

    this.state = {
      picture: thisProduct.gallery[0],
      cart: {},
      selectedAttributes: thisProduct.attributes.map(attribute => attribute.items[0].value)
    }
    this.changeSelectedAttributeItem = this.changeSelectedAttributeItem.bind(this)
  }

  changePicture(nextPicture) {
    this.setState({ picture: nextPicture })
  }

  changeSelectedAttributeItem(item, selectedAttributeIndex) {
    const newSelectedAttributes = [...this.state.selectedAttributes];
    newSelectedAttributes[selectedAttributeIndex] = item;
    this.setState({ selectedAttributes: newSelectedAttributes })
  }

  render() {

    const productId = this.props.match.params.id;
    const thisProduct = this.props.products.filter(product => productId === product.id)[0]

    if (!thisProduct) {
      return <h1 className="product-error">Product not found</h1>
    } else {
      const price = findPrice(thisProduct.prices, this.props.currency)

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
            {thisProduct.attributes.map((attribute, attributeIndex) =>
              {
                return (
                  <AttributeDetails
                    attribute={attribute}
                    key={attribute.name}
                    attributeIndex={attributeIndex}
                    selectedAttributeItem={this.state.selectedAttributes[attributeIndex]}
                    changeSelectedAttributeItem={this.changeSelectedAttributeItem}
                  />
                )
              }
            )}
            <span className="product-attribute">PRICE:</span>
            <span className="product-attribute-price">{this.props.currency.symbol} {price.amount}</span>
            <button
              className={`add-to-cart-btn ${this.props.addToTrolley ? 'btn-clicked' : ''}`}
              disabled={!thisProduct.inStock}
              onClick={() => this.props.addToTrolley(thisProduct, this.state.selectedAttributes) }
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
