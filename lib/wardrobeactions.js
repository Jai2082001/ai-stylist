'use server'

import { getServerSession } from 'next-auth';
import handler from '../app/api/auth/[...nextauth]/route'
import { PrismaClient } from '@prisma/client';
const { calculateDistance, rgbToHsl} = require('./matchingColor')



export async function addWardrobeProfile(object){
    const pClient = new PrismaClient();
    let dominantColor = object.dominantColors;
    const userid = await pClient.user.findFirst({
        where: {
            email: object.profileId
        }
    }) 
    const colorSave = await pClient.DominantColor.create(
        {
            data: 
            {
                blue: dominantColor.blue,
                red: dominantColor.red,
                green: dominantColor.green,
            }
        }
        
    )
    const response = await pClient.WardrobeItem.create({
        data: {
            userId: userid.id,
            type: object.type, 
            image: object.image,
            dominantColorId: colorSave.id
        }
    })
    return response.id;
    // console.log(res);
}
export async function dominantColorBasedOnId(id){
    const pClient = new PrismaClient();
    const dominantColor = await pClient.dominantColor.findFirst({
        where: {
            id: id
        }
    }) 
    return dominantColor
}
export async function addFaceScans(object){
    const pClient = new PrismaClient();
    const userid = await pClient.user.findFirst({
        where: {
            email: object.profileId
        }
    })
    const responseid = await pClient.FaceScans.create({
        data: {
            userid: userid.id,
            image: object.image
        }
    })
    return responseid
}


export async function changeWardrobeProfile(object, id){
    let data = object.data;
    data.dominantColors = object.color;
    data.type = object.type
    const res = await db.collection('wardrobe').doc(`${id}`).set(data);
    console.log(res)   
}

function calculateDistanceWardrobeItemSpecific(item, item2){
    const itemDominantColor = item.dominantColors;
    const item2DominantColor = item2.dominantColors;
    const rgbToHslItem1 = rgbToHsl(itemDominantColor.red, itemDominantColor.green, itemDominantColor.green);
    const rgbToHslItem2 = rgbToHsl(item2DominantColor.red, item2DominantColor.green, item2DominantColor.blue);
    let distance = calculateDistance(rgbToHslItem1, rgbToHslItem2);
    return distance;

}

export async function displayWardrobe(){
    const userId = await getServerSession(handler)
    const pClient = new PrismaClient();
    const userid = await pClient.user.findFirst({
        where: {
            email: userId.email
        }
    })

    const wardrobeResponse = await pClient.wardrobeItem.findMany({
        where:{
            userId: userid.id
        }
    })
    return wardrobeResponse
}

const highScore = (dominantColors) => {
    let max = { score: 0.0, index: 0 };
    dominantColors.map((single, idx) => {
        if (single.score > max.score) {
            max = single;
        }
    })

    return max;
}

export async function MatchTheWardrobe(array){
    let wardrobe = array;
   let outfits = []
    for(let i=0;i<wardrobe.length;i++){
        if(wardrobe[i].type == 'Trouser'){

            wardrobe.forEach((noTR)=>{

                if(noTR.id != wardrobe[i].id){

                    if(noTR.type != 'Trouser'){
                        
                        if(noTR.type == 'T-shirt/top' ||  noTR.type == 'Pullover'){
                            let distance = calculateDistanceWardrobeItemSpecific(wardrobe[i], noTR);
                            if(distance < 0.30){
                                outfits.push({trouser: wardrobe[i], upper: noTR, distance: distance})
                            }
                        }else{
                            if(noTR.type == 'Shirt'){
                                let distance = calculateDistanceWardrobeItemSpecific(wardrobe[i], noTR);
                                if(distance < 0.30){
                                    outfits.push({trouser: wardrobe[i], upper: noTR, distance: distance});
                                    wardrobe.map((yTshirt)=>{
                                        if(yTshirt.type == 'T-Shirt/top'){
                                            let distance1 = calculateDistanceWardrobeItemSpecific(wardrobe[i], yTshirt);
                                            let distance2 = calculateDistanceWardrobeItemSpecific(yTshirt, noTR);
    
                                            if(distance1 < 0.30 && distance2 < 0.30){
                                                outfits.push({trouser: wardrobe[i], upper: noTR, upper2: yTshirt, distance1: distance1, distance2: distance2});
                                            }
                                        }
                                    })
                                }
                            }else{
                                // This is the check for jacket
                                let distance = calculateDistanceWardrobeItemSpecific(wardrobe[i], noTR);
                                if(distance < 0.30){
                                    outfits.push({trouser: wardrobe[i], upper: noTR});
                                        wardrobe.map((yShirtTShirt)=>{
                                            if(yShirtTShirt == 'Shirt' || yShirtTShirt == 'T-Shirt/top'){
                                                let distance = calculateDistanceWardrobeItemSpecific(wardrobe[i], yShirtTShirt);
                                                let distance1 = calculateDistanceWardrobeItemSpecific(yShirtTShirt, noTR);
                                                if(distance < 0.30 && distance1 < 0.30){
                                                    outfits.push({trouser: wardrobe[i], upper: noTR, upper2: yShirtTShirt, distance1: distance, distance2: distance1
                                                    })
                                                }        
                                            }
                                            
                                        })
                                }    
                            }
                            
                            // now we are going to see complemeting shirt or tshirt for jacket and complementing tshirt for shirt
    
                        }
                    }
    
                }
                
            })
        }else{
            if(wardrobe[i].type == 'Shirt'){
                wardrobe.map((yTshirt) => {
                    if(yTshirt.type == 'T-Shirt/top'){
                        let distance = calculateDistanceWardrobeItemSpecific(yTshirt, wardrobe[i]);
                        if(distance < 0.30){
                            outfits.push({upper: yTshirt, upper2: wardrobe[i], distance: distance});
                        }

                    }
                })

            }else if(wardrobe[i].type == 'Jacket'){

                wardrobe.map((yTshirtShirt) => {
                    if(yTshirtShirt.type == 'T-Shirt/top' || yTshirtShirt.type == 'T-Shirt/top'){
                        let distance = calculateDistanceWardrobeItemSpecific(yTshirtShirt, wardrobe[i]);
                        if(distance < 0.30){
                            outfits.push({upper: yTshirtShirt, upper2: wardrobe[i], distance: distance} );
                        }

                    }
                })

            }else{
                // continue;
            }   
        }
    }

    return outfits
}

