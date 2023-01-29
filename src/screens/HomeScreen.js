import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Filter from "../components/Filter/Filter";
import Products from "../components/Products/Products";
import Cart from "../components/Cart/Cart";

export default class HomeScreens extends Component {
  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={9}>
            <Filter />
            <Products />
          </Grid>
          <Grid item xs={3}>
            <Cart />
          </Grid>
        </Grid>
      </div>
    );
  }
}
