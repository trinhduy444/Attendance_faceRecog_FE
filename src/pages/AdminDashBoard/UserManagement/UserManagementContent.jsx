import React, { useEffect, useState } from "react"
import * as XLSX from "xlsx"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { adminService } from "../../../services/adminService";
import { sortArray } from "../../../utils/sortArray"
import Pagination from './Pagination'
import '../../../assets/css/adminDashboard.css'
// import MyErrorBoundary from "../../Error/ErrorFallback";
import NavBarToggle from "../../../components/NavBarToggle";
function UserManagementContent({ toggleNavBar }) {
    const navigate = useNavigate()
    
    // Declare array to show
    const [showUser, setShowUser] = useState([]);
    // Declare pagination and sort arrays
    const [currentPage, setCurrentPage] = useState(1);
    const [currentUsers, setCurrentUsers] = useState([]);
    const [lastSortedColumn, setLastSortedColumn] = useState({ key: '', ascending: true });
    const usersPerPage = 10;

    // Declare fetch by filtering
    const [facultyId, setFacultyId] = useState("");
    const [inputFilter, setInputFilter] = useState("");
    const [genderFilter, setGenderFilter] = useState(undefined);

    // View User
    const [viewUser, setViewUser] = useState(null);
    // Fetch all users
    const fetchUsers = async () => {
        const response = await adminService.getAllUsers();
        if (response.status === 200) {
            setShowUser(response.data.metadata);
        }

    }
    useEffect(() => {
        fetchUsers();
    }, [])

    // Fetch all users have filters
    const handleFetchUserFilter = async () => {

        let type = isNaN(inputFilter.charAt(0)) ? 0 : 1;
        if (genderFilter !== undefined) {
            setGenderFilter(parseInt(genderFilter))

        }
        const requestBody = {
            faculty_id: facultyId,
            inputFilter: inputFilter,
            type: type,
            genderFilter: genderFilter
        };
        const response = await adminService.getAllUsersDetail(requestBody);
        if (response.status === 200) {
            setShowUser(response.data.metadata);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleFetchUserFilter();
        }
    };
    // Tính toán dữ liệu người dùng cho trang hiện tại
    useEffect(() => {
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        setCurrentUsers(showUser.slice(indexOfFirstUser, indexOfLastUser));
    }, [showUser, currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    // Sort
    const handleSortUser = function (key) {
        const ascending = lastSortedColumn.key === key ? !lastSortedColumn.ascending : true;
        const sortedUsers = sortArray([...showUser], key, ascending);
        setShowUser(sortedUsers);
        setCurrentPage(1);
        setLastSortedColumn({ key, ascending });
    }

    const getSortIcon = (key) => {
        if (lastSortedColumn.key !== key) return null;
        return lastSortedColumn.ascending ? '▲' : '▼';
    };
    // Fetch create users
    const handleFectchCreateUserAPI = async (data) => {
        try {
            const response = await adminService.createUsers(data);
            if (response.status === 201) {
                Swal.fire('Thêm thành công', `Đã thêm ${data.length} users`, 'success');

                fetchUsers();
                return
            } else {
                Swal.fire('Có lỗi xảy ra', 'Vui lòng thử lại', 'error');
            }
        } catch (error) {
            console.error('Error adding users:', error);
            Swal.fire('Lỗi', 'Không thể thêm users. Vui lòng thử lại sau.', 'error');
        }
    }

    // Thao tác upload

    const handleFileUploadUser = async (e) => {
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
                    title: `Bạn có chắc thêm ${data.length} người dùng?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        Swal.fire('Đã xác nhận dữ liệu', 'Đang tiến hành thêm users...', 'info');
                        handleFectchCreateUserAPI(data);
                    }
                });
            };
            reader.readAsBinaryString(file);
        }
    };

    const handleUploadImageUsers = async (event) => {
        const files = event.target.files;
        if (files.length === 0) return;

        const formData = new FormData();
        if (files) {
            Array.from(files).forEach(file => formData.append('images', file));
            try {
                const result = await Swal.fire({
                    title: 'Bạn có chắc chắn?',
                    text: `Bạn muốn tải lên ${files.length} ảnh?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Có, tải lên!',
                    cancelButtonText: 'Không, hủy!',
                    showLoaderOnConfirm: true,
                    preConfirm: async () => {
                        try {
                            const response = await adminService.uploadImages(formData);
                            if (response.status === 201) {
                                Swal.fire('Thành công', `Đã tải lên ${files.length} ảnh`, 'success');
                            } else {
                                Swal.fire('Có lỗi xảy ra', 'Vui lòng thử lại', 'error');
                            }
                        } catch (error) {
                            console.error('Error uploading images:', error);
                            Swal.fire('Lỗi', 'Không thể tải ảnh lên. Vui lòng thử lại sau.', 'error');
                        }
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                });

            } catch (error) {
                navigate("/error",{
                    state: { status: error.reponse?.status || 500, message: 'Error uploading image' }
                })
            }
        }
    };

    // Export 
    const handleExportToExcel = () => {
        // Dữ liệu
        const data = showUser.map(user => ({
            'MSSV': user.username,
            'Họ Và Tên': user.nickname,
            'Đường dẫn khuôn mặt': user.avatar_path,
            'Khóa nhập học': user.course_year,
            'Giới tính': user.gender ? 'Nam' : 'Nữ',
            'Khoa': user.faculty_name,
            'Email Sinh Viên': user.email
        }));

        // Define headers
        const headers = [
            'MSSV',
            'Họ Và Tên',
            'Đường dẫn khuôn mặt',
            'Khóa nhập học',
            'Giới tính',
            'Khoa',
            'Email Sinh Viên'
        ];

        const ws = XLSX.utils.aoa_to_sheet([]);
        XLSX.utils.sheet_add_aoa(ws, [[`Danh Sách Sinh Viên xuất file ngày ${new Date().toLocaleDateString()}`]], { origin: 'A1' });
        XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A2' });
        XLSX.utils.sheet_add_json(ws, data, { origin: 'A3', skipHeader: true });

        const columnWidths = [
            { wch: 15 }, // MSSV
            { wch: 30 }, // Họ Và Tên
            { wch: 50 }, // Đường dẫn khuôn mặt
            { wch: 15 }, // Khóa nhập học
            { wch: 10 }, // Giới tính
            { wch: 30 }, // Khoa
            { wch: 30 } // Email
        ];
        ws['!cols'] = columnWidths;

        // Merge cells for title
        ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Danh Sách Sinh Viên');

        const fileName = `DanhSachSinhVien_${new Date().toISOString().slice(0, 10)}.xlsx`;

        XLSX.writeFile(wb, fileName);
    };

    // View user
    const handleViewUser = (user) => {
        setViewUser(user)
    }

    const handleLockAccount = async (userId) => {
        const result = await Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: "Bạn có muốn khóa tài khoản này không?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý, khóa!',
            cancelButtonText: 'Hủy',
        });

        if (result.isConfirmed) {
            const response = await adminService.lockUserAccount(userId, 3);
            if (response.status === 200) {
                Swal.fire("Thành công!", "Khóa tài khoản thành công.", "success");
                setViewUser(prevUser => ({
                    ...prevUser,
                    status: false,
                }));
                fetchUsers();
            } else {
                Swal.fire("Thất bại!", "Khóa tài khoản thất bại", "error");
            }
        }
    };

    const handleUnLockAccount = async (userId) => {
        const result = await Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: "Bạn có muốn mở khóa tài khoản này không?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý, mở khóa!',
            cancelButtonText: 'Hủy',
        });

        if (result.isConfirmed) {
            const response = await adminService.unLockUserAccount(userId, 3);
            if (response.status === 200) {
                Swal.fire("Thành công!", "Mở khóa tài khoản thành công.", "success");
                setViewUser(prevUser => ({
                    ...prevUser,
                    status: true,
                }));
                fetchUsers();
            } else {
                Swal.fire("Thất bại!", "Mở khóa tài khoản thất bại", "error");
            }
        }
    };


    return (

        <div className="h-screen flex-grow-1 overflow-y-lg-auto">

            <header className="bg-surface-primary border-bottom pt-3 pb-3">
                <div className="container">
                    <div className="mb-npx">
                        <div className="row align-items-center">
                            <div className="col-sm-6 col-12 mb-4 mb-sm-0">

                                <h1 className="h2 mb-0 ls-tight">
                                    <NavBarToggle toggleNavBar={toggleNavBar} />
                                    QUẢN LÝ SINH VIÊN</h1>
                            </div>
                            <div className="col-sm-6 col-12 text-sm-end">
                                <div className="mx-n1">
                                    <a href="#" className="btn d-inline-flex btn-sm btn-neutral border-base mx-1">
                                        <span className=" pe-2">
                                            <i className="bi bi-pencil"></i>
                                        </span>
                                        <span>Edit</span>
                                    </a>
                                    <a href="#" className="btn d-inline-flex btn-sm btn-primary mx-1">
                                        <span className=" pe-2">
                                            <i className="bi bi-plus"></i>
                                        </span>
                                        <span>Tạo sinh viên</span>
                                    </a>
                                    <button type="button" data-bs-toggle="modal"
                                        data-bs-target="#importUserFile" className="btn d-inline-flex btn-sm btn-warning mx-1">
                                        <span className="pe-2">
                                            <i className="bi bi-plus"></i>
                                        </span>
                                        <span>Tạo nhiều sinh viên</span>
                                    </button>


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
                                <div className="col-3"> <h5 className="mb-0">DANH SÁCH SINH VIÊN</h5></div>
                                <div className="col-3 border border-dark rounded p-0">
                                    <select
                                        className="form-select"
                                        aria-label="Select Faculty"
                                        onChange={(e) => setFacultyId(e.target.value)}
                                    >
                                        <option value="">Chọn Khoa(nếu có)</option>
                                        <option value="10010">Công Nghệ Thông Tin</option>
                                        <option value="10011">Quản Trị Kinh Doanh</option>
                                        <option value="10012">Điện - Điện tử</option>
                                        <option value="10013">Kế Toán</option>
                                        <option value="10014">Luật</option>
                                        <option value="10015">Thiết kế đồ họa</option>
                                    </select>
                                </div>
                                <div className="col-2 border border-dark rounded p-0">
                                    <select
                                        className="form-select"
                                        aria-label="Select Gender"
                                        onChange={(e) => setGenderFilter(e.target.value)}
                                    >
                                        <option value="">Chọn giới tính</option>
                                        <option value="1">Nam</option>
                                        <option value="0">Nữ</option>
                                    </select>
                                </div>
                                <div className="col-4">
                                    <div className="input-group">
                                        <input
                                            type="search"
                                            className="form-control rounded"
                                            placeholder="Nhập tên hoặc MSSV"
                                            aria-label="Search"
                                            aria-describedby="search-addon"
                                            onChange={(e) => setInputFilter(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                            onClick={handleFetchUserFilter}
                                        >
                                            Tìm kiếm
                                        </button>
                                    </div>
                                </div>


                            </div>

                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover table-nowrap">
                                <thead className="thead-light">
                                    <tr>
                                        {/* <th scope="col">Ảnh</th> */}
                                        <th scope="col">MSSV</th>
                                        <th scope="col">Họ Và Tên</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Số điện thoại</th>
                                        <th scope="col" onClick={() => handleSortUser('faculty_name')}>Khoa {getSortIcon('faculty_name')}</th>
                                        <th scope="col" onClick={() => handleSortUser('course_year')}>
                                            Khóa {getSortIcon('course_year')}
                                        </th>
                                        <th scope="col" onClick={() => handleSortUser('gender')}>
                                            Giới tính {getSortIcon('gender')}</th>
                                        <th scope="col" onClick={() => handleSortUser('status')}>
                                            Trạng thái {getSortIcon('status')}</th>


                                        <th scope="col">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((item, index) => (
                                        <tr key={index}>
                                            <td><b>{item.username}</b></td>
                                            <td>{item.nickname}</td>
                                            <td>{item.email}</td>
                                            <td>+{item.phone}</td>
                                            <td>{item.faculty_name}</td>
                                            <td>{item.course_year}</td>
                                            <td>{item.gender ? "Nam" : "Nữ"}</td>
                                            <td className={item.status ? "text-success" : "text-danger"}>{item.status ? "Hoạt động" : "Đã Khóa"}</td>

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
                                        Hiển thị {currentUsers.length} sinh viên trong số <b className="text-danger">{showUser.length}</b> sinh viên
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
            <div className="modal" id="importUserFile" tabIndex="-1" aria-labelledby="importUserFile" aria-hidden="true">
                <div className="modal-dialog model-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Thêm người dùng</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="userFile">Nhập file người dùng(.xlsx hoặc .xls)</label>
                                <input className="btn d-inline-flex btn-sm btn-success mx-1" type="file" id="userFile" accept=".xlsx, .xls" onChange={handleFileUploadUser} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="userImages">Nhập ảnh người dùng(.png hoặc .jpg)</label>
                                <input className="btn d-inline-flex btn-sm btn-warning mx-1" type="file" id="userImages" accept=".png, .jpg" onChange={handleUploadImageUsers} multiple />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" id="submitFileBtn" className="btn btn-warning">Nhập</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade bd-example-modal-lg" id="viewUserModel" tabIndex="-1" aria-labelledby="viewUserModel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Thông tin sinh viên: {viewUser?.nickname}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row p-2 border border-bottom-3 ">
                                <div className="col-4">
                                    <img src={viewUser?.avatar_path} className="rounded" alt="Ảnh Sinh viên.." />
                                </div>
                                <div className="col-8">
                                    <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded p-3">
                                        <h3 className="h2 text-black mb-0">{viewUser?.nickname}</h3>
                                        <span >Sinh viên khoa: <b className="text-danger">{viewUser?.faculty_name} | {viewUser?.course_year}</b></span>
                                    </div>
                                    <hr />
                                    <h5 className="mb-2">Thông tin chi tiết:</h5>
                                    <ul className="list-unstyled mb-1-9 ms-3">
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">MSSV:</span> {viewUser?.username}</li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">Giới tính:</span>{viewUser?.gender ? 'Nam' : 'Nữ'}</li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">Trạng thái tài khoản:</span>{viewUser?.status ? 'Bình thường' : 'Đã bị khóa'}</li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">Email:</span><a href={`mailto:${viewUser?.email}`}>{viewUser?.email}</a> </li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">Số điện thoại:</span>+{viewUser?.phone}</li>
                                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 me-2 fw-bolder">Địa chỉ:</span> Phường Tân Phong, TP. Hồ Chí Minh, Việt Nam</li>

                                    </ul>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>

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
export default React.memo(UserManagementContent);
