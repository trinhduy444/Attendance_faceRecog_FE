import React, {  useState } from "react"

function FilterNotification({ notifications, onFilter }) {
    const [searchTitle, setSearchTitle] = useState('');
    const [searchCreator, setSearchCreator] = useState('');
    const [filterOption, setFilterOption] = useState("none");
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleSelectChange = (e) => {
        setFilterOption(e.target.value);
    };

    const handleClearFilters = () => {
        setSearchTitle('');
        setSearchCreator('');
        setFilterOption("none");
        setFromDate('');
        setToDate('');
    };

    const handleFilter = (e) => {
        e.preventDefault();
        const savedNotifications = JSON.parse(localStorage.getItem('notificationSaved')) || [];

        const filteredData = notifications.filter(notification => {
            const titleMatch = notification.title.toLowerCase().includes(searchTitle.toLowerCase());
            const creatorMatch = searchCreator ? notification.nickname.toLowerCase().includes(searchCreator.toLowerCase()) : true;
            const typeMatch = filterOption === "1"
                ? notification.creater_id === 1
                : filterOption === "2"
                    ? notification.creater_id !== 1
                    : filterOption === "3"
                        ? savedNotifications.includes(notification.notify_id)
                        : true;
            const fromDateMatch = fromDate ? new Date(notification.create_time) >= new Date(fromDate) : true;
            const toDateMatch = toDate ? new Date(notification.create_time) <= new Date(toDate) : true;

            return titleMatch && creatorMatch && typeMatch && fromDateMatch && toDateMatch;
        });

        onFilter(filteredData);
    };

    return (
        <form onSubmit={handleFilter}>
            <div className="row mb-2">
                <div className="col-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm theo tiêu đề..."
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />
                </div>
                <div className="col-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm theo tên người thông báo..."
                        value={searchCreator}
                        onChange={(e) => setSearchCreator(e.target.value)}
                    />
                </div>
                <div className="col-2">
                    <button type="button" className="btn btn-outline-danger" onClick={handleClearFilters}>
                        <i className="bi bi-x-lg"></i> Xóa
                    </button>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-4">
                    <select className="form-select" aria-label="Default select example" value={filterOption} onChange={handleSelectChange}>
                        <option value="none">Chọn loại thông báo</option>
                        <option value="1">Thông báo từ quản trị</option>
                        <option value="2">Thông báo từ giảng viên</option>
                        <option value="3">Thông báo đã lưu</option>

                    </select>
                </div>
                <div className="col-3">
                    <div className="d-flex justify-content-evenly">
                        <label htmlFor="" className="mt-2">Từ: </label>
                        <input
                            className="form-control"
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-3">
                    <div className="d-flex justify-content-evenly">
                        <label htmlFor="" className="mt-2">Đến: </label>
                        <input
                            className="form-control"
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-2">
                    <button className="btn btn-outline-primary" type="submit">
                        <i className="bi bi-search"></i> Tìm kiếm
                    </button>
                </div>
            </div>
        </form>
    );
}

export default React.memo(FilterNotification)