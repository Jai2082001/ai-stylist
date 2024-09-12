'use server';


import prisma from '../db/index';



export async function addUser (user){
    console.log(user)
    prisma.user.create({
        data: user
    }).then((response)=>{
        console.log(response);
    })
}

