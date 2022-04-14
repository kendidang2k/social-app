// import { useEffect } from "react"
// import useFirestore from "./useFirestore"

// const useGetPost = (currentUID) => {


//     const [document, setDocument] = useState([])

//         let collectionRef;
//         // if (condition.orderBy) {
//         //     collectionRef = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
//         // } else {
//         //     collectionRef = query(collection(db, collectionName));
//         // }
//         // if (condition) {
//         //     if (!condition.compareValue || !condition.compareValue.length) {
//         //         return;
//         //     }
//         // }
//         currentUID.following.forEach(element => {
//             collectionRef = query(collectionRef, where("publisherID", "==", element));
            
//             const CoDocuments = [];
//             onSnapshot(collectionRef, (querySnapshot) => {
//                 querySnapshot.forEach((doc) => {
//                     CoDocuments.push({
//                         docid: doc.id,
//                         ...doc.data()
//                     })
//                 })
                
//             })
          
//             setDocument(CoDocuments);
//         });
        
//         console.log(document)
//     return document;

//     // console.log('t=current UID:', currentUID.following )

//     // useEffect(() => {
//     //     const getPostBF = () => {
//     //         const getPostByFollowingCondition = {
//     //             fieldName: 'publisherID',
//     //             operator: 'array-contains-any',
//     //             compareValue: currentUID.following,
//     //             orderBy: true
//     //         }

//     //         console.log("getPostByFollowingCondition", getPostByFollowingCondition);

//     //         // getPostByFollowing = useFirestore('posts', getPostByFollowingCondition)
//     //         console.log("getPostByFollowing:", getPostByFollowing)
//     //     }

//     //     getPostBF()
//     // }, [currentUID])

//     // return (
//     //     ""
//     // )
// }