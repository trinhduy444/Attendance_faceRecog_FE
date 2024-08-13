import { collection, getDocs, addDoc, query, where, orderBy } from "firebase/firestore";
import { db } from '../configs/firebaseConfig'; // Đảm bảo đường dẫn đúng
/**
 * Lấy tất cả tin nhắn giữa hai người dùng
 * @param {string} user1 - Người dùng thứ nhất
 * @param {string} user2 - Người dùng thứ hai
 * @returns {Promise<Array>} - Danh sách các tin nhắn
 */
console.log("Db",db)
const getMessages = async (user1, user2) => {
    try {
        const chatId = `${user1}_${user2}`; // Tạo chatId từ user1 và user2
        const messagesRef = collection(db, 'Chats', chatId, 'Messages'); // Collection con Messages trong chatId document

        const q = query(
            messagesRef,
            orderBy('timestamp', 'asc')
        );

        const querySnapshot = await getDocs(q);
        const messages = querySnapshot.docs.map(doc => doc.data());
        return messages;
    } catch (error) {
        console.error("Error getting messages: ", error);
        throw new Error("Could not retrieve messages.");
    }
};
/**
 * Lưu tin nhắn mới vào Firestore
 * @param {string} from - Người gửi
 * @param {string} to - Người nhận
 * @param {string} message - Nội dung tin nhắn
 */
const sendMessage = async (user1, user2, message) => {
    try {
        const chatId = `${user1}_${user2}`;
        const chatRef = collection(db, 'Chats', chatId, 'Messages');

        await addDoc(chatRef, {
            from: user1,
            to: user2,
            message,
            timestamp: new Date()
        });
    } catch (error) {
        console.error("Error sending message: ", error);
        throw new Error("Could not send message.");
    }
};

export default {
    getMessages,
    sendMessage,
}