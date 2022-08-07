import * as React from "react";

const ButtonBack = ({prevSlide}) => (
  <div 
    className="h-8 w-8 rounded-full hover:border-transparent border-type-grey border-2 text-type-manatee flex flex-row justify-center items-center cursor-pointer group transition duration-300 group" onClick={prevSlide}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-accent hidden group-hover:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 block group-hover:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </div>
)

const ButtonNext = ({nextSlide}) => (
  <div 
    className="h-8 w-8 rounded-full hover:border-transparent border-type-grey border-2 text-type-manatee flex flex-row justify-center items-center cursor-pointer transition duration-300 group" onClick={nextSlide}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-accent hidden group-hover:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </div>
)

const ReviewButtonBack = ({prevSlide}) => (
  <div className="w-8 h-8 bg-ui-darkGrey hover:bg-accent-light rounded-full flex justify-center items-center cursor-pointer group transition-all duration-300" onClick={prevSlide}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-ui-dark group-hover:text-ui-white transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  </div>
)

const ReviewButtonNext = ({nextSlide}) => (
  <div className="w-8 h-8 bg-ui-darkGrey hover:bg-accent-light rounded-full flex justify-center items-center cursor-pointer group transition-all duration-300" onClick={nextSlide}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-ui-dark group-hover:text-ui-white transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </div>
)

export {
  ButtonBack,
  ButtonNext,
  ReviewButtonBack,
  ReviewButtonNext
};