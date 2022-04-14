import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import clsx from 'clsx'
import ResponsiveDrawer from '../Drawer/Drawer'



const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '80px',
        padding: '11em 6em',
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
    },
    f1: {
        fontSize: '1.3rem !important'
    },
    mt8: {
        marginTop: '8em',
        [theme.breakpoints.down("sm")]: {
            marginTop: '4em',
        }
    },
    verticalLine: {
        display: 'inline-block',
        width: '1px',
        height: '105vh',
        background: '#000',
        marginLeft: '3em',
        marginTop: '4em',
        [theme.breakpoints.down("sm")]: {
            marginLeft: '0',
            height: '90%',
        }
    },
    mt5: {
        marginTop: '5em',
        [theme.breakpoints.down("sm")]: {
            marginTop: '2em',
        }
    }
}))

const About = (props) => {
    const classes = useStyles()
    return (
        <Grid container>
            <ResponsiveDrawer activeNav={'About/Story'} />
            <Grid container className={classes.root}>
                <Typography className={classes.blockTitle}>About</Typography>
                <Typography className={classes.secTitle}>
                    Over 95 million images are shared on popular social media platforms daily, but it is commonly forgotten that these photos would not exist without the photographer behind the lens. You Never Tagged Me™, an NFT photography collection featuring the works of Sebastien Micke, was inspired by this issue that is far too common within the artistic community. Credit is often not given, where credit is owed.<br /><br />
                    As we witness our generation evolving into the digital art era, we are consumed by media everywhere we look. These platforms have made it as simple as possible to credit, tag, or recognize the artists behind the content, yet works are consistently shared without proper credit given. The movement behind You Never Tagged Me™ is to bring awareness to this issue, because things have to change. Our community provides a space where artists and creators can safely share their vision while receiving proper credits.
                </Typography>
                <Grid container className={classes.mt8}>
                    <Typography className={classes.blockTitle}>RoadMap</Typography>
                    <Grid container className={classes.mt5}>
                        <Grid item xs={1}>
                            <div className={classes.verticalLine}></div>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid item xs={12}>
                                <Typography className={clsx(classes.blockTitle, classes.f1)}>Launch</Typography>
                                <Typography className={classes.secTitle}>
                                    YNTM is a platform showcasing NFT Photography. In collaboration with The Crypto Brokers™, this project was developed with the focus on bringing pop-culture and notable historic moments onto the blockchain. These collections came to fruition working alongside each other, supporting creators migrating to Web3.. Through visual storytelling, our mission is to preserve iconic moments in time and to inspire others along the way.</Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.mt5}>
                                <Typography className={clsx(classes.blockTitle, classes.f1)}>The Sound of Silence-Daft Punk</Typography>
                                <Typography className={classes.secTitle}>
                                    Officially launching in April, You Never Tagged Me ™ is scheduled to drop their first project. Featuring the iconic French electronic music group - Daft Punk, “The Sound of Silence” was first featured in Paris Match Magazine soon after the announcement of the groups’ separation. Photographed by celebrity photographer Sebastien Micke, the piece portrays the duo with their faces hidden under robotic helmets, encapsulating the same sense of mystery left behind from their sudden split.
                                    For YNTM, the piece symbolizes the ending of a new beginning. Simultaneously showcasing the photograph and the photographer, the focus remains that all content receives proper recognition.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.mt5}>
                                <Typography className={clsx(classes.blockTitle, classes.f1)}>The Balmain Army</Typography>
                                <Typography className={classes.secTitle}>
                                    Coming this spring, You Never Tagged Me™ will be releasing “The Balmain Army”. Not only an iconic photograph, this exclusiveNFT piece was the inspiration behind the concept.
                                    “The Balmain Army”,photographed by Sebastien Micke,featuresKylie Jenner, Kris Jenner, Kim Kardashian, and Kanye West, joined by supermodels Cindy Crawford, Jourdan Dunn, Sean O’Pry, and Balmain‘s creative director Olivier Rousteing. The imagewas posted publicly by Kim Kardashian on June 9th, 2016, without anycreditsgiven to the photographerbehind the lens. The photograph is on her Instagram profile to this day
                                    Upon release,  “The Balmain Army” will be auctioned as an exclusive 1/1 edition NFT.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.mt5}>
                                <Typography className={clsx(classes.blockTitle, classes.f1)}>Curated Marketplace</Typography>
                                <Typography className={classes.secTitle}>
                                    Coming this spring, You Never Tagged Me™ will be releasing “The Balmain Army”. Not only an iconic photograph, this exclusiveNFT piece was the inspiration behind the concept.
                                    “The Balmain Army”,photographed by Sebastien Micke,featuresKylie Jenner, Kris Jenner, Kim Kardashian, and Kanye West, joined by supermodels Cindy Crawford, Jourdan Dunn, Sean O’Pry, and Balmain‘s creative director Olivier Rousteing. The imagewas posted publicly by Kim Kardashian on June 9th, 2016, without anycreditsgiven to the photographerbehind the lens. The photograph is on her Instagram profile to this day
                                    Upon release,  “The Balmain Army”, will be auctioned as an exclusive 1/1 edition NFT.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    )
}
export default About