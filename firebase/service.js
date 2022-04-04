import React, { useContext } from 'react'
import firebase from 'firebase/compat/app'
import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
import { db } from './config'
import { StoreContext } from '../context/StoreProvider'
import { AuthContext } from '../context/AuthProvider'


export const addDocument = (collections, data) => {
    const query = addDoc(collection(db, collections), {
        ...data,
        createdAt: serverTimestamp()
    }).then((docRef) => {
        const currentDocRef = docRef._key.path.segments[1];
        localStorage.setItem("currentDocRefId", currentDocRef)
    })
}
