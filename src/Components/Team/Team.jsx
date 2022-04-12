import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import clsx from 'clsx';
import ResponsiveDrawer from '../Drawer/Drawer';
import SebAvatar1 from '../../Assets/Images/SebAvatar1.png'
import SebAvatar2 from '../../Assets/Images/SebAvatar2.png'
import SebAvatar3 from '../../Assets/Images/SebAvatar3.png'
import SebAvatar4 from '../../Assets/Images/SebAvatar4.png'
import SebAvatar5 from '../../Assets/Images/SebAvatar5.png'


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
dFlex:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    [theme.breakpoints.down("sm")]: {
        justifyContent:'center',
    }
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
        marginTop: '8em'
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
    mt2: {
        marginTop: '2em'
    },
    primaryTitle: {
        fontWeight: '600',
        fontSize: '1rem',
        color: '#000',
        textAlign:'center'
    },
    roleTxt:{
        textAlign:'center',
        fontSize: '0.7rem',
    }
}))

const Team = (props) => {
    const classes = useStyles()
    const teamArr = [
        {
            name: 'Sebastien Micke',
            role: 'Creator/Photographer',
            avatar: SebAvatar1
        },
        {
            name: 'Jules Chaf',
            role: 'Project Manager',
            avatar: SebAvatar2
        }, {
            name: 'Stephanie Tilley',
            role: 'Marketing',
            avatar: SebAvatar3
        }, {
            name: 'Lynnae Gutierrez',
            role: 'Marketing/PR',
            avatar: SebAvatar4
        }, {
            name: 'Logo Joe ',
            role: 'Design',
            avatar: SebAvatar5
        },
    ]
    return (
        <Grid container>
            <ResponsiveDrawer />
            <Grid container className={classes.root}>
                <Typography className={classes.blockTitle}>The Team</Typography>
                <Grid container className={clsx(classes.dFlex,classes.mt2)}>
                    {teamArr.map((item) => (
                        <Grid item>
                            <img src={item.avatar} alt='img' />
                            <Typography className={classes.primaryTitle}>{item.name}</Typography>
                            <Typography className={classes.roleTxt}>{item.role}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Team