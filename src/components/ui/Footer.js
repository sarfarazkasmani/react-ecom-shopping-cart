import React from "react";
import { Typography, Link } from "@material-ui/core";

const Footer = () => {
  return (
    <div>
      <Typography variant='body2' color='textSecondary' align='center'>
        {"Copyright ©"}
        <Link color='inherit' href='#'>
          Shop cart
        </Link>
        &nbsp;
        {new Date().getFullYear()}
      </Typography>
    </div>
  );
};

export default Footer;
