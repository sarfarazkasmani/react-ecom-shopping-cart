import { createMuiTheme } from "@material-ui/core/styles";

const shopcartBlue = "#171368";
const shopcartOrange = "#ebc100";

export default createMuiTheme({
  palette: {
    common: {
      blue: `${shopcartBlue}`,
      orange: `${shopcartOrange}`,
    },
    primary: {
      main: `${shopcartBlue}`,
    },
    secondary: {
      main: `${shopcartOrange}`,
    },
  },
});
