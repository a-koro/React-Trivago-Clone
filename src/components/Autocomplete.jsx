import React from 'react';
import Autosuggest from 'react-autosuggest';
import '../App.css';
  
 export default class Autocomplete extends React.Component {
    constructor() {
      super();
  
      this.state = {
        value: '',
        suggestions: [],
        hotelsM: []
      };    
    }

    componentDidMount() {
      this.state.hotelsM = this.props.hotels;
    };
    
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
    escapeRegexCharacters(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    getSuggestions(value) {
      const escapedValue = this.escapeRegexCharacters(value.trim());
      
      if (escapedValue === '') {
        return [];
      }
    
      const regex = new RegExp('^' + escapedValue, 'i');
    
      return this.state.hotelsM.filter(hotel => regex.test(hotel.hotelName));
    }
    
    getSuggestionValue(suggestion) {
      return suggestion.name;
    }
    
    renderSuggestion(suggestion) {
      return (
        <span>{suggestion.name}</span>
      );
    }
  
    onChange = (event, { newValue, method }) => {
      this.setState({
        value: newValue
      });
    };
    
    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: this.getSuggestions(value)
      });
    };
  
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };
  
    render() {
      const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: "Enter destination",
        value,
        onChange: this.onChange
      };
  
      return (
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps} />
      );
    }
  }
  