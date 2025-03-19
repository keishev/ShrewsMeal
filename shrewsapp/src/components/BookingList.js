import React, { useEffect, useState } from 'react';

import { getBookingsByDate } from '../api/booking';
import './BookingList.css'
import CookNavBar from './CookNavBar.js'

const BookingList = ({ selectedDate }) => {
    const [bookings, setBookings] = useState ([]);
    const [loading, setLoading] = useState (true);
    const [error, setError] = useState (null);

    useEffect (() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookingsByDate (selectedDate);
                if (Array.isArray (response)) {
                    setBookings (response);
                } else {
                    setBookings ([]);
                }
                setLoading (false);
            } catch (error) {
                setError ('Failed to fetch bookings.');
                setLoading (false);
            }
        };

        // Fetch bookings when the copmonent mounts or the selectedDate changes 
        if (selectedDate) {
            fetchBookings ();
        };

    }, [selectedDate]);

    if (loading) {
        return <div> Loading bookings...</div>
    }

    return (
        <div className='table-container'>
            <div>
                <table className='responsive-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Building</th>
                            <th>Unit Number</th>
                            <th>Breakfast</th>
                            <th>Lunch</th>
                            <th>Dinner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.first_name}</td>
                            <td>{booking.building}</td>
                            <td>{booking.unitNumber}</td>
                            <td>{booking.breakfast ? "Yes" : "No"}</td>
                            <td>{booking.lunch ? "Yes" : "No"}</td>
                            <td>{booking.dinner ? "Yes" : "No"}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CookNavBar/>
        </div>
    );
    
}

export default BookingList;