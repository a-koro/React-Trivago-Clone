import React, { useState, useEffect } from 'react';
import Hotel from './Hotel';

function Results(props) {

    return (
        <div className="row bg-light justify-content-center">
            {props.hotels.map((hotel) => (
                <Hotel 
                    hotel={hotel} nightsToStay={props.nightsToStay}/>
            ))}
        </div>
    );
}

export default Results;