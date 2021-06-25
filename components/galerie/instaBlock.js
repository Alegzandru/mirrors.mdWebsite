import { useEffect } from 'react';

const useScript = url => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export default function InstaBlock () {

    useScript("/instafeed.min.js")
    useScript("/instaToken.js")

    return (
        <div className="w-full h-auto px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl pt-140px pb-224px font-Ubuntu bg-ui-dark text-ui-white">
            <div id="instafeed"></div>

            Alo

            {/* <script src="./instaToken.js"></script> */}

            {/* <script src="./instafeed.min.js"></script> */}

            {/* <script src="./instaFeed.js"></script> */}
        </div>
    )
}