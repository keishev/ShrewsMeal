import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel'
import $ from 'jquery';

import './BookingCarousel.css'
// import '../pages/BookingPage.css'

const MealSelectionSlider = ({ dates, selectedMeals, isBooked, toggleMeal, handleModify, handleBooking }) => {
  const settings = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
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
                  disabled={isBooked[slideIndex]}
                >
                  {meal.toUpperCase()}
                </button>
              ))}
              <button className='meals-button submit-button' 
                onClick={() => {
                  if (isBooked[slideIndex]) {
                    handleModify(slideIndex);
                  } else {
                    handleBooking(slideIndex);
                  }
                }}
              >
                {isBooked[slideIndex] ? 'MODIFY' : 'SUBMIT'}
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MealSelectionSlider;
