import React from 'react';
import { useLocation } from 'react-router-dom';
import sclogo from "../assets/images/sclogo.jpg"

const headerLinks = {
    '/': {
        title: 'Trang chủ',
        links: [
            { path: '/', label: 'Trang chủ', icon: 'bi bi-house' }
        ]
    },
    '/notification': {
        title: 'THÔNG BÁO',
        links: [
            { path: '/', label: 'Trang chủ', icon: 'bi bi-house' },
            { path: '/notification', label: 'Thông báo', icon: 'bi bi-bell' }
        ]
    },
    '/classroom': {
        title: 'Phòng học',
        links: [
            { path: '/', label: 'Trang chủ', icon: 'bi bi-house' },
            { path: '/classroom', label: 'Phòng học', icon: 'bi bi-people' }
        ]
    },
    '/classroom/detail': {
        title: 'Chi tiết phòng học',
        links: [
            { path: '/', label: 'Trang chủ', icon: 'bi bi-house' },
            { path: '/classroom', label: 'Phòng học', icon: 'bi bi-people' },
            { path: '/classroom/detail', label: 'Chi tiết phòng học', icon: 'bi bi-info' }
        ]
    },
    '/schedule': {
        title: 'Thời khóa biểu',
        links: [
            { path: '/', label: 'Trang chủ', icon: 'bi bi-house' },
            { path: '/schedule', label: 'Thời khóa biểu', icon: 'bi bi-calendar2-week' },
        ]
    },
    '/attendance': {
        title: 'Dữ liệu điiểm danh',
        links: [
            { path: '/', label: 'Trang chủ', icon: 'bi bi-house' },
            { path: '/attendance', label: 'Dữ liệu điểm danh', icon: 'bi bi-clipboard-data' },
        ]
    },
    '/attendance/detail': {
        title: 'Chi tiết dữ liệu điểm danh',
        links: [
            { path: '/', label: 'Trang chủ', icon: 'bi bi-house' },
            { path: '/attendance', label: 'Dữ liệu điểm danh', icon: 'bi bi-clipboard-data' },
            { path: '/attendance/detail', label: 'Chi tiết điểm danh', icon: 'bi bi-info' },

        ]
    },
};


function Header() {
    const location = useLocation();

    const currentHeader = headerLinks[location.pathname] || { title: '', links: [] };
    const { title, links } = currentHeader;


    return (
        <header className="bg-surface-primary border-bottom pt-3">
            <div className="container">
                <div className="mb-npx">
                    <div className="row align-items-center">
                        <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                            <h1 className="h2 mb-0 ls-tight">
                                <img src={sclogo} width="40" className="rounded-circle" /> {title}
                            </h1>
                        </div>
                    </div>
                    <ul className="nav nav-tabs overflow-x border-0">
                        {links.map(link => (
                            <li className="nav-item" key={link.path}>
                                <a href={link.path} className={`nav-link font-regular ${location.pathname === link.path ? 'active' : ''}`}>
                                    <i className={link.icon}></i> {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default React.memo(Header);

