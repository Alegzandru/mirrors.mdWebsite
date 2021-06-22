import * as React from "react";

const CustomButtonGroupAsArrows = ({ next, previous }) => {

  const [leftHovered, setLeftHovered] = React.useState(0)
  const [rightHovered, setRightHovered] = React.useState(0)

  return (
    <div className="absolute top-320px md:top-449px left-0 w-full px-62px flex flex-row justify-between items-center">

      <div 
        className="h-8 w-8 rounded-full hover:border-transparent border-type-grey border-2 text-type-manatee flex flex-row justify-center items-center cursor-pointer group transition duration-300" onClick={previous}
        onMouseOver={() => setLeftHovered(1)}
        onMouseLeave={() => setLeftHovered(0)}
      >
        {!leftHovered ? 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 block group-hover:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          :
          ""
        }

        {leftHovered ?
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          :
          ""
        }
        
      </div>

      <div 
        className="h-8 w-8 rounded-full hover:border-transparent border-type-grey border-2 text-type-manatee flex flex-row justify-center items-center cursor-pointer transition duration-300" onClick={next}
        onMouseOver={() => setRightHovered(1)}
        onMouseLeave={() => setRightHovered(0)}
      >
        {!rightHovered ? 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          :
          ""
        }

        {rightHovered?
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          :
          ""
        }
      </div>

    </div>
  );
};

const CustomButtonGroupAsArrows2 = ({ next, previous }) => {

  const [leftHovered, setLeftHovered] = React.useState(0)
  const [rightHovered, setRightHovered] = React.useState(0)

  return (
    <div className="absolute -top-68px md:-top-80px left-0 w-full px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl flex flex-row justify-between items-center mx-auto">
      <div 
        className="h-8 w-8 rounded-full hover:border-transparent border-type-grey border-2 text-type-manatee flex flex-row justify-center items-center cursor-pointer group transition duration-300" onClick={previous}
        onMouseOver={() => setLeftHovered(1)}
        onMouseLeave={() => setLeftHovered(0)}
      >
        {!leftHovered ? 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 block group-hover:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          :
          ""
        }

        {leftHovered ?
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          :
          ""
        }
        
      </div>

      <div 
        className="h-8 w-8 rounded-full hover:border-transparent border-type-grey border-2 text-type-manatee flex flex-row justify-center items-center cursor-pointer transition duration-300" onClick={next}
        onMouseOver={() => setRightHovered(1)}
        onMouseLeave={() => setRightHovered(0)}
      >
        {!rightHovered ? 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          :
          ""
        }

        {rightHovered?
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          :
          ""
        }
      </div>

    </div>
  );
};

export {
  CustomButtonGroupAsArrows,
  CustomButtonGroupAsArrows2
};