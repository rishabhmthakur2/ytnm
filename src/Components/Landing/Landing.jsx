import React, { useState, useCallback, useEffect } from 'react'
import { AppBar, Avatar, Box, Button, CircularProgress, Dialog, Grid, makeStyles, Typography, useMediaQuery } from "@material-ui/core";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import clsx from 'clsx';
import Chip from '@material-ui/core/Chip';
import CloseIcon from "@material-ui/icons/Close";
import ResponsiveDrawer from '../Drawer/Drawer';
import nft_text from '../../Assets/Images/nft_text.png'
import star_icon from '../../Assets/Images/star_icon.png'
import more_icon from '../../Assets/Images/more_icon.png'
import ipad_mock from "../../Assets/Images/ipad_mock.png"
import DaftPunk from "../../Assets/Images/DaftPunk.png"
import avatar from '../../Assets/Images/avatar.png'
import coming_soon from "../../Assets/Images/balmain_army.jpeg"
import yntm_logo_short from '../../Assets/Images/yntm_logo_short.png'
import story_img from "../../Assets/Images/story_img.jpeg"
import Web3 from 'web3';
import './Landing.scss'
import yntmTheme from '../../scss/yntmTheme';

let web3
let NFTSmartContract

const useStyles = makeStyles((theme) => ({
    "@global": {
        '.MuiAppBar-colorPrimary': {
            padding: '0px',
            background: 'transparent',
            boxShadow: 'none'
        },
        '.MuiTab-fullWidth': {
            borderBottom: '0.75px solid #FFBCBC'
        },
        '.PrivateTabIndicator-colorSecondary-90': {
            background: '#ff6363'
        },
        '.PrivateTabIndicator-root-88': {
            height: '0.75px'
        },
        '.MuiTab-wrapper': {
            textTransform: 'capitalize',
            fontFamily: 'ppFormulaSemi',
            fontWeight: 'bold',
            fontSize: '14px'
        },
        'header.MuiPaper-root.MuiAppBar-root.MuiAppBar-positionStatic.MuiAppBar-colorPrimary.MuiPaper-elevation4': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        '.MuiTabs-root': {
            width: '80%'
        },
        '.MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthMd.MuiDialog-paperFullWidth.MuiPaper-elevation24.MuiPaper-rounded': {
            boxShadow: 'none',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1em'
        }
    },

    root: {
        marginTop: '80px',
        padding: '15em 8em 15em 12em',
        [theme.breakpoints.down("sm")]: {
            padding: '1em'
        },
    },
    closeIconWrap: {
        color: yntmTheme.colors.colorHalfWhite7,
        alignSelf: 'self-end',
        cursor: 'pointer',
        fontSize: '2rem'
    },
    mt1: {
        marginTop: '1em'
    },
    mt4: {
        marginTop: '4em'
    },
    cursorPointer: {
        cursor: 'pointer'
    },
    mt6: {
        marginTop: '6em'
    },
    primaryTitle: {
        fontWeight: '600',
        fontSize: '5.5rem',
        color: '#000',
        [theme.breakpoints.down("lg")]: {
            fontSize: '3.5rem',
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: '2rem',
        },
    },
    nftTextMob: {
        [theme.breakpoints.down("sm")]: {
            width: '160px',
            height: '80px'
        },
    },
    starIconMob: {
        [theme.breakpoints.down("sm")]: {
            width: '30px'
        },
    },
    dFlexStart: {
        display: 'flex',
        alignItems: 'flex-start'
    },
    secTitle: {
        fontWeight: '400',
        fontSize: '1rem'
    },
    width400: {
        width: '400px',
        // [theme.breakpoints.down("sm")]: {
        //     width: '330px',
        // },
    },
    descBoldTitle: {
        fontWeight: '500',
        fontSize: '0.9rem'
    }, dFlexEnd: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    alignSelfStart: {
        alignSelf: 'flex-start'
    },
    mt30Nag: {
        marginTop: '-30px',
        [theme.breakpoints.down("sm")]: {
            marginTop: '-18px',
        },
    },
    height72: {
        height: '72px'
    },
    mt2: {
        marginTop: '2em'
    },
    dFlexC: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dFlexVc: {
        display: 'flex',
        alignItems: 'center',
    },
    mr10: {
        marginRight: '10px',
        fontFamily: 'caliSemiBold',
        fontSize: '86px'
    },
    ml10: {
        marginLeft: '10px'
    },
    ml2: {
        marginLeft: '2em'
    },
    dFlexBase: {
        display: 'flex',
        alignItems: 'baseline'
    },
    silenceWrap: {
        padding: '8em 12em',
        background: '#f1f1f1',
        [theme.breakpoints.down("sm")]: {
            padding: '2em 1em',
        },
    },
    DaftPunkImg: {
        [theme.breakpoints.down("sm")]: {
            width: '100%'
        },
    },
    ArmyImg: {
        [theme.breakpoints.down("sm")]: {
            width: '80%'
        },
    },
    blockTitle: {
        fontSize: '1.8rem',
        fontWeight: '700',
        fontFamily: 'formula',
    },
    bgWhite: {
        background: '#fff !important'
    },
    m3: {
        margin: '3em 0'
    },
    f14: {
        fontSize: '1.5em'
    },
    f1: {
        fontSize: '1rem !important'
    },
    redFont: {
        color: '#FF6363'
    },
    valueWrap: {
        textAlign: 'center',
        fontSize: '5em',
        fontWeight: '100',
        fontFamily: 'ppFormulaSemi',
    },
    textAlignCenter: {
        textAlign: 'center'
    },
    redBtn: {
        color: '#FF6363',
        border: '1px solid #FF6363',
        fontSize: '0.7rem',
        padding: '4.2px 15px',
        marginLeft: '1em',
        width: '110px'
    },
    aucTitle: {
        fontSize: '13px',
        fontWeight: '700'
    },
    aucTime: {
        fontWeight: '200',
        fontSize: '24px',
        fontFamily: 'ppFormulaSemi',
        marginLeft: '0.5em'
    },
    aucMainWrap: {
        marginTop: '2em',
        border: '1px solid #000',
        padding: '0.2em 1em 0em',
        borderRadius: '7px',
        display: 'flex',
        alignItems: 'center',
        width: '350px'
    },
    mb2: {
        marginBottom: '2em'
    },
    dFlexSb: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    mediaLink: {
        fontSize: '12px',
        fontWeight: '400'
    },
    footerWrap: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1em 4em',
        [theme.breakpoints.down("sm")]: {
            padding: '1em'
        }
    },
    textAlignEnd: {
        textAlign: 'right',
        [theme.breakpoints.down("sm")]: {
            padding: '1em',
            textAlign: 'center',
        }
    }, ipadImg: {
        width: '450px',
        height: '450px',
        [theme.breakpoints.down("sm")]: {
            width: '100%',
            height: 'auto'
        },
    }, caliLight: {
        fontFamily: 'caliLight'
    }, f22: {
        fontSize: '22px'
    }, caliMed: {
        fontFamily: 'caliMed'
    }, f16: {
        fontSize: '16px'
    }, chipText: {
        fontFamily: 'caliReg',
        fontSize: '1em'
    },
    dFlex: {
        display: 'flex'
    },pr2:{
        paddingRight:'2em'
    }
}))
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const Landing = (props) => {
    const classes = useStyles()
    const [remainCnt, setRemainCnt] = useState('2')
    const [isLoading, setIsLoading] = useState(false)
    const [isImg, setIsImg] = useState(false)
    const [modalImg, setModalImg] = useState('')
    const isMobile = useMediaQuery('(max-width:600px)');
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleBuyNow = async () => {
        await loadWeb3();
        const addresses = await web3.eth.getAccounts()
        const senderAddress = addresses[0]
        console.log(senderAddress)
        setIsLoading(true);
        NFTSmartContract.methods.cost()
            .call({
                from: senderAddress
            })
            .then((mintCost) => {
                console.log(mintCost)
                NFTSmartContract.methods.mint(1).send({
                    from: senderAddress,
                    value: mintCost
                })
                    .on('sent', function (send) {
                        setIsLoading(true);
                    })
                    .on('receipt', function (receipt) {
                        setIsLoading(false);
                        window.alert("Minting complete. You can now headover to OpenSea!");
                        loadWeb3();
                    })
                    .on('error', function (error) {
                        setIsLoading(false);
                        window.alert("Error: " + JSON.stringify(error.message))
                    });
            })
    }


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

    return (
        <Grid container class="landing-main">
            <ResponsiveDrawer />
            <Grid container className={classes.root}>
                <Grid item lg={7} md={7} sm={7} xs={12}>
                    <Grid item lg={12} md={12} >
                        {/* <Typography className={clsx(classes.primaryTitle, classes.dFlexBase)}>
                            <span className={classes.mr10}>Collect</span>
                            <img src={nft_text} alt='nft_text' className={classes.nftTextMob} />
                            <img src={star_icon} alt='star_icon' className={clsx(classes.alignSelfStart, classes.mt30Nag, classes.starIconMob)} />
                        </Typography> */}
                        <p class="MuiTypography-root jss6 jss23 MuiTypography-body1">
                            <span class="jss20">Collect
                                {/* <img src={nft_text} alt='nft_text' className={classes.nftTextMob} />
                                <img src={star_icon} alt='star_icon' className={clsx(classes.alignSelfStart, classes.mt30Nag, classes.starIconMob)} /> */}
                                <span style={{ fontFamily: "calibreBlack", color: 'white', fontSize: '9rem', WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'black' }}> NFT</span>
                                <img src={star_icon} alt='star_icon' style={{ verticalAlign: 'super', position: 'relative', top: '-25px' }} />
                                <br />
                                Photography Art</span>
                        </p>
                    </Grid>
                    {/* <Typography className={classes.primaryTitle}>Photography Art</Typography> */}
                    <Typography className={clsx(classes.secTitle, classes.caliLight, classes.f22)}>
                        Buy and sell NFTs from the world’s top photographers
                    </Typography>
                    <Typography className={clsx(classes.descBoldTitle, classes.mt2, classes.dFlexVc, classes.caliMed, classes.f16)}>
                        Start Collecting
                        <img src={more_icon} className={classes.ml10} width={13} height={13} alt='more_icon' />
                    </Typography>
                </Grid>
                <Grid item lg={5} md={5} sm={5} xs={12}>
                    <img src={ipad_mock} onClick={() => { setIsImg(true); setModalImg(ipad_mock) }} className={clsx(classes.ipadImg, classes.cursorPointer)} alt='ipad_mock' />
                </Grid>
            </Grid>
            <Grid container className={classes.silenceWrap}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} variant="fullWidth">
                        <Tab label="About" {...a11yProps(0)} style={{ color: 'black' }} />
                        <Tab label="Story" {...a11yProps(1)} style={{ color: 'black' }} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Grid container className={classes.mt6}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <img src={story_img} alt='story' width={'90%'} onClick={() => { setIsImg(true); setModalImg(story_img) }} className={classes.cursorPointer} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Typography className={clsx(classes.blockTitle, classes.f14)}>
                                About
                            </Typography>
                            <Typography className={clsx(classes.caliLight, classes.f22, classes.mt1,classes.pr2)}>
                                It was just another day spent on Insta, my feet kicked up, phone in hand, tapping, scrolling, when I saw it.
                                My work, featuring several of the biggest celebrities, posted to one of their accounts without so much as a mention of my name. No credit. No shout out. Nothing.
                                A piece forever synonymous with the subject - not the creator. Her three-hundred million followers, showering her with praise and adoration.
                                It was then that a numbness took hold, my head growing light as air, a strange frequency coursing through my veins – blinding light, beckoning me from the Metaversal corridor.
                                I crossed over, only then to watch myself completely dematerialize – my consciousness instantly transplanted in the digital construct before you.
                            </Typography>

                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Grid container className={classes.mt6}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <img src={story_img} alt='story' width={'90%'} onClick={() => { setIsImg(true); setModalImg(story_img) }} className={classes.cursorPointer} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} >
                            <Typography className={clsx(classes.blockTitle, classes.f14)}>
                                Story
                            </Typography>
                            <Typography className={clsx(classes.caliLight, classes.f22, classes.mt1,classes.pr2)} style={{
                                height: '63vh',
                                overflowY: 'auto'
                            }}>
                                It was just another day spent on Insta, my feet kicked up, phone in hand, tapping, scrolling, when I saw it.
                                My work, featuring several of the biggest celebrities, posted to one of their accounts without so much as a mention of my name. No credit. No shout out. Nothing.
                                A piece forever synonymous with the subject - not the creator. Her three-hundred million followers, showering her with praise and adoration.
                                It was then that a numbness took hold, my head growing light as air, a strange frequency coursing through my veins – blinding light, beckoning me from the Metaversal corridor.
                                I crossed over, only then to watch myself completely dematerialize – my consciousness instantly transplanted in the digital construct before you.

                                It was just another day spent on Insta, my feet kicked up, phone in hand, tapping, scrolling, when I saw it.
                                My work, featuring several of the biggest celebrities, posted to one of their accounts without so much as a mention of my name. No credit. No shout out. Nothing.
                                A piece forever synonymous with the subject - not the creator. Her three-hundred million followers, showering her with praise and adoration.
                                It was then that a numbness took hold, my head growing light as air, a strange frequency coursing through my veins – blinding light, beckoning me from the Metaversal corridor.
                                I crossed over, only then to watch myself completely dematerialize – my consciousness instantly transplanted in the digital construct before you.
                            </Typography>

                        </Grid>
                    </Grid>
                </TabPanel>

            </Grid>
            <Grid container className={clsx(classes.silenceWrap, classes.bgWhite)}>
                {/* <Grid item lg={1} md={1} sm={1} xs={12}>
                </Grid> */}
                <Grid item lg={6} md={6} sm={6} xs={12} className={classes.dFlexC}>
                    <img src={DaftPunk} className={clsx(classes.DaftPunkImg, classes.cursorPointer)} height={650} alt='DaftPunk' onClick={() => { setIsImg(true); setModalImg(DaftPunk) }} />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12} style={{ paddingLeft: isMobile ? '0' : '3em' }}>
                    <Typography className={classes.blockTitle}>
                        The Sound of Silence
                    </Typography>
                    <Chip
                        className={clsx(classes.bgWhite, classes.chipText)}
                        avatar={<Avatar alt="avatar" src={avatar} />}
                        label="Sebastien Micke"
                    />
                    <hr className={classes.m3} />
                    <Typography className={clsx(classes.blockTitle, classes.f14)}>
                        Description
                    </Typography>
                    <Typography className={clsx(classes.caliLight, classes.f22)}>
                        Originally featured in Paris Match Magazine, this NFT features the iconic French electronic music duo Daft Punk. <br />
                        Photographed by celebrity photographer Sébastien Micke, the image was taken right before the release of their hit album “Get Lucky."<br />
                        <br />
                        “The Sound of Silence” is a limited run of 50 NFT’s available for purchase. The collector will receive one-of-fifty images and the original PNG file.
                        5478 x 7304 Pixels
                    </Typography>
                    <Typography className={clsx(classes.secTitle, classes.f1, classes.mt2, classes.redFont)}>
                        <span>Edition Size: 50</span>
                        <span className={classes.ml2}>Token ID: 2</span>
                    </Typography>
                    <Typography style={{ marginTop: '0.5em' }} className={clsx(classes.valueWrap)}>
                        {remainCnt}/50
                    </Typography>
                    <Grid item className={classes.dFlexC}>
                        <Typography className={clsx(classes.valueWrap, classes.f1)}>
                            0.05ETH
                        </Typography>
                        <Button className={classes.redBtn}
                            onClick={handleBuyNow}
                        >
                            {isLoading ?
                                <CircularProgress />
                                :
                                "Buy Now"}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container className={clsx(classes.silenceWrap,)}>
                <Grid item xs={12}>
                    <Typography className={clsx(classes.blockTitle, classes.textAlignCenter, classes.mb2)}>
                        COMING SOON
                    </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12} className={classes.dFlexC}>
                    <img src={coming_soon} width={isMobile ? 'auto' : '600px'} height={isMobile ? 'auto' : '500px'}
                        className={clsx(classes.ArmyImg, classes.cursorPointer)} alt='coming_soon'
                        onClick={() => { setIsImg(true); setModalImg(coming_soon) }}
                    />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12} style={{ paddingLeft: isMobile ? '0' : '3em' }}>
                    <Typography className={clsx(classes.blockTitle, classes.f14)}>
                        The Balmain Army
                    </Typography>
                    <Typography className={clsx(classes.caliLight, classes.f22)}>
                        For Paris Match - ‘The Balmain Army’, June 2016 <br />
                        SEBASTIEN MICKE <br />
                        <br />
                        Kylie Jenner, Kris Jenner, Kim Kardashian, Kanye West, joined by supermodels Cindy Crawford, Jourdan Dunn, Sean O’Pry, and Balmain‘s creative director Olivier Rousteing, all dressed in looks from Balmain. Lensed by fashion photographer Sebastien Micke, this was featured in numerous campaigns and editorials. However, the image was notoriously featured on Kim Kardashian’s Instagram, to which Micke received no credit.<br />
                        <br />
                        “The Balmain Army” will be an exclusive 1-of-1 collectible NFT, available for purchase by auction. The collector with the highest bid will receive the only verified NFT of its kind and the original PNG file.
                        5478 x 7304 Pixels
                    </Typography>
                    <Typography className={classes.aucMainWrap}>
                        <span className={classes.aucTitle}>Auction Starts </span>
                        <span className={classes.aucTime}>4.25.22 3:00pm PST</span>
                    </Typography>

                </Grid>
            </Grid>
            <Grid container className={classes.footerWrap}>
                <Grid item lg={3} md={3} sm={3} xs={12} className={classes.dFlexSb}>
                    <img src={yntm_logo_short} alt='yntm_logo_short' />
                    {/* <Typography className={classes.mediaLink}>Twitter</Typography>
                    <Typography className={classes.mediaLink}>Instagram</Typography>
                    <Typography className={classes.mediaLink}>Discord</Typography> */}
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={12} >
                    <Typography className={clsx(classes.mediaLink, classes.textAlignEnd)}>
                        © 2022 You Never Tagged Me®
                    </Typography>
                </Grid>
            </Grid>
            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                open={isImg}
                onClose={() => setIsImg(false)}
            >
                <CloseIcon className={classes.closeIconWrap} onClick={() => setIsImg(false)} />
                <img src={modalImg} width={'65%'} style={{
                    height: '80vh',
                    objectFit: 'cover'
                }} alt='ipad_mock' />

            </Dialog>
        </Grid>
    )
}
export default Landing