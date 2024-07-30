import {getServerSession} from 'next-auth'
import handler from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server';

export async function GET(){
    const session = getServerSession(handler);
    
    console.log(session);


    return NextResponse.json({
        name: session
    })
}