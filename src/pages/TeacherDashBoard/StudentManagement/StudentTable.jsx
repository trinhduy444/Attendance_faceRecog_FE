import React, { useEffect, useState } from "react"
import * as XLSX from "xlsx"
import ReactQuill from 'react-quill';
import { sortArray } from "../../../utils/sortArray";
import Pagination from "../../AdminDashBoard/UserManagement/Pagination";
import Swal from "sweetalert2";
import { teacherService } from "../../../services/teacherService";
import Chart2 from "../Chart/Chart2";
import AttendanceChart from "../Chart/AttendanceChart";
function StudentTable({ studentsData, courseName }) {
    const [currentUsers, setCurrentUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [mailContent, setMailContent] = useState({
        studentGroup: "all",
        title: "",
        content: "",
    });
    const [chartData, setChartData] = useState({
        banData: [],
        genderData: []
    })
    const usersPerPage = 10;
    // console.log("cn", courseName)
    // console.log(studentsData);
    const calculateBanAndNormalStudents = (studentsData) => {
        const banCount = studentsData.filter(student => student.ban_yn === true).length;
        const normalCount = studentsData.filter(student => student.ban_yn === false).length;
        const maleCount = studentsData.filter(student => student.gender === true).length;
        const femaleCount = studentsData.filter(student => student.gender === false).length;
        const banData = [
            { name: 'ban', value: banCount },
            { name: 'normal', value: normalCount },
        ];

        const genderData = [
            { name: 'male', value: maleCount },
            { name: 'female', value: femaleCount },
        ];
        setChartData({
            banData: banData,
            genderData: genderData
        });
    };
    //Sort
    const [lastSortedColumn, setLastSortedColumn] = useState({ key: '', ascending: true });

    //Search
    const [searchQuery, setSearchQuery] = useState('');
    const [filterBanYn, setFilterBanYn] = useState('all');

    useEffect(() => {
        // Tính toán các chỉ số của trang hiện tại
        calculateBanAndNormalStudents(studentsData)
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;

        // Lọc dữ liệu dựa trên tìm kiếm và lựa chọn dropdown
        let filteredUsers = studentsData.filter((student) => {
            const matchesSearchQuery = student.username.includes(searchQuery) || student.nickname.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilterBanYn =
                filterBanYn === 'all' ||
                (filterBanYn === 'banned' && student.ban_yn === true) ||
                (filterBanYn === 'normal' && student.ban_yn === false);
            return matchesSearchQuery && matchesFilterBanYn;
        });

        setCurrentUsers(filteredUsers.slice(indexOfFirstUser, indexOfLastUser));
    }, [studentsData, currentPage, searchQuery, filterBanYn]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterBanYn(e.target.value);
    };

    // Sort
    const handleSortUser = function (key) {
        const ascending = lastSortedColumn.key === key ? !lastSortedColumn.ascending : true;
        const sortedUsers = sortArray([...currentUsers], key, ascending);
        setCurrentUsers(sortedUsers);
        setCurrentPage(1);
        setLastSortedColumn({ key, ascending });
    }

    const getSortIcon = (key) => {
        if (lastSortedColumn.key !== key) return null;
        return lastSortedColumn.ascending ? '▲' : '▼';
    };
    // Export excel
    const handleExportToExcel = () => {
        // Dữ liệu
        const data = studentsData.map(user => ({
            'MSSV': user.username,
            'Họ Và Tên': user.nickname,
            'Giới tính': user.gender ? 'Nam' : 'Nữ',
            'Khoa': user.faculty_name,
            'Email Sinh Viên': user.email,
            'Số buổi vắng': user.total_absent,
            'Tình Trạng': user.ban_yn ? "Cấm thi" : "Bình Thường"
        }));

        // Define headers
        const headers = [
            'MSSV',
            'Họ Và Tên',
            'Giới tính',
            'Khoa',
            'Email Sinh Viên',
            'Số buổi vắng',
            'Tình Trạng'
        ];

        const ws = XLSX.utils.aoa_to_sheet([]);
        XLSX.utils.sheet_add_aoa(ws, [[`Danh Sách Sinh Viên xuất file ngày ${new Date().toLocaleDateString()}, Môn: ${courseName?.name}, Nhóm: ${courseName?.group}`]], { origin: 'A1' });
        XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A2' });
        XLSX.utils.sheet_add_json(ws, data, { origin: 'A3', skipHeader: true });

        const columnWidths = [
            { wch: 15 }, // MSSV
            { wch: 30 }, // Họ Và Tên
            { wch: 10 }, // Giới tính
            { wch: 30 }, // Khoa
            { wch: 30 }, // Email
            { wch: 15 }, // Số buổi vắng
            { wch: 20 }, // Tình Trạng
        ];
        ws['!cols'] = columnWidths;

        // Merge cells for title
        ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Danh Sách Sinh Viên');

        const fileName = `DanhSachSinhVien_${new Date().toISOString().slice(0, 10)}.xlsx`;

        XLSX.writeFile(wb, fileName);
    };

    // SendMail
    const handleSendMail = async () => {
        if (mailContent.title === "" || mailContent.content === "") {
            Swal.fire("Cảnh báo!", "Vui lòng nhập tiêu đề và nội dung cho email!", "warning");
            return;
        }
        Swal.fire({
            title: 'Đang gửi email...',
            text: 'Vui lòng đợi trong giây lát.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const response = await teacherService.sendMail(courseName.course_group_id, mailContent);

            Swal.close();

            if (response.status === 201) {
                Swal.fire("Thành công!", "Gửi email tới sinh viên thành công.", "success");
                setMailContent({
                    studentGroup: "all",
                    title: "",
                    content: "",
                })

            } else {
                Swal.fire("Thất bại!", "Gửi email tới sinh viên thất bại.", "error");
            }
        } catch (error) {
            Swal.close();
            Swal.fire("Lỗi!", "Đã xảy ra lỗi khi gửi email.", "error");
        }
    }

    // Data mail before sending
    const handleChangeMailData = (e) => {
        const { name, value } = e.target;
        setMailContent({ ...mailContent, [name]: value });
    };

    const handleQuillChange = (content) => {
        setMailContent({ ...mailContent, content });
    };

    function handleCloseMail() {
        setMailContent({
            studentGroup: "all",
            title: "",
            content: "",
        })
    }
    return (
        <div className="row mt-2">
            <div className="card shadow border-1 mb-7">
                <div className="card-header ">
                    <div className="row">
                        <div className="col-6">
                            <h5 className="mb-0">DANH SÁCH SINH VIÊN</h5>
                        </div>
                        <div className="col-3">
                            <div className="input-group">
                                <input
                                    type="search"
                                    className="form-control rounded"
                                    placeholder="Nhập tên hoặc MSSV"
                                    aria-label="Search"
                                    aria-describedby="search-addon"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                        <div className="col-3">
                            <select
                                id="ban_yn"
                                name="ban_yn"
                                className="form-select"
                                value={filterBanYn}
                                onChange={handleFilterChange}
                            >
                                <option value="all">Tất cả sinh viên trong nhóm</option>
                                <option value="banned">Tất cả sinh viên bị cấm thi</option>
                                <option value="normal">Tất cả sinh viên bình thường</option>
                            </select>
                        </div>

                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr >
                                <th scope="col" className='fw-bold'>MSSV</th>
                                <th scope="col" className='fw-bold'>Họ và tên</th>
                                <th scope="col" className='fw-bold' onClick={() => handleSortUser('gender')}>Giới tính {getSortIcon('gender')}</th>
                                <th scope="col" className='fw-bold' onClick={() => handleSortUser('total_absent')}>Số buổi vắng {getSortIcon('total_absent')}</th>
                                <th scope="col" className='fw-bold'>Tình trạng</th>

                            </tr>
                        </thead>
                        <tbody className='overflow-auto'>
                            {currentUsers.map((student, index) => (
                                <tr key={index} className='tr-data'>
                                    <td>{student.username}</td>
                                    <td>{student.nickname}</td>
                                    <td>{student.gender === true ? 'Nam' : 'Nữ'}</td>
                                    <td>{student.total_absent}</td>
                                    {student.ban_yn === false ? (
                                        <td className="text-success">Bình thường</td>

                                    ) : (<td className="text-danger">Cấm thi</td>
                                    )}

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="card-footer border-0 py-5">
                        <div className="row">
                            <div className="col-6">
                                <span className="text-muted text-sm">
                                    Hiển thị {currentUsers.length} sinh viên trong số <b className="text-danger">{studentsData.length}</b> sinh viên
                                </span>
                                <Pagination
                                    totalItems={studentsData.length}
                                    itemsPerPage={usersPerPage}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                            <div className="col-2 d-flex justify-content-end">

                                <button
                                    className="btn btn-outline-success"
                                    onClick={handleExportToExcel}
                                >
                                    <i className="bi bi-box-arrow-up-right"></i> Xuất file (excel)
                                </button>
                            </div>
                            <div className="col-2 d-flex justify-content-end">

                                <button
                                    type="button"
                                    className="btn btn-outline-info"
                                    data-bs-toggle="modal"
                                    data-bs-target="#statistical"
                                >
                                    <i className="bi bi-bar-chart"></i> Thống kê
                                </button>
                            </div>
                            <div className="col-2 d-flex justify-content-end">

                                <button
                                    type="button"
                                    className="btn btn-outline-warning"
                                    data-bs-toggle="modal"
                                    data-bs-target="#sendMail"
                                >
                                    <i className="bi bi-envelope"></i> Gửi mail
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="modal fade" id="statistical" tabIndex="-1"
                aria-labelledby="statistical" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="statistical">Thống kê  </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row text-center">
                                <div className="col-6">
                                    <Chart2 data={chartData?.banData} type="pie" />
                                    <h4>Biểu đồ Pie Chart thể hiện tình trạng sinh viên trong lớp</h4>
                                </div>
                                <div className="col-6">
                                    <Chart2 data={chartData?.banData} type="bar" />
                                    <h4>Biểu đồ Bar Chart thể hiện tình trạng sinh viên trong lớp</h4>
                                </div>
                            </div>

                            <div className="row text-center mt-2">
                                <div className="col-6">
                                    <Chart2 data={chartData?.genderData} type="pie" />
                                    <h4>Biểu đồ Pie Chart thể hiện giới tính sinh viên trong lớp</h4>
                                </div>
                                <div className="col-6">
                                    <Chart2 data={chartData?.genderData} type="bar" />
                                    <h4>Biểu đồ Bar Chart thể hiện giới tính sinh viên trong lớp</h4>
                                </div>
                            </div>

                            {/* <Chart2 data={heatmapData} type="heatmap" /> */}

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Đóng</button>

                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade bd-example-modal-lg" id="sendMail" tabIndex="-1" aria-labelledby="sendMail" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Gửi mail cho sinh viên</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="studentGroup" className="form-label">Chọn nhóm sinh viên:</label>
                                <select
                                    id="studentGroup"
                                    name="studentGroup"
                                    className="form-select"
                                    value={mailContent.studentGroup}
                                    onChange={handleChangeMailData}
                                >
                                    <option value="all">Tất cả sinh viên trong nhóm</option>
                                    <option value="banned">Tất cả sinh viên bị cấm thi</option>
                                    <option value="normal">Tất cả sinh viên bình thường</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Nhập tiêu đề:</label>
                                <input type="text" className="form-control" value={mailContent.title} name="title" id="title" placeholder="Nhập tiêu đề..." onChange={handleChangeMailData} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="content" className="form-label">Nhập nội dung:</label>

                                <ReactQuill
                                    placeholder='Nhập nội dung..'
                                    name="content"
                                    value={mailContent.content}
                                    onChange={handleQuillChange}
                                    modules={{
                                        toolbar: [
                                            [{ 'font': [] }],
                                            [{ 'header': [3, 4, false] }],
                                            ['bold', 'italic', 'underline'],
                                            [{ 'align': [] }],
                                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                            ['clean']
                                        ]
                                    }}
                                />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseMail}>Đóng</button>
                            <button type="button" id="submitFileBtn" className="btn btn-warning" onClick={handleSendMail}>Gửi</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default React.memo(StudentTable);
