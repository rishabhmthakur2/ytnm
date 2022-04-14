import { Avatar, Card, CardActionArea, CardContent, CardMedia, Chip, Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core'
import React, { useState } from 'react'
import clsx from 'clsx'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ResponsiveDrawer from '../Drawer/Drawer'
import ItemsCarousel from 'react-items-carousel'
import Rectangle1 from '../../Assets/Images/Rectangle1.png'
import Rectangle2 from '../../Assets/Images/Rectangle2.png'
import Rectangle3 from '../../Assets/Images/Rectangle3.png'
import avatar from '../../Assets/Images/avatar.png'


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '80px',
        padding: '10em 6em',
        [theme.breakpoints.down("sm")]: {
            padding: '1em'
        }
    },

    secTitle: {
        fontWeight: '400',
        fontSize: '1rem'
    },
    blockTitle: {
        fontSize: '1.8rem',
        fontWeight: '700',
        fontFamily: 'formula',
        marginBottom: '2em'
    },
    f1: {
        fontSize: '0.9rem !important'
    },
    mt8: {
        marginTop: '8em'
    },
    mt2: {
        marginTop: '2em'
    },
    mt1: {
        marginTop: '0.5em'
    },
    verticalLine: {
        display: 'inline-block',
        width: '1px',
        height: '105vh',
        background: '#000',
        marginLeft: '3em',
        marginTop: '4em'
    },
    mt5: {
        marginTop: '5em'
    },
    primaryTitle: {
        fontWeight: '600',
        fontSize: '1rem',
        color: '#000',
        // textAlign: 'center'
    },
    roleTxt: {
        fontSize: '0.7rem',
    }
}))

const Gallery = (props) => {
    const classes = useStyles()
    const [active, setaAtive] = useState(0);
    const isMobile = useMediaQuery('(max-width:600px)');
    const gallaryArr = [
        {
            img: Rectangle1,
            title: 'The Sound of Silence',
            name: 'Sebastien Micke',
            role: 'Photographer'
        },
        {
            img: Rectangle2,
            title: 'Balmain Army',
            name: 'Sebastien Micke',
            role: 'Photographer'
        },
        {
            img: Rectangle3,
            title: 'The Stream',
            name: 'Ebo Kubik',
            role: 'Photographer'
        },
        {
            img: Rectangle1,
            title: 'The Sound of Silence',
            name: 'Sebastien Micke',
            role: 'Photographer'
        },

    ]
    return (

        <Grid container >
            <ResponsiveDrawer  activeNav={'Galleria'}/>
            <Grid item xs={12} className={classes.root}>
                <Typography className={classes.blockTitle}>Gallery</Typography>
                <ItemsCarousel
                    autoPlay
                    infiniteLoop={true}
                    gutter={isMobile ? 0 : 20}
                    timeout={1}
                    activePosition={"center"}
                    chevronWidth={isMobile ? 10 : 30}
                    disableSwipe={false}
                    alwaysShowChevrons={false}
                    numberOfCards={isMobile ? 1 : 3}
                    slidesToScroll={isMobile ? 1 : 3}
                    outsideChevron={true}
                    showSlither={false}
                    firstAndLastGutter={false}
                    activeItemIndex={active}
                    requestToChangeActive={(value) => setaAtive(value)}
                    rightChevron={<KeyboardArrowRightIcon />}
                    leftChevron={<KeyboardArrowLeftIcon />}
                >
                    {gallaryArr.map((item, i) => (
                        <Grid
                            key={i}
                            item xs={12}
                            style={{display:'flex',justifyContent:'center'}}
                        >
                            <Card >
                                <CardActionArea>
                                    <img src={item.img} alt='fj' />
                                    <CardContent>
                                        <Typography className={classes.primaryTitle}>{item.title}</Typography>
                                        <Grid container className={classes.mt1}>
                                            <Grid item xs={3}><Avatar alt="avatar" src={avatar} /></Grid>
                                            <Grid item xs={8}>
                                                <Typography className={clsx(classes.primaryTitle, classes.f1)}>{item.name}</Typography>
                                                <Typography className={classes.roleTxt}>{item.role}</Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </ItemsCarousel>
            </Grid>
        </Grid>
    )
}
export default Gallery