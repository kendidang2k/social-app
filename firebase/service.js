import React from 'react'
import firebase from 'firebase/compat/app'
import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
import { db } from './config'

export const addDocument = (collections, data) => {
    const query = addDoc(collection(db, collections), {
        ...data,
        createdAt: serverTimestamp()
    })
}

// export const updateDocument = (collection, data, id, field, action) => {
//     const DocRef = doc(db, collection, id);
//     switch (action) {
//         case "arrayUnion":
//             const query = updateDoc(DocRef, {
//                 field: action(),
//             })
//             break;
//         case "remove":

//             break;
//         case "add":

//             break;

//         default:
//             break;
//     }
// }