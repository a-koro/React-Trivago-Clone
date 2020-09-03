import React from 'react';
import DatePicker from "react-datepicker";
import '../css/Calendar.css';
import "react-datepicker/dist/react-datepicker.css";

export default function Calendar(props) {

    const [date, setDate] = React.useState(props.date);

    function handleChange(selectedDate) {
        setDate(selectedDate);
        props.setDate(selectedDate);
    };

    function incrementDate() {
        setDate(new Date(date.setDate(date.getDate() + 1)));
        props.setDate(date);
    }

    function decrementDate() {
        setDate(new Date(date.setDate(date.getDate() - 1)));
        props.setDate(date);
    }

    React.useEffect(() => {
        setDate(props.date);
    });

    return (
        <div className="calendar mr-2">
            <div className="colorColumn" style={{backgroundColor: props.color}}>
            </div>
            <i className="far fa-2x fa-calendar"></i>
            <div className="dateContainer">
                <p>{props.check}</p>
                <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={date}
                    onChange={handleChange}
                />
            </div>
            <i className="fas fa-2x fa-angle-left" onClick={decrementDate}></i>
            <i className="fas fa-2x fa-angle-right" onClick={incrementDate}></i>
        </div>
    );
}