import React, {Component} from 'react';
import {render} from 'react-dom';
import {Results} from './components/Results';
import {Search} from './components/Search';
import data from './data.json';

class App extends Component {

  constructor() {
    super();
    this.state = {
      results: []
    }
  }

  _searchChange(e) {
    var results = [];
    if (e.target.value) {
      Object.keys(data).forEach(country => {
        const found = data[country].filter(city => {
          return city.toLowerCase().startsWith(e.target.value.toLowerCase())
        });
        if (results.length < 100) {
          results = found.reduceRight((coll,item) => {
            coll.unshift(item);
            return coll;
          }, results);
        }
      });
    }
    this.setState({ results: results });
  }

  render() {
    return (
      <div>
        <h1>My First React App</h1>
        <Search onChange={this._searchChange.bind(this)} />
        <Results results={this.state.results} />
      </div>
    );
  }
}

render(
  <App />,
  document.getElementById('app')
);
