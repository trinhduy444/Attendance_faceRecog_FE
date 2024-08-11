import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
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
            const usersInfo = await fetchUsersInfo(otherUserIds);
            setReceivedArray(usersInfo);

        };
        fetchChatUsers();
    }, [userId]);

    const fetchUserIdsFromChats = async (userId) => {
        try {
            const chatsCollection = collection(db, 'Chats');
            const querySnapshot = await getDocs(chatsCollection);
            const arr = [];

            querySnapshot.forEach(doc => {
                console.log(doc.id)
                if (doc.id.includes(userId)) {
                    const otherUserId = doc.id.split('_').find(id => id !== userId);
                    if (otherUserId) {
                        arr.push(otherUserId);
                    }
                }
            });
            // console.log("ar", arr)
            return arr;
        } catch (error) {
            console.error("Error fetching chat documents: ", error);
            return [];
        }
    };


    const fetchUsersInfo = async (userIds) => {
        try {
            const usersCollection = collection(db, 'Users');
            const userDocs = await Promise.all(
                userIds.map(async (id) => {
                    const userDocRef = doc(usersCollection, id);
                    const userDocSnap = await getDoc(userDocRef);
                    return userDocSnap.exists() ? userDocSnap.data() : null;
                })
            );
            return userDocs.filter(user => user !== null);
        } catch (error) {
            console.error("Error fetching user documents: ", error);
            return [];
        }
    };
    // if (receivedArray) {
    //     console.log("Got received array", receivedArray, arrayId)
    // }
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
        if(res.status === 200 && res.metadata === true){
            setSelectedUserId(searchReceived.toUpperCase()); 
        }else{
            Swal.fire("Không tồn tại","Người dùng không tồn tại trên hệ thống","error")
        }
    }
    if(selectedUserId){
        console.log(selectedUserId)
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

                                <li className="clearfix">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
                                    <div className="about">
                                        <div className="name" data-username="5213">Vincent Porter</div>
                                        <div className="status"> <i className="bi bi-circle-fill offline"></i> left 7 mins ago </div>
                                    </div>
                                </li>
                       
                                <li className="clearfix">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
                                    <div className="about">
                                        <div className="name" data-username="6213">Do biet la ai luon</div>
                                        <div className="status"> <i className="bi bi-circle-fill offline"></i> left 7 mins ago </div>
                                    </div>
                                </li>
                       

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
