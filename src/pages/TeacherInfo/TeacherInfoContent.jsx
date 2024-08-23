import React from "react"

function TeacherInfoContent({ teacherData, facultyData }) {

    console.log("render fac", { teacherData, facultyData });
    return (
        <main className="py-6 bg-surface-secondary">
            <div className="container">
                <div className="row">
                    <div className="col-9">
                        <h3>Nhân sự khoa: <strong className="text-danger fw-normal">{facultyData?.faculty_name}</strong></h3>
                        <div className="row bg-primary p-2 text-white mt-2">
                            <div className="col-3">
                                <p className="fw-stalic text-center">Hỉnh ảnh</p>
                            </div>
                            <div className="col-9"><p className="fw-stalic">Thông tin</p></div>
                        </div>
                        {teacherData.map((teacher, index) => (
                            <div className="row m-1 border border-end-1 p-2" key={index}>
                                <div className="col-3 text-center">
                                    <img src={teacher.avatar_path ? teacher.avatar_path : 'http://bootdey.com/img/Content/avatar/avatar1.png'} alt="Ảnh giảng viên..." width={150} height={150} />
                                </div>
                                <div className="col-9">
                                    <span className="d-block"><strong>{teacher.nickname}</strong></span>
                                    <span>Mailto: <a href={`mailto:${teacher.email}`}>{teacher.email}</a></span>
                                </div>
                            </div>

                        ))}

                    </div>
                    <div className="col-3">
                        <h3 className="text-danger mb-2">GIỚI THIỆU</h3>
                        <img src="https://it.tdtu.edu.vn/sites/cntt/files/inline-images/L%E1%BB%8Bch%20s%E1%BB%AD%20h%C3%ACnh%20th%C3%A0nh.jpg" alt="" />
                        <a href="/news" target="_blank" type="button" className="btn btn-secondary-emphasis border border-dark mt-1 bi bi-arrow-bar-right w-100 text-start" rel="noopener noreferrer">Giới thiệu khoa</a>
                        <a href="/news" target="_blank" type="button" className="btn btn-secondary-emphasis border border-dark mt-1 bi bi-arrow-bar-right w-100 text-start" rel="noopener noreferrer">Ban chủ nhiệm khoa,bộ môn</a>
                        <a href="/news" target="_blank" type="button" className="btn btn-secondary-emphasis border border-dark mt-1 bi bi-arrow-bar-right w-100 text-start" rel="noopener noreferrer">Giảng viên, viên chức</a>
                        <a href="/news" target="_blank" type="button" className="btn btn-secondary-emphasis border border-dark mt-1 bi bi-arrow-bar-right w-100 text-start" rel="noopener noreferrer">Bộ môn: Kỹ Thuật phần mềm</a>
                        <a href="/news" target="_blank" type="button" className="btn btn-secondary-emphasis border border-dark mt-1 bi bi-arrow-bar-right w-100 text-start" rel="noopener noreferrer">Bộ môn: Mạng máy tính</a>
                        <a href="/news" target="_blank" type="button" className="btn btn-secondary-emphasis border border-dark mt-1 bi bi-arrow-bar-right w-100 text-start" rel="noopener noreferrer">Bộ môn: Hệ thống thông tin</a>
                        <a href="/"type="button" className="btn btn-danger border border-dark mt-1 bi bi-house w-100 text-center">Trở về trang chủ</a>
                        
                    </div>
                </div>
            </div>
        </main >
    )
}
export default React.memo(TeacherInfoContent)