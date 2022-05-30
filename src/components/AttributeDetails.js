import React from 'react';

export default class AttributeDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span className="product-attribute">
          {this.props.attribute.name.toUpperCase()}
        </span>
        <ul className="product-attribute-buttons-container">
        {this.props.attribute.items.map((item) => {
          if (this.props.attribute.type === 'swatch') {
            return <li className="product-color-button" key={item.value} style={{background: item.value}}></li>
          } else {
            return (
              <li key={item.value} className="product-attribute-button">{item.value}</li>
            )
          }
        })}
        </ul>
      </div>
    )
  }
}
