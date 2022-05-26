import React from 'react';

export default class CurrencyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isListOpen: false
    };
    this.toggleList.bind = this.toggleList.bind(this);
  }

  toggleList = () => {
    this.setState(prevState => ({
      isListOpen: !prevState.isListOpen
    }));
  };

  render() {
    return (
      <>
        <span
          id='currency-icon'
          onClick={this.toggleList}
        >
          {this.props.currency.symbol} <i className={`arrow ${this.state.isListOpen ? 'up' : 'down'}`}></i>
        </span>
        <div className={`currencies ${this.state.isListOpen ? '' : 'hidden'}`}>
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
