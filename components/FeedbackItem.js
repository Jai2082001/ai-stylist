'use client'

import classes from './Feedback.module.css'
import LoadingGIF from "@/public/LoadingScreen.gif";
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { changeWardrobeProfile } from '@/lib/wardrobeactions';
import { addWardrobeProfile } from '@/lib/wardrobeactions';

const Feedback = ({ changeFeedback, data }) => {


    const [color, changeColor] = useState(`#000`);

    useEffect(() => {
        if (data) {
            changeColor(rgbToHex(data.dominantColors.red, data.dominantColors.green, data.dominantColors.blue));
        }
    }, [data])

    console.log(color)

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            red: parseInt(result[1], 16),
            green: parseInt(result[2], 16),
            blue: parseInt(result[3], 16)
        } : null;
    }

    function colorCha(e) {
        e.preventDefault();
        changeColor(e.target.value);
    }

    const clothRef = useRef();


    const registerBtn = () => {

        addWardrobeProfile({ profileId: '001', type: clothRef.current.value, image: data.image, dominantColors: hexToRgb(color) })
        changeFeedback(false)
    }

    return (
        <div className={classes.parentDiv}>
            {!data && <Image src={LoadingGIF}></Image>}
            {data &&

                <div className={classes.modelParent}>
                    <div>Here is the Identified features of if you want to make some changes please do or else register the wardrobe item.  </div>
                    <img src={data.image} ></img>
                    <p>Identified Item</p>
                    <select ref={clothRef}>
                        <option selected={data.type.localeCompare('Trouser') == 0} value='Trouser'>Trouser</option>
                        <option selected={data.type.localeCompare('Shirt') == 0} value='Shirt'>Shirt</option>
                        <option selected={data.type.localeCompare('T-shirt/top') == 0} value='T-Shirt/top'>T-Shirt/top</option>
                        <option selected={data.type.localeCompare('Pullover') == 0} value='Pullover'>Pullover</option>
                        <option selected={data.type.localeCompare('Coat') == 0} value='Coat'>Coat</option>
                    </select>
                    <p>Identified Colors </p>

                    <input type='color' value={color} onChange={colorCha} ></input>
                    <br></br>
                    <button onClick={registerBtn}>Register</button>
                </div>
            }
        </div>
    )
}

export default Feedback