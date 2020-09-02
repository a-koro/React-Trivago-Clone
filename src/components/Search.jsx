import React, { useState, useEffect } from 'react';
import Results from './Results';
import Iframe from 'react-iframe';
import Calendar from './Calendar';
import Autocomplete from './Autocomplete';
import Autosuggest from 'react-autosuggest';
import "../css/Search.css";

function Search(props) {

    let [hotels, setHotels] = useState([]);
    let [testHotels, setTestHotels] = useState([]);
    let [suggestions, setSuggestions] = useState([]);
    let [selectedRangeValue, setSelectedRangeValue] = useState("1999");
    const[sortingFilters, setSortingFilters] = useState(new Set());

    const [searchResults, setSearchResults] = useState([]);
    const [cities, setCities] = useState(new Set());

    function search(evt) {
        evt.preventDefault();

        setHotels(props.hotels
            .filter((hotel) => {
                return hotel.city.toLowerCase().startsWith(evt.target.city.value.toLowerCase());
            }));

        setSearchResults(props.hotels
            .filter((hotel) => {
                return hotel.city.toLowerCase().startsWith(evt.target.city.value.toLowerCase());
            }));
        setSuggestions([]);
    }

    function starsFilter(evt) {
        setHotels(searchResults.filter((hotel) => {
            return hotel.rating == evt.target.value || evt.target.value == 6;
        }));
    }

    function ratingFilter(evt) {
        setHotels(searchResults.filter((hotel) => {
            return hotel.ratings.no <= evt.target.value || evt.target.value == 0;
        }));
    }

    function cityFilter(evt) {
        setHotels(searchResults.filter((hotel) => {
            return hotel.city == evt.target.value || evt.target.value == 6;
        }));
    }

    function autoSuggest(evt) {
        // setTestHotels(props.hotels);
        let newSuggestions = [];
        if(!evt.target.value == "") {
            testHotels.filter((hotel) => {
                return hotel.city.toLowerCase().startsWith(evt.target.value.toLowerCase());
            }).map((hotel) => {
                    if(newSuggestions.includes(hotel.city)) {

                    }
                    else {
                        newSuggestions.push(hotel.city);
                    }
            });
            setSuggestions(newSuggestions);
        }
        else {
            setSuggestions([]);
        }
    }

    function autoComplete(evt) {
        document.getElementById("city").value = evt.target.innerHTML;
        setSuggestions([]);
    }

    useEffect(() => {
        setTestHotels(props.hotels);
    });

    function rangeValue(evt) {
        setSelectedRangeValue(evt.target.value);

        setHotels(searchResults.filter((hotel) => {
            return hotel.price < evt.target.value;
        }));
    }
    let returnValue = 0;
    function sortHotels(evt) {
        setTestHotels(hotels.sort((a,b) => {
            a.filters.forEach((filter) => {
                if(filter.name == evt.target.value) {
                    returnValue = -1;
                }
            });
            b.filters.forEach((filter) => {
                if(filter.name == evt.target.value) {
                    returnValue = 1;
                }
            });
            return returnValue;
            })
        );
        setHotels(testHotels);
        setHotels(hotels);
    }

    useEffect(() => {
        searchResults.forEach((result) => {
            result.filters.forEach(filter => {
                setSortingFilters(new Set(sortingFilters.add(filter.name)));
            });
        });
        console.log(sortingFilters);

        searchResults.forEach((result) => {
            setCities(new Set(cities.add(result.city)));
        });
    },[searchResults]);

    return (
        <>
            <div className="row p-2" id="searchDiv">
                <form id="mainForm" autoComplete="off" onSubmit={search} className="form-inline" style={{ width: "100%" }}>
                    <input type="text" name="city" placeholder="Enter destination" id="city" onChange={autoSuggest} style={{ width: "80%", height: "45px" }} />
                    <input type="submit" value="Search" className="btn btn-primary" style={{ width: "20%", height: "45px" }} />
                    <div id="suggestions">
                        {suggestions.map((suggestion) => (
                            <p onClick={autoComplete}>{suggestion}</p>
                        ))}
                    </div>
                </form>
            </div>
            <div className="row px-2 pb-2" id="calendarDiv">
                <Calendar check="Check-in" daysAfterToday={0}/>
                <Calendar check="Check-out" color="orange" daysAfterToday={3}/>
                <form action="" id="roomsSelect">
                    <select id="rooms" name="rooms">
                        <option value="single">Single room</option>
                        <option value="double">Double room</option>
                        <option value="family">Family room</option>
                    </select>
                </form>
            </div>
            <div className="row" id="filtersRow">
                <div id="rangeInput">
                    <p>Price max:{selectedRangeValue}</p>
                    <form action="">
                        <input type="range" min="1" max="1999" defaultValue="1999" id="range" name="range" onChange={rangeValue}/>
                    </form>
                </div>
                <div className="vl"></div>
                <div id="starsInput">
                    <p>Property type</p>
                    <form action="">
                        <select name="stars" id="selectStarsInput" onChange={starsFilter}>
                            <option value="6" selected>All</option>
                            <option value="0">-</option>
                            <option value="1">&#9733;</option>
                            <option value="2">&#9733;&#9733;</option>
                            <option value="3">&#9733;&#9733;&#9733;</option>
                            <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
                            <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
                        </select>
                    </form>
                </div>
                <div className="vl"></div>
                <div id="guestRatingInput">
                    <p>Guest rating</p>
                    <form action="">
                        <select name="guestRating" id="selectGuestRatingInput" onChange={ratingFilter}>
                            <option value="0" selected>All</option>
                            <option value="2">0 – 2 Okay</option>
                            <option value="6"> 2 – 6 Fair</option>
                            <option value="7"> 6 – 7 Good</option>
                            <option value="8.5">7 – 8.5 Very Good</option>
                            <option value="10">8.5 – 10 Excellent</option>
                        </select>
                    </form>
                </div>
                <div className="vl"></div>
                <div id="cityInput">
                    <p>Hotel location</p>
                    <form action="">
                        <select name="cityFilter" id="selectCityFilter" onChange={cityFilter}>
                            <option value="6" selected>All</option>
                            {/* {searchResults.map((hotel) => (
                                <option value={hotel.city}>{hotel.city}</option>
                            ))} */}
                            {Array.from(cities).map((city) => (
                                <option value={city}>{city}</option>
                            ))}
                        </select>
                    </form>
                </div>
            </div>
            <div className="row bg-light p-2">
                <div className="col-2">
                <button type="button" className="btn bg-white border border-secondary" data-toggle="modal" data-target=".bd-example-modal-xl">
                    View Map
                </button>
                </div>
                <div className="col-5 offset-5">
                    <form action="" className="form-inline">
                                    <b>Sort by &nbsp;</b>
                                    <select name="sortingInput" id="sortingInput" onChange={sortHotels}>
                                        <option value="">Our recommendations</option>
                                        {Array.from(sortingFilters).map((filter) => (
                                            <option value={filter}>{filter}</option>
                                        ))}
                                    </select>
                    </form>
                </div>
            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Iframe url="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d83998.94722687619!2d2.277019841665155!3d48.8588377391234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sgr!4v1554987763683!5m2!1sen!2sgr"
                                width="100% vw"
                                height="800px" />
                        </div>
                    </div>
                </div>
            </div>
            <Results hotels={hotels} />
        </>
    );
}

export default Search;