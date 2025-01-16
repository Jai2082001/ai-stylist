'use client'

import { useEffect, useState } from 'react'
import classes from './page.module.css'
import { useSession, signIn } from 'next-auth/react'
import { displayWardrobe, dominantColorBasedOnId, MatchTheWardrobe } from '../../../lib/wardrobeactions'
import { resolveValue } from 'react-hot-toast'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const MatchingOutfits = () => {

    const { data: session, status } = useSession();



    const [records, changeRecords] = useState(false);
    const [page, changePage] = useState('outfits');
    const [outfits, changeOutfits] = useState(false);

    useEffect(() => {
        if (status == 'unauthenticated') {
            signIn();
        }
    }, [status])
    useEffect(() => {
        const promise = asyncEffectFunction();
        promise.then((resolve) => {
            let trousers = [];
            let shirt = [];
            let tshirt = [];
            let jacket = [];
            let pullover = [];
            console.log(resolve)
            resolve.totalItems.map((single) => {
                if (single.type == 'Trouser') {
                    trousers.push(single);

                } else if (single.type == 'Pullover') {
                    pullover.push(single)
                } else if (single.type == 'Shirt') {
                    shirt.push(single)
                } else if (single.type == 'Jacket') {
                    jacket.push(single)
                } else if (single.type == 'T-Shirt/top') {
                    tshirt.push(single)
                }
            })
            changeOutfits(resolve.outfitsMade);
            changeRecords({ pullover: pullover, trousers: trousers, shirt: shirt, jacket: jacket, tshirt: tshirt })
        })
    }, [])

    const highScore = (dominantColors) => {
        let max = { score: 0.0, index: 0 };
        dominantColors.map((single, idx) => {
            if (single.score > max.score) {
                max = single;
            }
        })

        return max;
    }
    const asyncDominantFunc = (id) => {
        return dominantColorBasedOnId(id)
    }

    const asyncEffectFunction = async () => {
        const array = await displayWardrobe();
        for (let i = 0; i < array.length; i++) {
            array[i].dominantColors = await dominantColorBasedOnId(array[i].dominantColorId);
        }

        const matchedOutfits = await MatchTheWardrobe(array);


        return { totalItems: array, outfitsMade: matchedOutfits };
    }

    return (
        <Card className='m-6 p-3'>
            <div className={classes.Div}>
                <div className={classes.buttonPar}>
                    <Button onClick={() => { changePage('outfits') }}>Your Wardrobe</Button>
                    <Button onClick={() => { changePage('wardrobe') }}>Our Suggestions</Button>
                </div>
                {page == 'wardrobe' &&
                    <>
                        {
                            outfits.map((singleRecord, idx) => {
                                return (
                                    <div key={idx} className={classes.parDiv}>
                                        <p>Outfit Number {idx + 1}</p>
                                        <div className={classes.outfits}>

                                            {singleRecord.upper &&
                                                <div className={classes.childOut}>
                                                    <p>{singleRecord.upper.type}</p>
                                                    <img src={singleRecord.upper.image} alt="Sunset in the mountains" />

                                                    <div clasName={classes.dominantColor} style={{ backgroundColor: `rgb(${singleRecord.upper.dominantColors.red},${singleRecord.upper.dominantColors.green}, ${singleRecord.upper.dominantColors.blue})`, height: '20px' }} class="px-6 py-4">
                                                    </div>

                                                </div>}
                                            {singleRecord.upper2 &&
                                                <div className={classes.childOut}>
                                                    <p>{singleRecord.upper2.type}</p>
                                                    <img src={singleRecord.upper2.image} alt="Sunset in the mountains" />

                                                    <div clasName={classes.dominantColor} style={{ backgroundColor: `rgb(${singleRecord.upper2.dominantColors.red},${singleRecord.upper2.dominantColors.green}, ${singleRecord.upper2.dominantColors.blue})`, height: '20px' }} class="px-6 py-4">
                                                    </div>

                                                </div>}

                                            {singleRecord.trouser &&
                                                <div className={classes.childOut}>
                                                    <p>Trouser</p>
                                                    <img src={singleRecord.trouser.image} alt="Sunset in the mountains" />

                                                    <div clasName={classes.dominantColor} style={{ backgroundColor: `rgb(${singleRecord.trouser.dominantColors.red},${singleRecord.trouser.dominantColors.green}, ${singleRecord.trouser.dominantColors.blue})`, height: '20px' }} class="px-6 py-4">
                                                    </div>

                                                </div>}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                }
                {page == 'outfits' &&
                    <>


                        {records &&
                            <>


                                <Accordion className={'item-center'} type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger ><h2 className=' w-full text-center'>Trousers</h2>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {
                                                records.trousers.map((element, idx) => {
                                                    console.log(element)

                                                    return (




                                                        <div key={idx} class="max-w-sm rounded overflow-hidden shadow-lg">
                                                            <img src={element.image} alt="Sunset in the mountains" />

                                                            <div clasName={classes.dominantColor} style={{ backgroundColor: `rgb(${element.dominantColors.red},${element.dominantColors.green}, ${element.dominantColors.blue})`, width: '20px', height: '20px' }} class="px-6 py-4">
                                                            </div>

                                                        </div>
                                                    )
                                                })}

                                            {records.trousers.length <= 0 && <p>No Trousers Recorded</p>}

                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value='item-2'>
                                        <AccordionTrigger>
                                            <h2 className='w-full text-center'>Tshirt/Top</h2>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {
                                                records.tshirt.map((element, idx) => {


                                                    return (


                                                        <div key={idx} class="max-w-sm rounded overflow-hidden shadow-lg">
                                                            <img src={element.image} alt="Sunset in the mountains" />

                                                            <div className={classes.dominantColor} style={{ backgroundColor: `rgb(${element.dominantColors.red},${element.dominantColors.green}, ${element.dominantColors.blue})`, height: '20px' }} class="px-6 py-4">

                                                            </div>

                                                        </div>
                                                    )
                                                })}
                                            {records.tshirt.length <= 0 && <p>No Tshirt Recorded</p>}

                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value={'item-3'}>
                                        <AccordionTrigger>
                                            <h2 className='w-full text-center'>Shirt</h2>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {
                                                records.shirt.map((element, idx) => {
                                                    // if (element.dominantColors) {
                                                    //     highScore(element.dominantColors)
                                                    // }

                                                    return (


                                                        <div key={idx} class="max-w-sm rounded overflow-hidden shadow-lg">
                                                            <img src={element.image} alt="Sunset in the mountains" />
                                                            <div className={classes.dominantColor} style={{ backgroundColor: `rgb(${element.dominantColors.red},${element.dominantColors.green}, ${element.dominantColors.blue})`, height: '20px' }} class="px-6 py-4">

                                                            </div>

                                                        </div>
                                                    )
                                                })}
                                            {records.shirt.length <= 0 && <p>No Shirt Recorded</p>}

                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value={'item-4'}>
                                        <AccordionTrigger>
                                            <h2 className='w-full text-center'>Jacket</h2>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {
                                                records.jacket.map((element, idx) => {


                                                    return (


                                                        <div key={idx} class="max-w-sm rounded overflow-hidden shadow-lg">
                                                            <img class="w-full" src={element.image} alt="Sunset in the mountains" />
                                                            <div className={classes.dominantColor} style={{ backgroundColor: `rgb(${element.dominantColors.red},${element.dominantColors.green}, ${element.dominantColors.blue})`, height: '20px' }} class="px-6 py-4">

                                                            </div>

                                                        </div>
                                                    )
                                                })}
                                            {records.shirt.length <= 0 && <p>No Jacket Recorded</p>}

                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value={'item-5'}>
                                        <AccordionTrigger>
                                            <h2 className={'w-full text-center'}>Pullover</h2>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {
                                                records.pullover.map((element, idx) => {


                                                    return (

                                                        <>
                                                            <div class="max-w-sm rounded overflow-hidden shadow-lg">
                                                                <img class="w-full" src={element.image} alt="Sunset in the mountains" />
                                                                <div className={classes.dominantColor} style={{ backgroundColor: `rgb(${element.dominantColors.red},${element.dominantColors.green}, ${element.dominantColors.blue})`, height: '20px' }} class="px-6 py-4">

                                                                </div>


                                                            </div>

                                                        </>
                                                    )
                                                })}
                                            {records.pullover.length <= 0 && <p>No Pullover Recorded</p>}

                                        </AccordionContent>
                                    </AccordionItem>

                                </Accordion>

                            </>
                        }
                    </>}

                {!records && <>Upload your wardrobe!</>}
            </div>
        </Card>
    )
}

export default MatchingOutfits