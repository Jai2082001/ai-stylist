'use client'

import classes from './FeedbackStylist.module.css'
import { FaceAlgo } from '../lib/faceScan'
import { useEffect, useMemo, useState } from 'react'
import FeedbackCard from './FeedbackCard.js'
import LoadingGif from '../public/LoadingScreen.gif'
import Image from 'next/image'
import Loading from './Loading'
const Feedbackstylist = ({ data, loading, changeLoading, changeData, changeCapture }) => {
    console.log(changeCapture)
    let matchCheatList = {
        'Round':
        {
            'Lens': [
                'Rectangular Lens',
                'Square Lens',
                'Geometric Frames'
            ],
            'Hairstyle': [
                'Long Layers',
                'Side-Swept Bangs',
                'Assymtrical Bob'
            ]
        },


        'Square': {
            'Lens': [
                'Round Lens',
                'Oval Lens',
                'Aviator-style Lens'
            ],
            'Hairstyle': [
                'Soft Layers',
                'Side Swept Bangs',
                'Textured Pixie Cuts'
            ]
        },

        'Oval': {
            'Lens': [
                'Balanced'
            ],
            'Hairstyle': [
                'Layered Hairstyle',
                'Blunt Bob',
                'Long Layers'
            ]
        },

        'Heart-shaped': {
            'Lens': [
                'Bottom-Heavy Frames',
                'Cat-Eye lenses',
                'Rimless Frames'
            ],
            'Hairstyle': [
                'Side-Swept Bangs',
                'Long Layers with Soft Waves'
            ]
        },
        'Diamond-shaped': {
            'Lens': [
                'Oval Lens',
                'Rimless Frames',
                'Softly Curved lenses'
            ],
            'Hairstyle': [
                'Soft Layers',
                'Side-Swept Bangs',
                'Chin-Length Bob'
            ]
        },
        'Rectangle/Oblong': {
            'Lens': [
                'Oversized Frames',
                'Square Lens',
                'Wide Frames'
            ],
            'Hairstyle': [
                'Layered Hairstyle',
                'Chin-Length Bob'
            ]
        },
        'Triangular': {
            'Lens': [
                'Top-heavy frames',
                'Cat-eye lenses',
                'Semi-rimless'
            ],
            'Hairstyle': [
                'Layered Bob',
                'Side-Swept Bangs',
                'Textured Pixie Cuts'
            ]
        },



    }



    const [info, changeInfo] = useState(false);

    console.log(info)
    useEffect(() => {

        if (data) {
            changeLoading(true)
            changeInfo(FaceAlgo(data));
            changeLoading(false)
        }
    }, [data])


    return (
        <>

            {loading && <div className={classes.outlay}></div>}
            {loading && <Loading style={{ position: 'absolute' }}></Loading>}
            {(!loading && info) &&
                <>
                    <div className={classes.outlay} style={{minHeight: '120vh'}}></div>
                    <div className={classes.feedbackCard}>

                        <div className={classes.feedbackCardChild}>
                        <div className={classes.uiBtn} onClick={()=>{
                            changeInfo(false)
                            changeCapture(false)
                            changeData(false);

                        }}>Close or Scan Again</div>

                            <h3 style={{margin: '10px 0px'}}>Suggested for you</h3>


                            <div className={classes.contentDiv}>
                                <p style={{margin: '10px 0px'}}>Suggested Lens</p>
                                <div className={classes.suggestDiv}>
                                    {matchCheatList[info]['Lens'].map((item, idx) => {

                                        return (
                                            <FeedbackCard image={item} key={idx} type={'Lens'}>
                                                </FeedbackCard>
                                        )

                                    })}
                                </div>
                                <p style={{margin: '10px 0px'}}>Suggested Haircuts</p>
                                <div className={classes.suggestDiv}>
                                    {matchCheatList[info]['Hairstyle'].map((item, idx) => {

                                        return (
                                            <FeedbackCard image={item} key={idx} type={'Hairstyle'}>
                                            </FeedbackCard>
                                        )

                                    })}
                                </div>
                            </div>
                        </div>\
                    </div>
                </>
            }

        </>
    )
}

export default Feedbackstylist