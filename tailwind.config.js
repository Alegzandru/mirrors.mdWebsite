module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      instafade: 'rgba(0, 0, 0, 0.6)',
      instatext : '#8C54FB',
      waze: '#31C6F7',
      ui : {
        white : "#FFFFFF",
        grey: "#F7F7F7",
        darkGrey : "#F1F1F1",
        blueishGrey : "#C2D1D9",
        dark : "#111215",
        black : "#000000",
        darkGreen: "#1B1C1F"
      },
      accent : {
        accent : "#515CAE",
        transparent : "rgba(140, 148, 208, 0.14)",
        dark : "#2A3373",
        error : "#FF3654",
        light : "#9AA2F2",
        text2 : "#1F254C",
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
      },
      secondary: {
        dust: "#C4C4C4"
      }
    },

    fontFamily: {
      'Ubuntu' : ['Ubuntu', 'sans-serif' ],
      'Pacifico' : ['Pacifico', 'cursive']
    },

    fontSize: {
      "lg-hLarge" : ["72px", "88px"],
      "lg-insta" : ["64px", "150%"],
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
      
      'mdButtons' : '1500px',

      'xl': '1656px'
    },

    fill:{
      'accent-transparent': 'rgba(145, 156, 238, 0.11)'
    },

    extend: {

      borderWidth : {
        '1.5px' : '1.5px'
      },

      minHeight : {
        '96px' : '96px',
        '216px' : '216px',
        '4' : '4rem'
      },

      minWidth : {
        '4' : '4rem',
        '75px' : '75px'
      },
  
      maxWidth : {
        '130px' : '130px',
        '1050px' : '1050px'
      },
      
      brightness : {
        25: '.25',
      },

      backgroundImage: theme => ({
        'hero-pattern': "url('/mainPage/hero/heroBg.jpg')",
        'icon5' : "url(/mainPage/benefits/greenHeart.png)",
        'options' : "url(/mainPage/options/bgOptions.jpg)"
      }),

      spacing : {
        'container-sm' : '16px',
        'container-md' : '24px',
        'container-lg' : '32px',
        'container-xl' : 'calc( (100vw - 1656px) / 2 )',
        'dropdown-lg' : 'calc( (100vw - 64px - 8px) / 4 )',
        'dropdown-xl' : 'calc( ( 1656px - 8px) / 4 )',
        'photos' : 'calc( (100vw - 64px - 952px) )',
        'options-lg' : 'calc( (100vw - 64px - 940px) )',
        'options-xl' : '586px',
        'search-left' : 'calc( (100vw - 504px) / 2 )',
        'cart-lg' : 'calc( (100% - 544px) / 2 )',
        'cart-md' : 'calc( (100% - 320px) / 2 )',
        'popup-top' : 'calc( (100vh - 500px) / 2 )',
        'popup-left' : 'calc( (100vw - 981px) / 2)',
        'popup-top-md' : 'calc( (100vh - 444px) / 2 )',
        'popup-left-md' : 'calc( (100vw - 720px) / 2)',
        'popup-top-sm' : '0px',
        'popup-left-sm' : '0px',
        'checkout-top' : 'calc( (100vh - 240px) / 2 )',
        'checkout-left' : 'calc( (100vw - 288px) / 2 )',
        'lg-image-ratio' : '119%',
        'image-ratio' : '136%',
        '70vh' : '70vh',
        '1.5px' : '1.5px',
        '1050px' : '1050px',
        '981px' : '981px',
        '825px' : '825px',
        '800px' : '800px',
        '776px' : '776px',
        '720px' : '720px',
        '700px' : '700px',
        '640px' : '640px',
        '632px' : '632px',
        '608px' : '608px',
        '600px' : '600px',
        '596px' : '596px',
        '588px' : '588px',
        '560px' : '560px',
        '544px' : '544px',
        '518px' : '518px',
        '504px' : '504px',
        '500px' : '500px',
        '488px' : '488px',
        '481px' : '481px',
        '472px' : '472px',
        '460px' : '460px',
        '449px' : '449px',
        '444px' : '444px',
        '425px' : '425px',
        '418px' : '418px',
        '408px' : '408px',
        '400px' : '400px',
        '386px' : '386px',
        '382px' : '382px',
        '368px' : '368px',
        '365px' : '365px',
        '360px' : '360px',
        '352px' : '352px',
        '348px' : '348px',
        '340px' : '340px',
        '320px' : '320px',
        '315px' : '315px',
        '304px' : '304px',
        '300px' : "300px",
        '296px' : '296px',
        '288px' : '288px',
        '284px' : '284px',
        '272px' : '272px',
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
        '180px' : '180px',
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
        '98px' : '98px',
        '96px' : '96px',
        '92px' : '92px',
        '88px' : '88px',
        '84px' : '84px',
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
        '34px' : '34px',
        '28px' : '28px',
        '20px' : '20px',
        '18px' : '18px',
        '14px' : '14px',
        '11px' : '11px',
        '10px' : '10px'
      },

      margin :{
        '-hero' : 'calc( -100vh )',
        '-70vh' : '-70vh',
        '-28px' : '-28px'
      }
    },

  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      height: ['hover', 'focus'],
      scale: ['group-hover'],
      display: ['group-hover'],
      fill: ['hover', 'focus'],
      margin : ['group-hover'],
      translate: ['hover', 'group-hover']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}
