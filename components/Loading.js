import LoadingGif from '../public/LoadingScreen.gif'
import classes from './Loading.module.css';
import Image from 'next/image';

const Loading = ({style}) => {

    let styleObj = {};

    if(style){
        styleObj = style;
    }
    
    return (
    <div style={styleObj} className={classes.parentDiv}> 
        <Image src={LoadingGif}></Image>
    </div>
    )
}

export default Loading