import React from 'react';
import { gql } from '@apollo/client';
import { Link } from "react-router-dom";
import { Query } from '@apollo/client/react/components';

const getCategories = gql`
{
  categories {
    name
  }
}`

export default class CategoryList extends React.Component {

  render() {
    return (
      <Query query={getCategories}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading…</p>;
          if (error) return <p>Error :(</p>;
          return (<div className='navbar-categories'>
           { data.categories.map((category) => (
              <span
                key={category.name}
                onClick={() => this.props.changeCategory(category)}
                className={category.name === this.props.category.name ? 'selected-category' : ''}
              >
                <Link to="/products/">{category.name.toUpperCase()}</Link>
              </span>
            ))}
          </div>)
        }}
      </Query>
    )
  }
}
