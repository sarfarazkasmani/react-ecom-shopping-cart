import React, { Component } from "react";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./components/ui/Theme";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Header />
            <Route path='/admin' component={AdminScreen} />
            <Route path='/' component={HomeScreen} exact />

            <Footer />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
