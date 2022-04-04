import { collection, onSnapshot, where, query, orderBy } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

const  useFirestore = (collectionName, condition) => {

    const [document, setDocument] = useState([])

    useEffect(() => {
        let collectionRef;
        if (condition.orderBy) {
            collectionRef = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
        } else {
            collectionRef = query(collection(db, collectionName));
        }
        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                return;
            }
            collectionRef = query(collectionRef, where(condition.fieldName, condition.operator, condition.compareValue));
        }

        const unsubcribe = onSnapshot(collectionRef, (querySnapshot) => {
            const CoDocuments = [];
            querySnapshot.forEach((doc) => {
                CoDocuments.push({
                    docid: doc.id,
                    ...doc.data()
                })
            })

            setDocument(CoDocuments);
        })

        return unsubcribe;

    }, [collectionName, condition])

    return document;
};

export default useFirestore;