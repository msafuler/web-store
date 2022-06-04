import React from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import { Switch, Route, Redirect } from "react-router-dom";
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

    let trolley;
    if (!localStorage.getItem('trolley')) {
      localStorage.setItem('trolley', '{}');
    }
    trolley = JSON.parse(localStorage.getItem('trolley'));

    this.state = {
      currency: {
        label: 'USD',
        symbol: '$'
      },
      category: {
        name: 'all'
      },
      trolley: trolley,
      overlay: false
    };

    this.changeCurrency = this.changeCurrency.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.addToTrolley = this.addToTrolley.bind(this);
    this.removeFromTrolley = this.removeFromTrolley.bind(this);
    this.changeOverlay = this.changeOverlay.bind(this);
    this.emptyTrolley = this.emptyTrolley.bind(this);
  }

  changeOverlay() {
    this.setState({ overlay: !this.state.overlay });
  }

  changeCurrency(newCurrency) {
    this.setState({ currency: newCurrency });
  }

  changeCategory(newCategory) {
    this.setState({ category: newCategory });
  }

  addToTrolley(product, attributes) {
    let newTrolley;
    if (!(product.id in this.state.trolley)) {
      newTrolley = { ...this.state.trolley, [product.id]: [{ product: product, quantity: 1, attributes: attributes }]};
      this.setState({ trolley: newTrolley });
    } else {
      const commonProducts = this.state.trolley[product.id].filter(p => {
        return p.attributes.join("") === attributes.join("");
      })
      if (commonProducts.length) {
        const newProducts = [...this.state.trolley[product.id]];
        const commonIndex = newProducts.indexOf(commonProducts[0]);
        newProducts[commonIndex].quantity++;
        newTrolley = { ...this.state.trolley, [product.id]: newProducts };
        this.setState({ trolley: newTrolley });
      } else {
        const newProducts = [...this.state.trolley[product.id], { product: product, quantity: 1, attributes: attributes }];
        newTrolley = { ...this.state.trolley, [product.id]: newProducts };
        this.setState({ trolley: newTrolley });
      }
    }
    localStorage.setItem('trolley', JSON.stringify(newTrolley));
  }

  removeFromTrolley(product, attributes) {
    let newTrolley;
    const commonProducts = this.state.trolley[product.id].filter(p => p.attributes.join("") === attributes.join(""))
    if (commonProducts.length) {
      const newProducts = [...this.state.trolley[product.id]]
      const commonIndex = newProducts.indexOf(commonProducts[0])
      newProducts[commonIndex].quantity--
      if (newProducts[commonIndex].quantity === 0) {
        newProducts.splice(commonIndex, 1)
      }
      newTrolley = { ...this.state.trolley, [product.id]: newProducts };
      this.setState({ trolley: newTrolley })
    }
    localStorage.setItem('trolley', JSON.stringify(newTrolley));
  }

  emptyTrolley() {
    this.setState({ trolley: {}});
    localStorage.setItem('trolley', '{}');
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
              removeFromTrolley={this.removeFromTrolley}
              trolley={this.state.trolley}
              overlay={this.overlay}
              changeOverlay={this.changeOverlay}
              emptyTrolley={this.emptyTrolley}
            />
            <div id="overlay" className={this.state.overlay ? "visible" : ""}></div>
            <div className="body-content">
              <Switch>
                <Route
                  exact
                path="/"
                  render={() => <Redirect to="/products" />}
                />
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
                  />
                </Route>
                <Route path="/checkout">
                  <Checkout
                    products={this.productData(data)}
                    currencies={data.currencies}
                    currency={this.state.currency}
                    addToTrolley={this.addToTrolley}
                    removeFromTrolley={this.removeFromTrolley}
                    trolley={this.state.trolley}
                    emptyTrolley={this.emptyTrolley}
                  />
                </Route>
              </Switch>
            </div>
          </div>)
        }}
      </Query>
    )
  }
}

export default App;
