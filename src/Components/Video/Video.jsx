import { Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player';
import loopVideo from '../../Assets/media/yntm_home_video.mp4'
import loopSound from '../../Assets/media/erie_sound.mp3'
import { useNavigate } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '80px',
        padding: '11em 6em',
        [theme.breakpoints.down("sm")]: {
            padding: '1em'
        }
    },
    videoWrap: {
        objectFit: 'cover'
    },
    centerText: {
        fontFamily: 'ppformula',
        position: 'absolute',
        bottom: '23%',
        textAlign: 'center',
        width: '100%',
        fontSize: '26px',
        cursor:'pointer'
    },
    posRel:{
        position:'relative'
    }
}))



const Video = (props) => {
    const classes = useStyles()
    const [playing, setPlaying] = useState(false)
    const navigate = useNavigate();

    const handleOnReady = () => setTimeout(() => setPlaying(true), 100);

    return (
        <Grid container className={classes.posRel}>
            <ReactPlayer
                classes={classes.videoWrap}
                style={{ objectFit: 'cover',overflowY:'hidden' }}
                url={loopVideo}
                volume={0}
                onReady={handleOnReady}
                playing={playing}
                loop={true}
                width='100%'
                height={'100vh'}
            />
            <Typography className={classes.centerText} onClick={()=>navigate('/landing')}>CLICK TO ENTER</Typography>

        </Grid>
    )
}
export default Video