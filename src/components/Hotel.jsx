import React, { useState, useEffect } from 'react';
import '../css/Hotel.css';

function Hotel(props) {

    let [stars, setStars] = useState([]);

    useEffect(() => {
        for(let i=0; i<props.hotel.rating; i++) {
            setStars(stars => [stars, <>&#9733;</>]);
        }
    },[]);

    return (
        <div className="row bg-white m-2">
            <div className="hotels">
                <img src={props.hotel.thumbnail} alt="" id="photo"/>
                <div className="description">
                    <h4>{props.hotel.hotelName}</h4>
                    <p>{stars.map((star => (
                        star
                    )))} Hotel</p>
                    <p>{props.hotel.city}</p>
                    <div className="mt-2 rating">
                        <div id="ratingNum">
                            <h6>{props.hotel.ratings.no}</h6>
                        </div>
                        <b>{props.hotel.ratings.text}</b>
                    </div>
                </div>
                <div className="vl"></div>
                <div className="price">
                    <p className="fontColor">Hotel Website</p>
                    <h5 className="fontColor">${props.hotel.price}</h5>
                    <p className="fontColor">3 nights for ${props.hotel.price*3}</p>
                    <br/>
                    <button id="dealButton">
                        View Deal &gt;
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Hotel;