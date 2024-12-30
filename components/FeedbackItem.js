'use client'

import classes from './Feedback.module.css'
import LoadingGIF from "../public/LoadingScreen.gif";
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { addWardrobeProfile } from '../lib/wardrobeactions';
import { useSession } from 'next-auth/react';
const Feedback = ({ changeFeedback, data }) => {


    const [color, changeColor] = useState(`#000`);
    const userData = useSession();
    console.log(userData)
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

        console.log(addWardrobeProfile({ profileId: userData.data.user.email, type: clothRef.current.value, image: data.image, dominantColors: hexToRgb(color) }))
        changeFeedback(false)
    }

    return (
        <div className={classes.parentDiv}>
            {!data && <Image src={LoadingGIF}></Image>}
            {data &&

                <div className={classes.modelParent}>
                    <div>
                        <p className="text-sm text-gray-600 mb-2">Here are the identified features. Make changes if needed, or register the wardrobe item.</p>
                        <img src={data.image} alt="Wardrobe item" className="w-full h-64 object-cover rounded-md" />
                    </div>
                    <p>Identified Item</p>
                    <select ref={clothRef}>
                        <option selected={data.type.localeCompare('Trouser') == 0} value='Trouser'>Trouser</option>
                        <option selected={data.type.localeCompare('Shirt') == 0} value='Shirt'>Shirt</option>
                        <option selected={data.type.localeCompare('T-shirt/top') == 0} value='T-Shirt/top'>T-Shirt/top</option>
                        <option selected={data.type.localeCompare('Pullover') == 0} value='Pullover'>Pullover</option>
                        <option selected={data.type.localeCompare('Coat') == 0} value='Coat'>Coat</option>
                    </select>
                    <div>
                        <label htmlFor="color-picker">Identified Color</label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="color"
                                id="color-picker"
                                value={color}
                                onChange={colorCha}
                                className="w-12 h-12 rounded-md border border-gray-300 cursor-pointer"
                            />
                            <div
                                className="w-12 h-12 rounded-md border border-gray-300"
                                style={{ backgroundColor: color }}
                            ></div>
                            <span className="text-sm text-gray-600 uppercase">{color}</span>
                        </div>
                    </div>

                    <button onClick={registerBtn} className="bg-white hover:bg-black-700 text-black font-bold py-2 px-4 rounded">
                        Register
                    </button>
                </div>
            }
        </div>
    )
}

export default Feedback