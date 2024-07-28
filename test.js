const data = [{ "user_id": 65, "email": "52000655@student.tdtu.edu.vn", "username": "52000655", "nickname": "Trịnh Trường Duy", "phone": "84344511607", "avatar_path": "", "course_year": 2020, "gender": true, "faculty_name": "Công Nghệ Thông Tin" },
{ "user_id": 66, "email": "52000705@student.tdtu.edu.vn", "username": "52000705", "nickname": "Trần Lai Phước", "phone": "84344511607", "avatar_path": "", "course_year": 2020, "gender": true, "faculty_name": "Công Nghệ Thông Tin" },
{ "user_id": 67, "email": "72001424@student.tdtu.edu.vn", "username": "72001424", "nickname": "Đỗ Hồ Thuận Thủy", "phone": "84901944765", "avatar_path": "", "course_year": 2020, "gender": false, "faculty_name": "Quản Trị Kinh Doanh" },
{ "user_id": 68, "email": "minhban365@gmail.com", "username": "41900329", "nickname": "Trương Minh Bản", "phone": "84903131311", "avatar_path": "", "course_year": 2019, "gender": true, "faculty_name": "Điện - Điện tử" },
{ "user_id": 69, "email": "71834481@student.tdtu.edu.vn", "username": "71834481", "nickname": "Nguyễn Tuyết Anh", "phone": "84577746290", "avatar_path": "https://thispersondoesnotexist.com/", "course_year": 2018, "gender": false, "faculty_name": "Quản Trị Kinh Doanh" },
{ "user_id": 70, "email": "31873358@student.tdtu.edu.vn", "username": "31873358", "nickname": "Phạm Nhật Hùng", "phone": "84043551994", "avatar_path": "https://thispersondoesnotexist.com/", "course_year": 2018, "gender": false, "faculty_name": "Luật" },
{ "user_id": 71, "email": "51978833@student.tdtu.edu.vn", "username": "51978833", "nickname": "Trần Lai Tú", "phone": "84847421301", "avatar_path": "https://thispersondoesnotexist.com/", "course_year": 2019, "gender": true, "faculty_name": "Công Nghệ Thông Tin" },
{ "user_id": 72, "email": "51823725@student.tdtu.edu.vn", "username": "51823725", "nickname": "Lê Thị Huệ", "phone": "84223797386", "avatar_path": "https://thispersondoesnotexist.com/", "course_year": 2018, "gender": false, "faculty_name": "Công Nghệ Thông Tin" },
{ "user_id": 73, "email": "61832479@student.tdtu.edu.vn", "username": "61832479", "nickname": "Hoàng Kim Thủy", "phone": "84908952332", "avatar_path": "https://thispersondoesnotexist.com/", "course_year": 2018, "gender": true, "faculty_name": "Kế Toán" },
{ "user_id": 74, "email": "71915486@student.tdtu.edu.vn", "username": "71915486", "nickname": "Trần Nhật Hùng", "phone": "84567190204", "avatar_path": "https://thispersondoesnotexist.com/", "course_year": 2019, "gender": false, "faculty_name": "Quản Trị Kinh Doanh" }
]

const sortArray = (array, key, ascending = true) => {
    return array.sort((a, b) => {
        if (a[key] < b[key]) return ascending ? -1 : 1;
        if (a[key] > b[key]) return ascending ? 1 : -1;
        return 0;
    });
};

// const sortedByNicknameAsc = sortArray(data, 'nickname', true);
// console.log(sortedByNicknameAsc)

const sortedByCourseYearAsc = sortArray(data, 'gender', true);
console.log("Sorted by course_year ascending:", sortedByCourseYearAsc);