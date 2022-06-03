import React from 'react';

export default class CurrencyList extends React.Component {
  render() {
    return (
      <>
        <span
          id='currency-icon'
          onClick={this.props.toggleList}
          ref={this.props.innerRef}
        >
          {this.props.currency.symbol} <i className={`arrow ${this.props.isListOpen ? 'up' : 'down'}`}></i>
        </span>
        <div className={`currencies ${this.props.isListOpen ? '' : 'hidden'}`}>
          {this.props.currencies.map((currency) => (
            <span
              key={currency.label}
              className="pick-currency"
              onClick={() => this.props.changeCurrency(currency)}
            >
              {currency.symbol} {currency.label}
            </span>
          ))}
        </div>
      </>
    )
  }
}
