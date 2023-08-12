import './App.css';
import { useState } from 'react';
import mockData from './mock-data';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';


const App = () => {

  return (
    <div className="App">
      <CitySearch />
      <NumberOfEvents />
      <EventList/>
    </div>
  )
}

export default App;