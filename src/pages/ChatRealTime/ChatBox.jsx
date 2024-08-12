import React, { useEffect, useState, useRef } from "react";
import { collection, addDoc, onSnapshot, query, orderBy, doc, getDoc, setDoc } from 'firebase/firestore';
import Swal from "sweetalert2";
import { db } from '../../configs/firebaseConfig'
import { userService } from "../../services/userService";
import { convertTimestamp } from '../../utils/convertDay'
function ChatBox({ userId, receivedId }) {
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState({});

    useEffect(() => {
        handleFetchInfoUsers(userId)
        handleFetchInfoUsers(receivedId)

    }, []);
    const chatHistoryRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the chat history
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [messages]);
    const handleFetchInfoUsers = async (userId) => {
        try {
            const res = await userService.getImageAndNicknameByUsername(userId);
            const { metadata } = res;
            // console.log(metadata)
            if (!metadata || !metadata.username) {
                return;
            }
            const username = metadata.username;
            const userDocRef = doc(db, 'Users', username);

            // Kiểm tra xem user đã tồn tại trong Firestore chưa
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    username: username,
                    image_path: metadata.avatar_path || "https://bootdey.com/img/Content/avatar/avatar1.png",
                    nickname: metadata.nickname,
                    lastUpdated: new Date()
                });
                console.log(`Đã tạo mới user ${username} trong Firestore`);
            } else {
                console.log(`User ${username} đã tồn tại trong Firestore`);
            }
        } catch (error) {
            console.error("Lỗi khi xử lý thông tin người dùng:", error);
        }
    };

    useEffect(() => {
        const chatId = [userId, receivedId].sort().join('_');
        const chatDocRef = doc(db, 'Chats', chatId);
        const messagesCollectionRef = collection(chatDocRef, 'messages');

        const unsubscribeMessages = onSnapshot(messagesCollectionRef, (snapshot) => {
            const newMessages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(newMessages);
        });

        // Lắng nghe thay đổi thông tin người dùng
        const userIds = [userId, receivedId];
        if (!userId || !receivedId) {
            console.error("User ID or received ID is undefined.");
            return;
        }
        const unsubscribeUsers = userIds.map(id =>
            onSnapshot(doc(db, 'Users', id), (doc) => {
                setUsers(prevUsers => ({
                    ...prevUsers,
                    [id]: doc.data()
                }));
            })
        );

        return () => {
            unsubscribeMessages();
            unsubscribeUsers.forEach(unsubscribe => unsubscribe());
        };
    }, [userId, receivedId]);
    const handleSendMessage = async () => {
        if (!inputMessage.trim()) {
            return;
        }

        try {
            const chatId = [userId, receivedId].sort().join('_');
            const chatDocRef = doc(db, 'Chats', chatId);

            // Kiểm tra nếu tài liệu Chats không tồn tại, thêm trường vào tài liệu chính
            const chatDocSnap = await getDoc(chatDocRef);
            if (!chatDocSnap.exists()) {
                await setDoc(chatDocRef, {
                    createdAt: new Date()
                });
            }

            const messagesCollectionRef = collection(chatDocRef, 'messages');

            await addDoc(messagesCollectionRef, {
                from: userId,
                to: receivedId,
                message: inputMessage.trim(),
                timeStamps: new Date()
            });

            setInputMessage('');
        } catch (error) {
            Swal.fire("Lỗi", "Không thể gửi tin nhắn!", "error");
            console.error('Lỗi khi gửi tin nhắn:', error);
        }
    };


    return (
        <div className="chat">
            <div className="chat-header clearfix">
                <div className="row">
                    <div className="col-lg-6">
                        <a href='#' data-toggle="modal" data-target="#view_info">
                            {users[receivedId]?.image_path ? (
                                <img src={users[receivedId]?.image_path} alt="avatar" />
                            ) : (
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
                            )}
                        </a>
                        <div className="chat-about">
                            <h6 className="m-b-0">{users[receivedId]?.nickname}</h6>
                            <small>Last seen: 2 hours ago</small>
                        </div>
                    </div>
                    <div className="col-lg-6 hidden-sm text-right">
                    </div>
                </div>
            </div>
            <div className="chat-history overflow-auto" ref={chatHistoryRef} style={{ maxHeight: '55vh', overflowY: 'auto' }}>
                <ul className="m-b-0">
                    {messages
                        .sort((a, b) => a.timeStamps - b.timeStamps)
                        .map((msg) => (
                            <li className="clearfix" key={msg.id}>
                                {msg.from === userId ? (
                                    <div className="message-data text-right d-flex justify-content-end">
                                        <div>
                                            <span className="message-data-time text-end">
                                                {convertTimestamp(msg.timeStamps)}
                                            </span>
                                            <div className="message my-message ">{msg.message}</div>

                                        </div>

                                    </div>
                                ) : (
                                    <div className="message-data">
                                        <span className="message-data-time">
                                            {convertTimestamp(msg.timeStamps)}
                                        </span>
                                        <div className="message other-message ">{msg.message}</div>
                                    </div>
                                )}
                            </li>
                        ))}
                </ul>
            </div>
            <div className="chat-message clearfix">
                <div className="input-group mb-0">
                    <div className="input-group-prepend">
                        <a type="button" onClick={handleSendMessage}>
                            <span className="input-group-text">
                                <i className="bi bi-send"></i>
                            </span>
                        </a>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập nội dung..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default React.memo(ChatBox);
