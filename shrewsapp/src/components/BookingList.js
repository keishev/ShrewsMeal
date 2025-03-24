import React, { useEffect, useMemo, useState } from 'react';

import { getBookingsByDate } from '../api/booking';
import './BookingList.css'  

const BookingList = ({ selectedDate, sorting }) => {
    const [bookings, setBookings] = useState ([]);
    const [loading, setLoading] = useState (true);
    const [error, setError] = useState (null);

    useEffect (() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookingsByDate(selectedDate);
                setBookings(Array.isArray(response) ? response : []);
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

    }, [selectedDate, sorting]);

    const filteredAndSortedBookings = useMemo (() => {
        return [...bookings]
        .filter (booking => {
            if (sorting === "breakfast") return booking.breakfast;
            if (sorting === "lunch") return booking.lunch;
            if (sorting === "dinner") return booking.dinner;
            return true;
        })
        .sort ((a, b) => {
            if (sorting === "unitNumber") {
                return a.unitNumber.localeCompare (b.unitNumber, undefined, { numeric: true })
            }
            return 0;
        })
    }, [bookings, sorting]);

    if (loading) {
        return <div> Loading bookings...</div>
    }

    return (
        <div className='table-container'>
            <div>
                <table className='responsive-table'>
                    <thead>
                        <tr key='mealHeader'>
                            <th>Name</th>
                            <th>Building</th>
                            <th>Unit Number</th>
                            { sorting === "default" || sorting === "unitNumber" ? (
                                <>
                                    <th>Breakfast</th>
                                    <th>Lunch</th>
                                    <th>Dinner</th>
                                </>
                            ) : (
                                <th>{sorting.charAt(0).toUpperCase() + sorting.slice(1)}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedBookings.map((booking) => (
                        <tr key={booking.bookingID}>
                            <td>{booking.first_name}</td>
                            <td>{booking.building}</td>
                            <td>{booking.unitNumber}</td>
                            { sorting === "default" || sorting === "unitNumber" ? (
                                <>
                                    <td>{booking.breakfast ? "Yes" : "No"}</td>
                                    <td>{booking.lunch ? "Yes" : "No"}</td>
                                    <td>{booking.dinner ? "Yes" : "No"}</td>
                                </>
                            ) : (
                                <td>Yes</td>
                            )}
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
}

export default BookingList;