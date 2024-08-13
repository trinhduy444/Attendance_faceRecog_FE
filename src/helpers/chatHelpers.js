
import { collection, getDocs } from "firebase/firestore";
import { db } from '../configs/firebaseConfig'
const fetchUserIdsFromChats = async (userId) => {
    try {
        const chatsCollection = collection(db, 'Chats');
        const querySnapshot = await getDocs(chatsCollection);
        // console.log('length', querySnapshot.size)
        const arr = [];
        querySnapshot.forEach(doc => {
            // console.log('doc',doc.id)
            const ids = doc.id.split('_');
            if (ids.includes(userId)) {
                let tmpId = ids.find(id => id !== userId);
                arr.push(tmpId)
            }
        });
        return arr;
    } catch (error) {
        console.error("Error fetching chat documents: ", error);
        return [];
    }
};


const fetchUsersInfo = async (userIds) => {
    try {
        const usersCollection = collection(db, 'Users');
        const querySnapshot = await getDocs(usersCollection);
        // console.log('length2', querySnapshot.size)

        let arr = []
        querySnapshot.forEach((doc) => {
            if (userIds.includes(doc.id)) {
                arr.push({ id: doc.id, ...doc.data() });

            }
        });
        return arr;
    } catch (error) {
        console.error("Error fetching user documents: ", error);
        return [];
    }
};

export default {
    fetchUserIdsFromChats,
    fetchUsersInfo
}