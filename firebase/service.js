import React from 'react'
import firebase from 'firebase/compat/app'
import { addDoc, collection } from '@firebase/firestore'
import { db } from './config'

export const addDocument = (collections, data) => {
    const query = addDoc(collection(db, collections), {
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}