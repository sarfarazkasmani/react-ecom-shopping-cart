import React, { Component } from "react";
import { formatPrice } from "../../util";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, CardMedia, Input } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { removeFromCart } from "../../actions/cartActions";
import { createOrder, clearOrder } from "../../actions/orderActions";
import { connect } from "react-redux";

const styles = (theme) => ({
  root: {
    display: "flex",
    marginTop: "25px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  cartCount: {
    marginTop: "50px",
  },
  totalAmt: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  priceBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
      open: false,
    };
  }
  handleClose = () => {
    this.setState({ open: !this.state.open });
  };
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    this.props.createOrder(order);
  };
  render() {
    const { cartItems, order } = this.props;
    const { classes } = this.props;
    return (
      <>
        <Typography variant='body1' className={classes.cartCount}>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            <div>You have {cartItems.length} in the cart.</div>
          )}
        </Typography>
        {order && (
          <div>
            <Dialog
              open={!this.state.open}
              onClose={this.handleClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>
                {"Order Details"}
              </DialogTitle>
              <DialogContent>
                <Typography variant='h5'>Your order has been placed</Typography>
                <Typography variant='h6'>Order {order._id}</Typography>
                <ul>
                  <li>Name:</li>
                  <li>{order.name}</li>
                  <li>Email:</li>
                  <li>{order.email}</li>
                  <li>Address:</li>
                  <li>{order.address}</li>
                  <li>Date:</li>
                  <li>{order.createdAt}</li>
                  <li>Total:</li>
                  <li>{formatPrice(order.total)}</li>
                  <li>Cart Items:</li>
                  <li>
                    {order.cartItems.map((x) => (
                      <div>
                        {x.count} * {x.title}
                      </div>
                    ))}
                  </li>
                </ul>
                {/* <DialogContentText id='alert-dialog-description'>
                  Let Google help apps determine location. This means sending
                  anonymous location data to Google, even when no apps are
                  running.
                </DialogContentText> */}
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color='primary'>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
        <div>
          {cartItems.map((item) => (
            <div>
              <Card key={item._id} className={classes.root}>
                <CardMedia
                  className={classes.cover}
                  image={item.image}
                  title={item.title}
                />
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component='div' variant='body1'>
                      {item.title}
                    </Typography>
                    <div className={classes.priceBlock}>
                      <Typography variant='subtitle1' color='textSecondary'>
                        {formatPrice(item.price)} x {item.count}
                      </Typography>
                      <Button
                        color='secondary'
                        variant='contained'
                        size='small'
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          ))}

          {cartItems.length !== 0 && (
            <div>
              <div className={classes.totalAmt}>
                <Typography variant='h6'>
                  Total:
                  {formatPrice(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </Typography>
                <Button
                  variant='contained'
                  size='large'
                  color='secondary'
                  onClick={() =>
                    this.setState({ showCheckout: !this.state.showCheckout })
                  }
                >
                  Proceed
                </Button>
              </div>
              {this.state.showCheckout && (
                <div style={{ marginTop: "20px" }}>
                  <form onSubmit={this.createOrder}>
                    <div>
                      <Input
                        defaultValue='Email'
                        placeholder='Email'
                        inputProps={{ "aria-label": "description" }}
                        name='email'
                        type='email'
                        required
                        onChange={this.handleInput}
                        fullWidth
                      />
                    </div>
                    <br />
                    <div>
                      <Input
                        defaultValue='Name'
                        placeholder='Name'
                        inputProps={{ "aria-label": "description" }}
                        name='name'
                        type='text'
                        required
                        onChange={this.handleInput}
                        fullWidth
                      />
                    </div>
                    <br />
                    <div>
                      <Input
                        defaultValue='Address'
                        placeholder='Address'
                        inputProps={{ "aria-label": "description" }}
                        name='address'
                        type='text'
                        required
                        onChange={this.handleInput}
                        fullWidth
                      />
                    </div>
                    <br />
                    <div align='right'>
                      <Button
                        variant='contained'
                        size='large'
                        color='secondary'
                        type='submit'
                      >
                        Checkout
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

//export default withStyles(styles)(Cart);

export default connect(
  (state) => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart, createOrder, clearOrder }
)(withStyles(styles)(Cart));
