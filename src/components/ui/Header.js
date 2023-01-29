import React from "react";
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    "& a": {
      color: "#fff",
      textDecoration: "none",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <ElevationScroll>
        <AppBar>
          <Toolbar className={classes.header}>
            <Typography variant='h5'>
              <Link to='/'>Shop Cart</Link>
            </Typography>
            <Typography variant='h5'>
              <Link to='/admin'>Admin</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
