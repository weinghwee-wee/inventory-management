import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ProductScreen, OrderScreen } from "./index";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    background: "white",
    boxShadow: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    height: "100vh",
    flexGrow: 1,
    padding: theme.spacing(3),
    background: "white",
  },
  nav: { background: "black", height: "100%", padding: 5 },
  normalListItem: { background: "black" },
  selectedListItem: {
    background: "yellow",
    "&:hover": {
      background: "yellow",
    },
  },
  normalListText: { color: "white" },
  selectedListText: { color: "black" },
}));

function MainScreen(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedScreen, setSelectedScreen] = useState("Products");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderContent = () => {
    if (selectedScreen === "Products") {
      return <ProductScreen />;
    } else if (selectedScreen === "Orders") {
      return <OrderScreen />;
    } else {
      return null;
    }
  };

  const screens = [
    { name: "Products", icon: <AddShoppingCartIcon /> },
    { name: "Orders", icon: <ListAltIcon /> },
  ];

  const drawer = (
    <div className={classes.nav}>
      <div className={classes.toolbar}></div>
      <Divider />
      <List>
        {screens.map((screen) => (
          <ListItem
            className={
              selectedScreen === screen.name
                ? classes.selectedListItem
                : classes.normalListItem
            }
            button
            key={screen.name}
            onClick={() => {
              setSelectedScreen(screen.name);
            }}
          >
            <ListItemIcon
              className={
                selectedScreen === screen.name
                  ? classes.selectedListText
                  : classes.normalListText
              }
            >
              {screen.icon}
            </ListItemIcon>
            <ListItemText
              className={
                selectedScreen === screen.name
                  ? classes.selectedListText
                  : classes.normalListText
              }
              primary={screen.name}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ color: "black" }} noWrap>
            {selectedScreen}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {renderContent()}
      </main>
    </div>
  );
}

MainScreen.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default MainScreen;
