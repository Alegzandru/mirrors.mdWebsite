module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {

    colors: {
      transparent: 'transparent',
      ui : {
        white : "#FFFFFF",
        grey: "#F7F7F7",
        darkGrey : "#F1F1F1",
        blueishGrey : "#C2D1D9",
        dark : "#111215",
        black : "#000000"
      },
      accent : {
        accent : "#16B45A",
        transparent : "rgba(0, 218, 94, 0.11)",
        dark : "#086A32",
        error : "#FF3654",
        light : "#63D795",
        text2 : "#0B4725"
      },
      type : {
        dark : "#03210A",
        manatee : "#505D68",
        grey : "#677077"
      },
      option:{
        border:{
          color : "#E9E9E9",
        }
      }
    },

    fontFamily: {
      'Ubuntu' : ['Ubuntu', 'sans-serif' ],
    },

    fontSize: {
      "lg-hLarge" : ["72px", "88px"],
      "lg-h1" : ["64px", "110%"],
      "lg-h2" : ["48px", "56px"],
      "lg-h3" : ["40px", "56px"],
      "lg-h4" : ["36px", "150%"],
      "lg-32" : ["32px", "36px"],
      "lg-28" : ["28px", "32px"],
      "lg-17" : ["17px", "18px"],
      "lg-14" : ["14px", "16px"],
      "lg-12" : ["12px", "16px"],
      "lg-button" : ["14px", "20px"],
      "lg-p" : ["16px", "150%"],
      "lg-card-price" : ["20px", "100%"],
      "lg-card-name" : ["18px", "24px"],
      "lg-card-name-bold" : ["18px", "18px"],
      "lg-card-description" : ["14px", "150%"],

      "md-h1" : ["56px", "110%"],
      "md-p" : ["16px", "24px"],
      "md-button" : ["14px", "20px"],
      "md-h2" : ["42px", "56px"],
      "md-h3" : ["36px", "40px"],
      "md-h4" : ["30px", "40px"],

      "sm-h1" : ["48px", "110%"],
      "sm-p" : ["14px", "24px"],
      "sm-button" : ["14px", "18px"],
      "sm-card-name" : ["16px", "18px"],
      "sm-h2" : ["34px", "40px"],
      "sm-h3" : ["28px", "40px"],
      "sm-h4" : ["24px", "24px"],
    },

    screens: {

      'smCatalog' : '512px',

      'md': '768px',

      'mdFooter' : '1088px', 

      'lg': '1366px',

      'xl': '1656px'
    },

    extend: {
      backgroundImage: theme => ({
        'hero-pattern': "url('/mainPage/hero/heroBg.jpg')",
        'icon5' : "url(/mainPage/benefits/icon5.png)",
        'options' : "url(/mainPage/options/bgOptions.png)"
      }),

      spacing : {
        'container-sm' : '16px',
        'container-md' : '24px',
        'container-lg' : '32px',
        'container-xl' : 'calc( (100vw - 1656px) / 2 )',
        'dropdown' : 'calc( (100vw - 64px - 8px) / 5 )',
        'photos' : 'calc( (100vw - 64px - 640px) )',
        'search-left' : 'calc( (100vw - 504px) / 2 )',
        '70vh' : '70vh',
        '1.5px' : '1.5px',
        '776px' : '776px',
        '720px' : '720px',
        '640px' : '640px',
        '632px' : '632px',
        '608px' : '608px',
        '600px' : '600px',
        '596px' : '596px',
        '588px' : '588px',
        '560px' : '560px',
        '504px' : '504px',
        '500px' : '500px',
        '488px' : '488px',
        '481px' : '481px',
        '472px' : '472px',
        '460px' : '460px',
        '449px' : '449px',
        '425px' : '425px',
        '418px' : '418px',
        '386px' : '386px',
        '382px' : '382px',
        '365px' : '365px',
        '352px' : '352px',
        '348px' : '348px',
        '320px' : '320px',
        '315px' : '315px',
        '304px' : '304px',
        '300px' : "300px",
        '296px' : '296px',
        '288px' : '288px',
        '284px' : '284px',
        '268px' : '268px',
        '258px' : '258px',
        '245px' : '245px',
        '240px' : '240px',
        '238px' : '238px',
        '234px' : '234px',
        '230px' : '230px',
        '224px' : '224px',
        '216px' : '216px',
        '210px' : '210px',
        '204px' : '204px',
        '200px' : '200px',
        '194px' : '194px',
        '192px' : '192px',
        '190px' : '190px',
        '188px' : '188px',
        '165px' : '165px',
        '160px' : '160px',
        '156px' : '156px',
        '148px' : '148px',
        '140px' : '140px',
        '136px' : '136px',
        '132px' : '132px',
        '130px' : '130px',
        '128px' : '128px',
        '124px' : '124px',
        '120px' : '120px',
        '118px' : '118px',
        '116px' : '116px',
        '112px' : '112px',
        '88px' : '88px',
        '80px' : '80px',
        '72px' : '72px',
        '68px' : '68px',
        '62px' : '62px',
        '60px' : '60px',
        '56px' : '56px',
        '52px' : '52px',
        '48px' : '48px',
        '46px' : '46px',
        '44px' : '44px',
        '40px' : '40px',
        '28px' : '28px',
        '20px' : '20px',
        '18px' : '18px',
        '14px' : '14px',
        '10px' : '10px'
      },
    },

  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}
