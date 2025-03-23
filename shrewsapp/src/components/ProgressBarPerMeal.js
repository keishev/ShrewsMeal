// import React, { useEffect, useState } from 'react';

// import './ProgressBarPerMeal.css';

// const ProgressBarPerMeal = ({ bookings, selectedMeal, totalTenants }) => {
//     const [mealCount, setMealCount] = useState (0);
//     const [filteredMealBookings, setFilteredMealBookings] = useState ([]);
//     const [loading, setLoading] = useState (true);
//     const [progress, setProgress] = useState (0);
    
//     useEffect (() => {
//         const mealBookings = bookings.filter (booking => booking[selectedMeal]);
//         setFilteredMealBookings (mealBookings);
//     }, [bookings, selectedMeal]);

//     useEffect (() => {
//         setMealCount (filteredMealBookings.length);
//         setLoading (false);
//         const progress = ((mealCount / totalTenants) * 100);
//         setProgress (progress);
//     }, [filteredMealBookings]);

//     // Calculate progress percentage for each meal
//     const calculateProgress =  () => {
//         const progress = (mealCount / totalTenants) * 100;
//         console.log (progress);
//         return progress;
//     };

//     if (loading) {
//         return <div>Loading...</div>
//     }

//     return (
//         <div>
//             <p>{progress}</p>
//             <ProgressBar progress={progress}/>
//         </div>
//     );
// };

// const ProgressBar = ({ progress }) => {
//     return (
//         <div className='progress-bar-container'>
//             <div className='progress-bar'style={{ width: `${progress}%`, height:'20px'}}></div>
//         </div>
//     )
// }

// export default ProgressBarPerMeal;

import { useState, useEffect } from 'react';
import './ProgressBarPerMeal.css';

const ProgressBarPerMeal = ({ bookings, selectedMeal, totalTenants }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Directly filter bookings based on the selected meal type
        const filteredMealBookings = bookings.filter(booking => booking[selectedMeal]);

        // Calculate progress
        const mealCount = filteredMealBookings.length;
        const newProgress = (mealCount / totalTenants) * 100;

        // Update progress state (this triggers a re-render with updated value)
        setProgress(newProgress);
    }, [bookings, selectedMeal, totalTenants]); // Re-run effect when these values change

    return (
        <div className='progress-bar-root'>
            <div className="progress-bar-container" style={{ width: '100%', margin: '0 auto', padding: '0', border: '1.5px solid black', borderRadius: '8px' }}>
                <div
                    className="progress-bar"
                    style={{
                        width: `${progress}%`   // Smooth transition when progress changes
                    }}
                />
            
            </div>
            <p className='progress'>{progress / 100 * totalTenants} / {totalTenants} </p>
        </div>
    );
};

export default ProgressBarPerMeal;
