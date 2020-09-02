import React from 'react';
import DatePicker from "react-datepicker";
import '../css/Calendar.css';
import "react-datepicker/dist/react-datepicker.css";

export default function Calendar(props) {

    const [date, setDate] = React.useState( new Date(new Date().setDate(new Date().getDate() + props.daysAfterToday)) );

    let handleChange = date => {
        setDate(date);
    };

    function incrementDate() {
        setDate(new Date(date.setDate(date.getDate() +1)));
    }

    function decrementDate() {
        setDate(new Date(date.setDate(date.getDate() -1)));
    }

    return (
        <div className="calendar mr-2">
            <div className="colorColumn" style={{backgroundColor: props.color}}>
            </div>
            <i className="far fa-2x fa-calendar"></i>
            <div className="dateContainer">
                <p>{props.check}</p>
                <DatePicker
                    selected={date}
                    onChange={handleChange}
                />
            </div>
            <i className="fas fa-2x fa-angle-left" onClick={decrementDate}></i>
            <i className="fas fa-2x fa-angle-right" onClick={incrementDate}></i>
        </div>
    );
}