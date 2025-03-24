import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import BookingList from '../components/BookingList'
import Summary from '../components/Summary'
import CookNavBar from '../components/CookNavBar'

import './Dashboard.css'

const Dashboard = () => {
    const [selectedDate, setSelectedDate] = useState (dayjs());
    const [selectedSorting, setSelectedSorting] = useState ('default')

    const handleDateChange = (event) => {
        setSelectedDate (event.target.value);
    };

    const handleChange = (event) => {
        setSelectedSorting (event.target.value);
    };

    return (
        <div className='main-container'>
            <div className='dashboard-container'>
                <h1 className='heading'>Dashboard</h1>
                <div className='settings-container'>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className='settings'
                    />
                    <select
                        className='settings'
                        name='sorting'
                        value={selectedSorting}
                        onChange={handleChange}
                    >
                        <option value="default">Display by (default)</option> 
                        <option value="unitNumber">Unit Number</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                </div>
                
                <div className='dashboard-info-container'>
                    <BookingList selectedDate={selectedDate} sorting={selectedSorting}/>
                    <Summary selectedDate={selectedDate}/>
                </div>
            </div>
            <CookNavBar/>
        </div>
    )
}

export default Dashboard;