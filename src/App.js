import React from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import { Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import TrolleyList from './components/TrolleyList';
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
    if (!(product.id in this.state.trolley)) {
      this.setState({ trolley: {...this.state.trolley, [product.id]: [product, 1]} })
    } else {
      this.setState({ trolley: {...this.state.trolley, [product.id]: [product, this.state.trolley[product.id][1] + 1]}})
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
          console.log(data)
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
             {/* <Route path="/checkout">
                <TrolleyList />
              </Route> */}
            </Switch>
          </div>)
        }}
      </Query>
    )
  }
}

export default App;
