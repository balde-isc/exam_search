/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */
import React from 'react';
import productsService from '../services/products.service';
import ListComponent from './search/list';
import LoaderComponet from './shared/loader';

class Menu extends React.Component {
  /**
   * Main constructor for the Menu Class
   * @memberof Menu
   */
  constructor() {
    super();
    this.state = {
      showingSearch: true,
      delaySearcher: 0,
      valueSearch: "",
      products: [],
      metaPagination: {}
    };
  }

  /**
   * Shows or hides the search container
   * @memberof Menu
   * @param e [Object] - the event from a click handler
   */
  showSearchContainer(e) {
    e.preventDefault();
    this.setState({ valueSearch: "", products: [] })
    this.setState({
      showingSearch: !this.state.showingSearch,
    });
  }

  /**
   * Calls upon search change
   * @memberof Menu
   * @param e [Object] - the event from a text change handler
   */
  onSearch(e) {
    e.preventDefault();
    this.setState({ loading: true, valueSearch: e.target.value });
    clearTimeout(this.state.delaySearcher);
    this.state.delaySearcher = setTimeout(async () => {
      const resProducts = await productsService.getProducts(this.state.valueSearch);
      this.setState({ loading: false, products: resProducts.data, metaPagination: resProducts.meta })
    }, 500);
    return
  }

  /**
   * Renders the default app in the window, we have assigned this to an element called root.
   *
   * @returns JSX
   * @memberof App
   */
  render() {
    return (
      <header className="menu">
        <div className="menu-container">
          <div className="menu-holder">
            <h1>Coding Test</h1>
            <nav>
              <a href="#" className="nav-item">
                HOLIDAY
              </a>
              <a href="#" className="nav-item">
                WHAT'S NEW
              </a>
              <a href="#" className="nav-item">
                PRODUCTS
              </a>
              <a href="#" className="nav-item">
                BESTSELLERS
              </a>
              <a href="#" className="nav-item">
                GOODBYES
              </a>
              <a href="#" className="nav-item">
                STORES
              </a>
              <a href="#" className="nav-item">
                INSPIRATION
              </a>

              <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                <i className="material-icons search">search</i>
              </a>
            </nav>
          </div>
        </div>
        <div
          className={
            (this.state.showingSearch ? 'showing ' : '') + 'search-container'
          }
        >
          <input type="text" value={this.state.valueSearch} onChange={(e) => this.onSearch(e)} />
          <a href="#" onClick={(e) => this.showSearchContainer(e)}>
            <i className="material-icons close">close</i>
          </a>
          <LoaderComponet show={this.state.loading} description={'loading products...'}></LoaderComponet>

          {!this.state.loading && this.state.valueSearch !== "" ?
            <ListComponent products={this.state.products} metaPagination={this.state.metaPagination}></ListComponent>
            : null}
        </div>
      </header>
    );
  }
}

// Export out the React Component
module.exports = Menu;
