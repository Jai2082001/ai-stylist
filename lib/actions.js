'use server';
const { Firestore } = require('@google-cloud/firestore');

const db= new Firestore({ projectId: 'nodal-condition-420221' });



export async function addUsers (user)
{
    'use server';
    console.log(user);
    const data = {
        user: user,
        token: token
    };
    
    // Add a new document in collection "cities" with ID 'LA'
    const res = await db.collection('jaideep').doc('CA').set(data);
    console.log(res)
}

