import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import BookingList from '../components/BookingList'
import './Dashboard.css'

const Dashboard = () => {
    const [selectedDate, setSelectedDate] = useState (dayjs());
    const [selectedSorting, setSelectedSorting] = useState ('')

    const handleDateChange = (event) => {
        setSelectedDate (event.target.value);
    };

    const handleChange = (event) => {
        setSelectedSorting (event.target.value);
    };

    return (
        <div className='dashboard-container'>
            <h1 className='heading'>Dashboard</h1>
            <div className='settings-container'>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className='select-date'
                />
                <select
                    className='select-date'
                    name='sorting'
                    value={selectedSorting}
                    onChange={handleChange}
                >
                    <option value="">Sort by</option> 
                    <option value="unitNumber">Unit Number</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                </select>
            </div>
            
            <BookingList selectedDate={selectedDate} />
        </div>
    )
}

export default Dashboard;