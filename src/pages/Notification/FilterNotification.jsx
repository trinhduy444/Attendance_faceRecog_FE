import React, { useEffect, useState } from "react"

function FilterNotification({ notifications, onFilter }) {
    const [searchTitle, setSearchTitle] = useState('')

    const handleFilter = (e) => {
        e.preventDefault();
        console.log('Search Title:', searchTitle); // Debug: Check if searchTitle is updated
        const filteredData = notifications.filter(notification =>
            `${notification.title}`.toLowerCase().includes(searchTitle.toLowerCase())
        );
        console.log('Filtered Data:', filteredData);
        onFilter(filteredData);
    };
    return (
        <form onSubmit={handleFilter}>
            <div className="row mb-2">
                <div className="col-6">
                    <input
                        type="text"
                        className="form-control"
                        id="datatable-search-input"
                        placeholder="Tìm kiếm theo tiêu đề..."
                        value={searchTitle}
                        onChange={(e) =>
                            setSearchTitle(e.target.value)
                        }
                    />
                </div>
                <div className="col-4">
                    <input type="search" className="form-control" id="datatable-search-input"
                        placeholder="Tìm kiếm theo tên người thông báo..." />
                </div>
                <div className="col-2">
                    <button className="btn btn-outline-danger"> <i className="bi bi-x-lg"></i>
                        Xóa</button>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-4">
                    <select className="form-select" aria-label="Default select example">
                        <option defaultValue={"none"}>Chọn loại thông báo</option>
                        <option value="1">Thông báo đã lưu</option>
                        <option value="2">Thông báo từ quản trị</option>
                        <option value="3">Thông báo từ giảng viên</option>
                    </select>
                </div>
                <div className="col-3">
                    <div className="d-flex justify-content-evenly">
                        <label htmlFor="" className="mt-2">Từ: </label>
                        <input className="form-control" type="date" placeholder="Đến ngày" />
                    </div>
                </div>

                <div className="col-3">
                    <div className="d-flex justify-content-evenly">
                        <label htmlFor="" className="mt-2">Đến: </label>
                        <input className="form-control" type="date" placeholder="Đến ngày" />
                    </div>
                </div>

                <div className="col-2">
                    <button className="btn btn-outline-primary" type="submit" >
                        <i className="bi bi-search"></i> Tìm kiếm
                    </button>
                </div>
            </div>
        </form>
    );
}
export default React.memo(FilterNotification)