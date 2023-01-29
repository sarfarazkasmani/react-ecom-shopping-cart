import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { filterProducts, sortProducts } from "../../actions/productActions";
import {
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  productCount: {
    margin: theme.spacing(2, 0, 0, 0),
  },
  // selectEmpty: {
  //   marginTop: theme.spacing(2),
  // },
}));

const Filter = ({
  size,
  sort,
  sortProducts,
  filterProducts,
  filteredProducts,
  products,
}) => {
  const classes = useStyles();
  return !filteredProducts ? (
    <div>Loading...</div>
  ) : (
    <>
      <div style={{ padding: 12 }}>
        <Grid container>
          <Grid container item xs={4} alignItems='center'>
            <Typography variant='body1' className={classes.productCount}>
              {filteredProducts.length} Products
            </Typography>
          </Grid>
          <Grid container item xs={4}>
            <FormControl className={classes.formControl}>
              <InputLabel id='order-label'>Order</InputLabel>
              <Select
                value={sort}
                onChange={(e) => sortProducts(filteredProducts, e.target.value)}
              >
                <MenuItem value='latest'>Latest</MenuItem>
                <MenuItem value='lowest'>Lowest</MenuItem>
                <MenuItem value='highest'>Highest</MenuItem>
              </Select>
            </FormControl>
            {/* <select value={sort} onChange={sortProducts}>
          <option>Latest</option>
          <option value='lowest'>Lowest</option>
          <option value='highest'>Highest</option>
        </select> */}
          </Grid>
          <Grid container item xs={4}>
            <FormControl className={classes.formControl}>
              <InputLabel id='order-label'>Select Size</InputLabel>
              <Select
                value={size}
                onChange={(e) => filterProducts(products, e.target.value)}
              >
                <MenuItem value=''>All</MenuItem>
                <MenuItem value='XS'>XS</MenuItem>
                <MenuItem value='S'>S</MenuItem>
                <MenuItem value='M'>M</MenuItem>
                <MenuItem value='L'>L</MenuItem>
                <MenuItem value='XL'>XL</MenuItem>
                <MenuItem value='XXL'>XXL</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default connect(
  (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    filterProducts,
    sortProducts,
  }
)(Filter);
