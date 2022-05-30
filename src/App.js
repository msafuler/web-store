import React from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import { Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Checkout from './components/Checkout';
import ProductDetails from './components/ProductDetails';
import './App.css';

const getAll = gql`
{
  currencies {
    label
    symbol
  }
  categories {
    name
    products {
      name
      id
      prices {
        currency {
          symbol
          label
        }
        amount
      }
      gallery
      description
      inStock
      category
      attributes {
        name
        type
        items {
          displayValue
          value
        }
      }
      brand
    }
  }
}`

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: {
        label: 'USD',
        symbol: '$'
      },
      category: {
        name: 'all'
      },
      trolley: {}
    };

    this.changeCurrency = this.changeCurrency.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }

  changeCurrency(newCurrency) {
    this.setState({ currency: newCurrency });
  }

  changeCategory(newCategory) {
    this.setState({ category: newCategory });
  }

  addToTrolley(product) {

    //this.state.trolley[product.id].filter((item) => item.attributes product.attributes)



    if (!(product.id in this.state.trolley)) {
      this.setState({ trolley: {...this.state.trolley, [product.id]: {product: product, quantity: 1}} })
    } else {
      this.setState({ trolley: { ...this.state.trolley, [product.id]: [{ product: product, quantity: this.state.trolley[product.id].quantity + 1}]}})
    }
  }

  productData(data) {
    return data.categories.filter((category) => category.name === this.state.category.name)[0].products
  }

  render() {
    return (
      <Query query={getAll}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading…</p>;
          if (error) return <p>Error :(</p>;
        return (
          <div>
            <Navbar
              currencies={data.currencies}
              currency={this.state.currency}
              changeCurrency={this.changeCurrency}
              changeCategory={this.changeCategory}
              category={this.state.category}
              products={this.productData(data)}
              addToTrolley={this.addToTrolley}
            />
            <Switch>
              <Route path="/products/:id">
                <ProductDetails
                  products={this.productData(data)}
                  addToTrolley={this.addToTrolley}
                  currencies={data.currencies}
                  currency={this.state.currency}
                />
              </Route>
              <Route path="/products">
                <ProductList
                  category={this.state.category}
                  products={this.productData(data)}
                  currencies={data.currencies}
                  currency={this.state.currency}
                  addToTrolley={this.addToTrolley}
                />
              </Route>
             <Route path="/checkout">
                <Checkout
                  products={this.productData(data)}
                  currencies={data.currencies}
                  currency={this.state.currency}
                />
              </Route>
            </Switch>
          </div>)
        }}
      </Query>
    )
  }
}

export default App;
