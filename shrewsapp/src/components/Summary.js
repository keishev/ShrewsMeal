import React, { useEffect, useState } from 'react';

import './Summary.css';

import ProgressBarPerMeal from './ProgressBarPerMeal';
import { getBookingsByDate } from '../api/booking';
import { getTotalTenants } from '../api/tenants';

const Summary = ({ selectedDate }) => {
    const [bookings, setBookings] = useState ([]);
    const [loading, setLoading] = useState (true);
    const [error, setError] = useState ('');
    const [totalTenant, setTotalTenants] = useState (0);

    const settings = {
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
    };

    const mealsType = ['breakfast', 'lunch', 'dinner'];

    useEffect (() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookingsByDate(selectedDate)
                setBookings(Array.isArray(response) ? response : []);
                setLoading (false);
            } catch (error) {
                setError ('Failed to fetch bookings.');
                setLoading (false);
            }
        };

        if (selectedDate) {
            fetchBookings ();
        };

        const totalTenants = async () => {
            try {
                const res = await getTotalTenants ();
                setTotalTenants (res);
                console.log (totalTenant);
            } catch (error) {
                setError ('Failed to fetch total tenants.');
            }
        }

        totalTenants ();

    }, [selectedDate]);

    if (loading) {
        return <div> Loading... </div>;
    }

    return (
        <div className='summary-container'>
            <div className='title-div'>
                <h3 className='summary-title'>SUMMARY</h3>
            </div>
            {mealsType.map ((mealType) => (
                <div className='summary-slide'>
                    <h6 className='summary-header'>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h6>
                    <div className='summary-content'>
                        <ProgressBarPerMeal bookings={bookings} selectedMeal={mealType} totalTenants={totalTenant}/>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default Summary;