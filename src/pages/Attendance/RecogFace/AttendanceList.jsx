import React from 'react';

const AttendanceList = ({attendListSuccess}) => {
    return (
        <ul className='m-1'>
            {attendListSuccess.map((data, index) => {
                return (<li key={index}>{data}</li>)
            })}
        </ul>
    );
}

export default React.memo(AttendanceList);