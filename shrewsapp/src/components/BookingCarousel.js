import { React, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel'

import './BookingCarousel.css'

const MealSelectionSlider = ({ dates, selectedMeals, isBooked, toggleMeal, handleModify, handleBooking }) => {
  const settings = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
  };

  const [currentTime, setCurrentTime] = useState (new Date());
  const [mealTimes, setMealTimes] = useState ({
      breakfast: '07:00',
      lunch: '10:30',
      dinner: '16:30'
  });


  useEffect (() => {
      const timer = setInterval(() => {
          setCurrentTime (new Date());
      }, 60000);

      return () => clearInterval (timer);
  }, []);

  const isButtonDisabled = (mealTime, slideIndex) => {
    if (slideIndex === 0) {
      const now = currentTime;
      const mealCutoffTime = new Date ();
      const [hour, minutes] = mealTime.split (":").map (Number);
      mealCutoffTime.setHours (hour, minutes, 0, 0);
      return now > mealCutoffTime;
    }

    return false;
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {dates.map((dateItem, slideIndex) => (
          <div key={slideIndex} className="meal-slide">
            <h6 className='date'>{dateItem.displayDate}</h6>
            <div className='meal-selection-container'>
              {['breakfast', 'lunch', 'dinner'].map((meal) => (
                <button
                  key={meal}
                  className={`meals-button ${selectedMeals[slideIndex][meal] ? 'selected' : ''}`}
                  onClick={() => toggleMeal(slideIndex, meal)}
                  disabled={isBooked[slideIndex] || isButtonDisabled(mealTimes[meal], slideIndex)}
                >
                  {meal.toUpperCase()}
                </button>
              ))}
              <button className='meals-button submit-button' 
                  disabled={isButtonDisabled(mealTimes['dinner'], slideIndex)}
                  onClick={() => {
                    if (isBooked[slideIndex]) {
                      handleModify(slideIndex);
                    } else {
                      handleBooking(slideIndex);
                    }
                }}
              >
                {isBooked[slideIndex] || isButtonDisabled (mealTimes['dinner']) ? 'MODIFY' : 'SUBMIT'}
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MealSelectionSlider;
