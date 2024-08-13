import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../configs/firebaseConfig'
import ChatBox from "./ChatBox";
import Swal from "sweetalert2";
import { userService } from "../../services/userService";

function ChatContent({ userId }) {
    const [receivedArray, setReceivedArray] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [searchReceived, setSearchReceived] = useState('');
    useEffect(() => {
        const fetchChatUsers = async () => {
            const otherUserIds = await fetchUserIdsFromChats(userId);
            // console.log(otherUserIds)
            const usersInfo = await fetchUsersInfo(otherUserIds);
            // console.log("users", usersInfo)
            setReceivedArray(usersInfo);

        };
        fetchChatUsers();
    }, [userId]);

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

    const handleSearch = (e) => {
        const input = e.target.value.toLowerCase();
        setSearchReceived(input);
        const ul = document.getElementById("ulReceiArray");
        const li = ul.getElementsByTagName("li");

        for (let i = 0; i < li.length; i++) {
            const name = li[i].querySelector(".name").textContent.toLowerCase();
            const username = li[i].querySelector(".name").dataset.username;
            if (name.includes(input) || username.toLowerCase().includes(input)) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    };
    const handleCreateNewChat = async (e) => {
        e.preventDefault();
        if (searchReceived === undefined || searchReceived === '') {
            Swal.fire("Lỗi thực thi", "Vui lòng nhập thông tin người dùng để gửi tin nhắn!", "warning");
        }
        const res = await userService.checkExistUser(searchReceived)
        if (res.status === 200 && res.metadata === true) {
            setSelectedUserId(searchReceived.toUpperCase());
        } else {
            Swal.fire("Không tồn tại", "Người dùng không tồn tại trên hệ thống", "error")
        }
    }

    return (

        <div className="container">
            <div className="row clearfix">
                <div className="col-lg-12">
                    <div className="card chat-app" id="chatContent">

                        <div id="plist" className="people-list">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <a type='button' className="input-group-text" onClick={handleCreateNewChat}><i className="bi bi-plus"></i></a>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tìm kiếm..."
                                    value={searchReceived}
                                    onChange={handleSearch}
                                />
                            </div>
                            <ul className="list-unstyled chat-list mt-2 mb-0" id="ulReceiArray">
                                {receivedArray.map((user, index) => (
                                    <li
                                        className={`clearfix ${selectedUserId === user.username ? 'active' : ''}`}
                                        key={index}
                                        onClick={() => setSelectedUserId(user.username)}
                                    >
                                        <img src={user.image_path} alt="avatar" />
                                        <div className="about">
                                            <div className="name" data-username={user.username}>{user.nickname}</div>
                                            <div className="status"> <i className="bi bi-circle-fill online"></i> Đang hoạt động</div>
                                        </div>
                                    </li>
                                ))}
                                </ul>
                        </div>
                        {selectedUserId ? <ChatBox userId={userId} receivedId={selectedUserId} /> : (null)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(ChatContent);
