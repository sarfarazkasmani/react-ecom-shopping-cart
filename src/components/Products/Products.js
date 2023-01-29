import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
//import Card from "@material-ui/core/Card";
import { Button, Typography, CardMedia, CardActions } from "@material-ui/core";
import { formatPrice } from "../../util";
import { connect } from "react-redux";
import { fetchProducts } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";

const useStyles = makeStyles({
  media: {
    height: 500,
    width: "100%",
  },
  link: {
    color: "white",
  },
  price: {
    fontSize: "1.25rem",
    marginRight: "10px",
  },
});

const Products = ({ products, addToCart, fetchProducts }) => {
  useEffect(() => {
    fetchProducts();
  }, []);
  const classes = useStyles();

  return (
    <>
      <div style={{ padding: 12 }}>
        {!products ? (
          <div>Loading...</div>
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item md={4} key={product._id}>
                <a className={classes.link} href={"#" + product._id}>
                  <CardMedia
                    className={classes.media}
                    image={product.image}
                    alt={product.title}
                    title={product.title}
                  />

                  <Typography variant='h6' color='primary' component='p'>
                    {product.title}
                  </Typography>
                </a>
                <CardActions>
                  <Typography className={classes.price} component='div'>
                    {formatPrice(product.price)}
                  </Typography>
                  <Button
                    onClick={() => addToCart(product)}
                    variant='contained'
                    size='large'
                    color='secondary'
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
};

export default connect(
  (state) => ({ products: state.products.filteredItems }),
  {
    fetchProducts,
    addToCart,
  }
)(Products);
