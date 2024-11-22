import React, { useEffect, useState } from "react"
import Swal from "sweetalert2"
import * as XLSX from "xlsx"

import { roomService } from "../../../services/roomService";
import NavBarToggle from "../../../components/NavBarToggle";
import Pagination from "../UserManagement/Pagination";
function ClassManagementContent({ toggleNavBar }) {
    const [roomData, setRoomData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentrooms, setCurrentrooms] = useState([]);
    const roomsPerPage = 10;


    const handleFectchRooms = async () => {
        try {
            const response = await roomService.getAllRooms();
            if (response.status === 200) {
                setRoomData(response.metadata)
                return;
            } else {
                Swal.fire('Lỗi', 'Không thể thêm phòng học, vui lòng thử lại sau.', 'error');
                return;
            }
        } catch (error) {
            console.error('Error fecthing rooms:', error);
            Swal.fire('Lỗi', 'Không thể thêm phòng học. Vui lòng thử lại sau.', 'error');
        }
    }
    useEffect(() => {
        handleFectchRooms();
    }, [])

    useEffect(() => {
        const indexOfLastroom = currentPage * roomsPerPage;
        const indexOfFirstroom = indexOfLastroom - roomsPerPage;
        setCurrentrooms(roomData.slice(indexOfFirstroom, indexOfLastroom));
    }, [roomData, currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const handleCreateMutilRooms = async (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        const validFileExtensions = ['.xls', '.xlsx'];
        const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

        if (!validFileExtensions.includes(fileExtension)) {
            Swal.fire({
                title: 'Lỗi',
                text: 'File không hợp lệ. Vui lòng chọn file Excel.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }
        if (file) {
            reader.onload = (evt) => {
                const bstr = evt.target.result;
                const workBook = XLSX.read(bstr, { type: 'binary' });
                const workSheetName = workBook.SheetNames[0];
                const workSheet = workBook.Sheets[workSheetName];
                const data = XLSX.utils.sheet_to_json(workSheet);

                Swal.fire({
                    title: `Bạn có chắc thêm ${data.length} phòng học?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Chắc chắn',
                    cancelButtonText: 'Không',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        Swal.fire('Đã xác nhận dữ liệu', 'Đang tiến hành thêm phòng học...', 'info');
                        handleFectchCreateRooms(data);
                    }

                });
            };
            reader.readAsBinaryString(file);
        }
    }
    const handleFectchCreateRooms = async (data) => {
        try {
            const response = await roomService.createRooms(data);
            if (response.status === 201) {
                // console.log(response)
                Swal.fire('Thêm thành công', `Đã thêm các phòng: ${response.created}; và không thêm được các phòng: ${response.skipped}`, 'info');
                handleFectchRooms()
            } else {
                Swal.fire('Có lỗi xảy ra', 'Vui lòng thử lại', 'error');
            }
        } catch (error) {
            console.error('Error adding rooms:', error);
            Swal.fire('Lỗi', 'Không thể thêm phòng học. Vui lòng thử lại sau.', 'error');
        }
    }
    const handleCreateRoom = async (e) => {
        e.preventDefault();
        const building = document.querySelector('#selectBuilding').value
        const floor = parseInt(document.querySelector('#selectFloor').value)
        const capacity = parseInt(document.querySelector('#selectCapacity').value)
        let roomNumber = document.querySelector('#roomNumber').value
        const description = document.querySelector('#description').value

        if (parseInt(roomNumber) < 10) {
            roomNumber = `0${roomNumber}`
        }
        const classroom_code = `${building}${floor}${roomNumber}`


        Swal.fire({
            title: 'Bạn có muốn thêm phòng?',
            text: `Bạn có chắc muốn thêm phòng ${classroom_code}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Có, thêm phòng!',
            cancelButtonText: 'Không, hủy!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await roomService.createRoom({ building, floor, capacity, roomNumber, description })
                if (response.status === 201) {
                    Swal.fire('Thêm thành công', response.message, 'success');
                } else {
                    Swal.fire('Thêm thất bại', response.message, 'error');
                }
            }
        })
    }

    return (
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
            <header className="bg-surface-primary border-bottom pt-3 pb-3">
                <div className="container">
                    <div className="mb-npx">
                        <div className="row align-items-center">
                            <div className="col-sm-6 col-12 mb-4 mb-sm-0">

                                <h1 className="h2 mb-0 ls-tight">
                                    <NavBarToggle toggleNavBar={toggleNavBar} />
                                    QUẢN LÝ PHÒNG HỌC</h1>
                            </div>
                            <div className="col-sm-6 col-12 text-sm-end">
                                <div className="mx-n1">
                                    <button type="button" data-bs-toggle="modal"
                                        data-bs-target="#createClassRoomModel" className="btn d-inline-flex btn-sm btn-primary mx-1">
                                        <span className="pe-2">
                                            <i className="bi bi-plus"></i>
                                        </span>
                                        <span>Tạo phòng</span>
                                    </button>
                                    <input className="btn d-inline-flex btn-sm btn-warning mx-1" type="file" id="userFile" accept=".xlsx, .xls" onChange={handleCreateMutilRooms} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main className="py-6 bg-surface-secondary">
                <div className="container">
                    <div className="card shadow border-1 mb-7">
                        <div className="card-header">
                            <h5 className="mb-0">DANH SÁCH PHÒNG HỌC</h5>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover table-nowrap">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Mã phòng</th>
                                        <th scope="col">Tòa</th>
                                        <th scope="col">Số lượng tối đa</th>
                                        <th scope="col">Tầng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentrooms.map((room, index) => (
                                        <tr key={index}>
                                            <td><b>{room.classroom_code}</b></td>
                                            <td>Tòa {room.classroom_code.substring(0, 1)}</td>

                                            <td>{room.capacity} người</td>
                                            <td>{room.floor}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer border-0 py-5">
                            <span className="text-muted text-sm">
                                Hiển thị {currentrooms.length} phòng học trong số <b className="text-danger">{roomData.length}</b> phòng học
                            </span>
                            <Pagination
                                totalItems={roomData.length}
                                itemsPerPage={roomsPerPage}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />

                        </div>
                    </div>
                </div>
            </main>
            <div className="modal fade bd-example-modal-lg" id="createClassRoomModel" tabIndex="-1" aria-labelledby="createClassRoomModel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Thêm phòng học</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="container" onSubmit={handleCreateRoom}>

                            <div className="modal-body">

                                <div className="row mb-3">
                                    <div className="col-6">
                                        <label htmlFor="selectBuilding">Chọn tòa phòng:</label>
                                        <select name="selectBuilding" className="form-control border border-dark" id="selectBuilding">
                                            <option value="A">Tòa A</option>
                                            <option value="B">Tòa B</option>
                                            <option value="C">Tòa C</option>
                                            <option value="D">Tòa D</option>
                                            <option value="E">Tòa E</option>

                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="selectCapacity">Số người tối đa:</label>
                                        <select name="selectCapacity" className="form-control border border-dark" id="selectCapacity">
                                            <option value="25">25 Người</option>
                                            <option value="50">50 Người</option>
                                            <option value="70">75 Người</option>
                                            <option value="100">100 Người</option>
                                            <option value="150">150 Người</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <label htmlFor="roomNumber">Số phòng: </label>
                                        <input type="number" className="form-control border border-dark" id="roomNumber" aria-describedby="emailHelp" placeholder="Nhập số phòng..." required autoFocus min={1} max={30}>
                                        </input>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="selectFloor">Chọn tầng</label>
                                        <select name="selectFloor" className="form-control border border-dark" id="selectFloor">
                                            <option value="1">Tâng 1</option>
                                            <option value="2">Tầng 2</option>
                                            <option value="3">Tầng 3</option>
                                            <option value="4">Tầng 4</option>
                                            <option value="5">Tầng 5</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <label htmlFor="description">Nhập mô tả(nếu có): </label>
                                        <textarea className="form-control border border-dark" id="description"></textarea>
                                    </div>


                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button type="submit" id="submitRoomBtn" className="btn btn-primary">Tạo phòng</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    );
}
export default React.memo(ClassManagementContent);
