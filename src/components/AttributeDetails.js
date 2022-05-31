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
            return (
              <li
                className={`product-color-button ${this.props.selectedAttributeItem === item.value ? 'selected' : ''}`}
                key={item.value}
                style={{background: item.value}}
                onClick={() => this.props.changeSelectedAttributeItem(item.value, this.props.attributeIndex)}
                >
                </li>
              )
          } else {
            return (
              <li
                key={item.value}
                className={`product-attribute-button ${this.props.selectedAttributeItem === item.value ? 'selected' : ''}`}
                onClick={() => this.props.changeSelectedAttributeItem(item.value, this.props.attributeIndex)}
              >
                {item.value}
              </li>
            )
          }
        })}
        </ul>
      </div>
    )
  }
}
