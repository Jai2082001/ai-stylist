import Image from "next/image";
import classes from './FeedbackCard.module.css'

const FeedbackCard = ({ image, type }) => {

    console.log(image, type);




    return (
        <div>

            {image == 'Balanced' && <p>Anytype of Lens could work on your face</p>}
            
            
            {image != 'Balanced' && <Image className={classes.ImageClass} src={require(`../public/${type}/${image}.jpg`)}></Image>
            }

        </div>
    )
}
export default FeedbackCard