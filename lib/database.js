const { Firestore } = require('@google-cloud/firestore');

const db= new Firestore({ projectId: 'nodal-condition-420221' });


const addUser  = async () => {
    console.log('exxx')
    const data = {
        name: 'Los Angeles',
        state: 'CA',
        country: 'USA'
    };
    
    // Add a new document in collection "cities" with ID 'LA'
    const res = await db.collection('cities').doc('').set(data);
    console.log(res)
}


export default addUser 