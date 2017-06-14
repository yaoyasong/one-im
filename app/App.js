import React, {Component} from "react";

import { Provider} from "react-redux";
import configureStore from './configureStore';
import Home from "./common/container/Home";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({isLoading: false})),
    };
  }
  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <Provider store={ this.state.store }>
          <Home />
      </Provider>
    );
  }
}
