import React, { useEffect, useState } from "react"
import * as XLSX from "xlsx"
import Swal from "sweetalert2"
import { adminService } from "../../../services/adminService";
import Pagination from '../UserManagement/Pagination'
import '../../../assets/css/adminDashboard.css'
// import MyErrorBoundary from "../../Error/ErrorFallback";
import NavBarToggle from "../../../components/NavBarToggle";
function ManagerManagementContent({ toggleNavBar }) {
    // Declare array to show
    const [showUser, setShowUser] = useState([]);
    // Declare pagination and sort arrays
    const [currentPage, setCurrentPage] = useState(1);
    const [currentUsers, setCurrentUsers] = useState([]);
    const usersPerPage = 10;
    // View User
    const [viewUser, setViewUser] = useState(null);

    // Create Admin
    const [newAdmin, setNewAdmin] = useState({
        email: '',
        nickname: '',
        username: '',
        password: '',
        phone: ''
    });
    // Fetch all users
    const fetchUsers = async () => {
        const response = await adminService.getAllAdministrators();
        if (response.status === 200) {
            setShowUser(response.data.metadata);
        }

    }
    useEffect(() => {
        fetchUsers();
    }, [])

    // Tính toán dữ liệu người dùng cho trang hiện tại
    useEffect(() => {
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        setCurrentUsers(showUser.slice(indexOfFirstUser, indexOfLastUser));
    }, [showUser, currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const checkPassword = (password) => {
        if (password.length < 8) return false
        const hasNumber = /\d/; // Kiểm tra có ít nhất một chữ số
        const hasUpperCase = /[A-Z]/; // Kiểm tra có ít nhất một chữ cái viết hoa
        return hasNumber.test(password) && hasUpperCase.test(password);
    };
    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        if (!checkPassword(newAdmin.password)) {
            Swal.fire("Cảnh báo!", "Mật khẩu phải chứa ít nhất 8 ký tự và một số, chữ cái viết hoa.", "warning")
            return;
        }

        const response = await adminService.createAdmin(newAdmin)
        if (response.status === 201) {
            Swal.fire("Thành công!", "Tạo tài khoản quản trị thành công!", "success")
            fetchUsers()
            setNewAdmin({
                email: '',
                nickname: '',
                username: '',
                password: '',
                phone: ''
            })
            return;
        } else {
            Swal.fire("Thất bại!", "Vui lòng thử lại vào lần tới!", "error")
            return
        }
        // console.log(response)
        // console.log(JSON.stringify(newAdmin));
    }
    const handleInputChange = (e) => {
        setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
    }

    const handleLockAccount = async (userId) => {
        const response = await adminService.lockAccount(userId)
        // console.log("lock",response);

        if(response.status === 200){
            Swal.fire("Thành công!", "Khóa tài khoản thành công.","success")
            fetchUsers()
            return;
        }else{
            Swal.fire("Thất bại!","Khóa tài khoản thất bại","error")
            return;
        }
    };
    const handleUnLockAccount = async (userId) => {
        const response = await adminService.unLockAccount(userId)
        
        if(response.status === 200){
            Swal.fire("Thành công!", "Mở khóa tài khoản thành công.","success")
            fetchUsers()
            return;
        }else{
            Swal.fire("Thất bại!","Mở khóa tài khoản thất bại","error")
            return;
        }
    }

    // Export 
    const handleExportToExcel = () => {
        // Dữ liệu
        const data = showUser.map(user => ({
            'Tài khoản': user.username,
            'Họ Và Tên': user.nickname,
            'Đường dẫn khuôn mặt': user.avatar_path,
            'Email Quản trị viên': user.email
        }));

        // Define headers
        const headers = [
            'Tài khoản',
            'Họ Và Tên',
            'Đường dẫn khuôn mặt',
            'Email Quản trị viên'
        ];

        const ws = XLSX.utils.aoa_to_sheet([]);
        XLSX.utils.sheet_add_aoa(ws, [[`Danh Sách Quản trị viên xuất file ngày ${new Date().toLocaleDateString()}`]], { origin: 'A1' });
        XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A2' });
        XLSX.utils.sheet_add_json(ws, data, { origin: 'A3', skipHeader: true });

        const columnWidths = [
            { wch: 15 }, // MSQuản trị
            { wch: 30 }, // Họ Và Tên
            { wch: 50 }, // Đường dẫn khuôn mặt
            { wch: 30 } // Email
        ];
        ws['!cols'] = columnWidths;

        // Merge cells for title
        ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Danh Sách quản trị viên');

        const fileName = `DanhSachSinhVien_${new Date().toISOString().slice(0, 10)}.xlsx`;

        XLSX.writeFile(wb, fileName);
    };

    // View user
    const handleViewUser = (user) => {
        setViewUser(user)
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
                                    QUẢN LÝ QUẢN TRỊ VIÊN</h1>
                            </div>
                            <div className="col-sm-6 col-12 text-sm-end">
                                <div className="mx-n1">
                                    <a href="#" className="btn d-inline-flex btn-sm btn-primary mx-1" data-bs-toggle="modal" data-bs-target="#createAdmin">
                                        <span className=" pe-2">
                                            <i className="bi bi-plus"></i>
                                        </span>
                                        <span>Tạo người dùng</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main className="py-6 bg-surface-secondary">
                <div className="container">
                    <div className="card shadow border-1 mb-7">
                        <div className="card-header ">
                            <div className="row ">
                                <h5 className="mb-0">DANH SÁCH QUẢN TRỊ VIÊN</h5>
                            </div>

                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover table-nowrap">
                                <thead className="thead-light">
                                    <tr>
                                        {/* <th scope="col">Ảnh</th> */}
                                        <th scope="col">Mã người dùng</th>
                                        <th scope="col">Mã quản trị</th>
                                        <th scope="col">Họ Và Tên</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Số điện thoại</th>
                                        <th scope="col"> Tình trạng</th>
                                        <th scope="col">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((item, index) => (
                                        <tr key={index}>
                                            <td><b>{item.user_id}</b></td>
                                            <td><b>{item.username}</b></td>
                                            <td>{item.nickname}</td>
                                            <td>{item.email}</td>
                                            <td>+{item.phone}</td>
                                            {item.status === false ? (
                                                <td className='text-warning'>Đã khóa</td>

                                            ) : (<td className='text-success'>Hoạt động</td>
                                            )}
                                            <td><button type="button" className="btn btn-warning" onClick={() => handleViewUser(item)} data-bs-toggle="modal"
                                                data-bs-target="#viewUserModel">Xem</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer border-0 py-5">
                            <div className="row">
                                <div className="col-9">
                                    <span className="text-muted text-sm">
                                        Hiển thị {currentUsers.length} Quản trị viên trong số <b className="text-danger">{showUser.length}</b> Quản trị viên
                                    </span>
                                    <Pagination
                                        totalItems={showUser.length}
                                        itemsPerPage={usersPerPage}
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                                <div className="col-3 d-flex justify-content-end">
                                    <button
                                        className="btn btn-outline-success"
                                        onClick={handleExportToExcel}
                                    >
                                        <i className="bi bi-box-arrow-up-right"></i> Xuất file (excel)
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            <div className="modal fade" id="createAdmin" tabIndex="-1" aria-labelledby="createAdminLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h5 className="modal-title" id="createAdminLabel">Tạo quản trị</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body">
                            <form id="createAdminForm" onSubmit={handleCreateAdmin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={newAdmin.email} onChange={handleInputChange} required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nickname" className="form-label">Họ và tên</label>
                                    <input type="text" className="form-control" id="nickname" name="nickname" value={newAdmin.nickname} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" name="username" value={newAdmin.username} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                                    <input type="password" className="form-control" id="password" name="password" value={newAdmin.password} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Số điện thoại</label>
                                    <input type="text" className="form-control" id="phone" name="phone" value={newAdmin.phone} onChange={handleInputChange} required />
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Đóng</button>
                            <button type="submit" form="createAdminForm" className="btn btn-primary">Tạo</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade bd-example-modal-lg" id="viewUserModel" tabIndex="-1" aria-labelledby="viewUserModel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Thông tin Quản trị viên: {viewUser?.nickname}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row p-2 border border-bottom-3 ">
                                <div className="col-4">
                                    <img src={viewUser?.avatar_path} className="rounded" alt="Ảnh Quản trị viên.." />
                                </div>
                                <div className="col-8">
                                    <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded p-3">
                                        <h3 className="h2 text-black mb-0">{viewUser?.nickname}</h3>
                                        <span >Quản trị viên</span>
                                    </div>
                                    <hr />
                                    <h5 className="mb-2">Thông tin chi tiết:</h5>
                                    <ul className="list-unstyled mb-1-9 ms-3">
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">Tài khoản:</span> {viewUser?.username}</li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">Email:</span><a href={`mailto:${viewUser?.email}`}>{viewUser?.email}</a> </li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">Số điện thoại:</span>+{viewUser?.phone}</li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">Địa chỉ:</span> Phường Tân Phong, TP. Hồ Chí Minh, Việt Nam</li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Đóng</button>
                            {viewUser?.status === true ? (<button type="button" id="submitFileBtn" className="btn btn-danger" onClick={() => handleLockAccount(viewUser.user_id)}>Khóa tài khoản</button>
                            ) : (<button type="button" id="submitFileBtn" className="btn btn-success" onClick={() => handleUnLockAccount(viewUser.user_id)}>Mở tài khoản</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default React.memo(ManagerManagementContent);
