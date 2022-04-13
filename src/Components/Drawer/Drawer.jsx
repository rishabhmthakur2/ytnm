import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from "prop-types";
import { CircularProgress } from "@material-ui/core";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import clsx from "clsx";
import TwitterIcon from "@material-ui/icons/Twitter";
import logo from "../../Assets/Images/yntm_logo.png";
import yntmTheme from "../../scss/yntmTheme";
import { useNavigate } from "react-router-dom";
import Web3 from 'web3';

let web3
let NFTSmartContract

const drawerWidth = 240;
const windowWidth = window.screen.width;

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    ".MuiAppBar-colorPrimary": {
      background: "#fff",
      padding: "0px",
    },

    ".MuiToolbar-gutters": {
      padding: "0px",
    },
    "header.MuiPaper-root.MuiAppBar-root.MuiAppBar-positionFixed.MuiAppBar-colorPrimary.makeStyles-appBar-33.mui-fixed.MuiPaper-elevation4": {
      width: windowWidth,
      left: "0px",
    },
  },
  root: {
    display: "flex",
    // fontFamily: 'eb_gar',
    overflowX: "hidden",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "linear-gradient(0deg, #000000, #000000), #191919;",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#fff",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  navWidth: {
    width: "0",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },
  mobileHeader: {
    padding: "1em",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: yntmTheme.colors.primary,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 0,
    marginLeft: "auto",
    color: "#fff",
  },
  webTitle: {
    fontWeight: "bold",
    fontSize: "1.3rem",
    letterSpacing: "5px",
    // fontFamily: 'eb_gar',
    [theme.breakpoints.up("sm")]: {
      cursor: "pointer",
    },
  },
  liRoot: {
    padding: "2em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    cursor: "pointer",
    position: "relative",
    marginLeft: "1em",
    fontWeight: "600",
  },
  navLogo: {
    position: "absolute",
    width: "180px",
    height: "160px",
    top: "10px",
    left: "40px",
  },
  navLogoMob: {
    width: "70px",
    position: "absolute",
    right: "5%",
    top: "10%",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  sidenavDrawer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: "3em",
  },
  sideNavTxt: {
    color: "#fff",
    borderBottom: "1px solid #fff",
    padding: "1em",
    width: "100%",
  },
  dFlex: {
    display: "flex",
    alignItems: "center",
  },
  bs: {
    boxSizing: "content-box",
  },
  flexEnd: {
    justifyContent: "flex-end",
  },
  mr1: {
    marginRight: "1em",
  },
  dFlexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  hLink: {
    width: "30px",
    height: "30px",
    borderRadius: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pr1: {
    paddingRight: "1em",
  },
  navAnchorTags: {
    width: "42px",
    height: "50px",
    marginTop: "5px",
    // marginRight: '6px'
  },
  connectBtn: {
    color: "#fff",
    fontWeight: "normal",
    border: "1px solid #fff",
    borderRadius: "29px",
    padding: "7px 25px",
  },
}));
function ResponsiveDrawer(props) {
  const { activeNav } = props;
  const navList = [
    { name: "About", active: false },
    { name: "Gallery", active: false },
    { name: "Contact", active: false },
  ];
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [navItem, setNavItems] = useState(navList);
  const [remainCnt, setRemainCnt] = useState('0')
  const [isLoading, setIsLoading] = useState(false)
  const loadWeb3 = useCallback(async () => {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider)
    }
    if (web3) {
      setIsLoading(true)
      NFTSmartContract = new web3.eth.Contract(
        [{ "inputs": [{ "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_symbol", "type": "string" }, { "internalType": "string", "name": "_initBaseURI", "type": "string" }, { "internalType": "string", "name": "_initNotRevealedUri", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "addressMintedBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseExtension", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "cost", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "isWhitelisted", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxMintAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_mintAmount", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "nftPerAddressLimit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "notRevealedUri", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "onlyWhitelisted", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "_state", "type": "bool" }], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "reveal", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "revealed", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_newBaseExtension", "type": "string" }], "name": "setBaseExtension", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_newBaseURI", "type": "string" }], "name": "setBaseURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newCost", "type": "uint256" }], "name": "setCost", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_limit", "type": "uint256" }], "name": "setNftPerAddressLimit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_notRevealedURI", "type": "string" }], "name": "setNotRevealedURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "_state", "type": "bool" }], "name": "setOnlyWhitelisted", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newmaxMintAmount", "type": "uint256" }], "name": "setmaxMintAmount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenOfOwnerByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }], "name": "walletOfOwner", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_users", "type": "address[]" }], "name": "whitelistUsers", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "whitelistedAddresses", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "payable", "type": "function" }],
        '0x1ccb799c49a23ec0e984b93198d6e0b72bdd99ef',
      )
      console.log({ NFTSmartContract })
      const addresses = await web3.eth.getAccounts()
      const senderAddress = addresses[0]
      NFTSmartContract.methods
        .totalSupply()
        .call({
          from: senderAddress,
        })
        .then((remainingSupply) => {
          console.log(remainingSupply);
          setRemainCnt(remainingSupply)
        })
      setIsLoading(false)
    } else {
      setIsLoading(false)
      window.alert(
        'Not connected to a Web3 Wallet! Please install/connect to Metamask on your browser.',
      )
    }
  }, [setRemainCnt])
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  const navigate = useNavigate();
  const drawer = (
    <Grid container style={{ display: "flex", padding: "1.2em 3em" }}>
      <Grid item lg={3} md={3} className={clsx(classes.dFlex, classes.bs)}>
        {/* <img src={headerEgg} className={classes.pr1} alt="header egg" width={50} height={60} /> */}
        <img
          src={logo}
          alt="logo"
          width={150}
          height={30}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
      </Grid>
      <Grid
        item
        lg={8}
        md={8}
        className={classes.dFlex}
        style={{ justifyContent: "flex-end" }}
      >
        {navItem.map((item, i) => (
          <>
            {/* <Grid
              className={classes.liRoot}
              item
              key={item.name}
              onClick={() => itemClick(item, i)}
            > */}
            <Typography
              key={item.name}
              onClick={() => itemClick(item, i)}
              style={{ color: activeNav === item.name && "#FF6363",paddingRight:'15px' }}
            >
              {item.name}
            </Typography>
            {/* </Grid> */}
          </>
        ))}
            <i class="fab fa-twitter socialIcon"></i>
      <i class="fab fa-instagram socialIcon"></i>
      </Grid>
      <Grid item lg={1} md={1} className={clsx(classes.dFlex, classes.flexEnd)}>
  

        <Button className={classes.connectBtn} onClick={loadWeb3}>
          {isLoading ? <CircularProgress /> : (web3 ? "Connected" : "Connect")}
        </Button>
      </Grid>
    </Grid>
  );
  const itemClick = (item, i) => {
    if (item.name === "About") {
      navigate("/about");
    } else if (item.name === "Gallery") {
      navigate("/gallery");
    }
  };
  const mobDrawer = (
    <div className={classes.sidenavDrawer}>
      {navList.map((item, i) => (
        <>
          <p
            key={item.name}
            onClick={() => itemClick(item, i)}
            className={classes.sideNavTxt}
            style={{ color: activeNav === item.name && "#FF6363" }}
          >
            {item.name}
          </p>
        </>
      ))}
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Grid container className={classes.mobileHeader}>
              <Grid item xs={10} className={clsx(classes.dFlex, classes.bs)}>
                {/* <img src={headerEgg} className={classes.pr1} alt="header egg" width={33} height={40} /> */}
                <img
                  src={logo}
                  alt="logo"
                  width={150}
                  height={30}
                  onClick={() => navigate("/")}
                  style={{ cursor: "pointer" }}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Grid>
            <nav
              smUp
              implementation="css"
              className={classes.navWidth}
              style={{ background: "#0d030c", height: '75px' }}
            >
              <Hidden smUp implementation="css">
                <Drawer
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
                  <IconButton
                    onClick={handleDrawerToggle}
                    className={classes.closeMenuButton}
                  >
                    <CloseIcon />
                  </IconButton>
                  {mobDrawer}
                </Drawer>
              </Hidden>
              <Hidden xsDown implementation="css">
                {drawer}
              </Hidden>
            </nav>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  );
}
ResponsiveDrawer.propTypes = {
  container: PropTypes.object,
};
export default ResponsiveDrawer;
