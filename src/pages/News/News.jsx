import React, { useEffect } from "react"

import sclogo from "../../assets/images/sclogo.jpg"
import { Container, Row, Col, Card } from 'react-bootstrap';

export const News = () => {
    useEffect(() => {
        document.title = "Tin tức"
    }, []);

    const newsItems = [
        {
            title: 'Chương Trình Học Bổng Mới Tại Trường ABC',
            image: 'https://tdtu.edu.vn/sites/www/files/articles/2024/Aug/tan-sv-k28/1.JPG',
            description: 'Trường ABC vừa công bố một chương trình học bổng mới dành cho sinh viên năm nhất. Chương trình này sẽ giúp các sinh viên có cơ hội học tập tốt hơn mà không phải lo lắng về vấn đề tài chính.'
        },
        {
            title: 'Sự Kiện Ngày Hội Tuyển Sinh 2024',
            image: 'https://tdtu.edu.vn/sites/www/files/articles/2024/Aug/tan-sv-k28/3.jpg',
            description: 'Ngày hội tuyển sinh 2024 sẽ được tổ chức vào cuối tuần này tại trường. Đây là cơ hội tuyệt vời để các học sinh tiềm năng gặp gỡ các giảng viên và tìm hiểu thêm về các chương trình học của trường.'
        },
        {
            title: 'Khóa Học Mới Về Công Nghệ Thông Tin',
            image: 'https://tdtu.edu.vn/sites/www/files/TheX/Nganh/Ky-thuat-phan-mem.jpg',
            description: 'Trường ABC sẽ khai giảng một khóa học mới về Công Nghệ Thông Tin. Khóa học này sẽ cung cấp các kiến thức và kỹ năng cần thiết để các sinh viên có thể theo đuổi sự nghiệp trong ngành công nghệ.'
        },
        {
            title: 'Tọa Đàm Về Nghề Nghiệp Tương Lai',
            image: 'https://tdtu.edu.vn/sites/www/files/articles/2024/Aug/SHCD/1.jpg',
            description: 'Trường ABC tổ chức một tọa đàm về nghề nghiệp tương lai với sự tham gia của các chuyên gia hàng đầu trong các lĩnh vực khác nhau. Sự kiện này sẽ giúp sinh viên hiểu rõ hơn về xu hướng nghề nghiệp và cơ hội việc làm.'
        },
        {
            title: 'Giải Thể Thao Sinh Viên Trường ABC',
            image: 'https://i.pinimg.com/564x/b2/77/4a/b2774aeb3771a98df091a577a46b9de3.jpg',
            description: 'Giải thể thao sinh viên của Trường ABC sắp diễn ra với sự tham gia của các đội từ nhiều khoa khác nhau. Đây là cơ hội để sinh viên thể hiện tài năng thể thao và tinh thần đồng đội của mình.'
        },
        {
            title: 'Hội Thảo Về Kỹ Năng Mềm',
            image: 'https://i.pinimg.com/564x/8b/8a/cd/8b8acd34a4c7a4e93c4b7f5259b124d8.jpg',
            description: 'Hội thảo về kỹ năng mềm sẽ được tổ chức tại trường với các chủ đề như giao tiếp hiệu quả, quản lý thời gian, và làm việc nhóm. Đây là cơ hội tuyệt vời để sinh viên nâng cao các kỹ năng cần thiết trong môi trường làm việc chuyên nghiệp.'
        }
    ];

    // console.log("Home")
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary" >
            <Container>
                <h1 className="my-4 text-center">
                    <a href="/"><img src={sclogo} alt="" width={50} /></a> TIN TỨC VỀ TRƯỜNG
                </h1>
                <Row>
                    {newsItems.map((item, index) => (
                        <Col md={4} key={index} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={item.image} />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>
                                        {item.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div >
    )
}