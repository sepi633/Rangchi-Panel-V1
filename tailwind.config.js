
module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
      
      extend: {
        aspectRatio: {
          auto: 'auto',
          square: '1 / 1',
          video: '16 / 9',
          cardImg:'9 / 5'
        },
        colors: {
          basePrimary: {
            '50': '#fff9ed',
            '100': '#fff2d4',
            '200': '#ffe1a8',
            '300': '#ffcb71',
            '400': '#ffaa38',
            '500': '#fe9219',
            '600': '#ef7207',
            '700': '#f46626',
            '800': '#9d440f',
            '900': '#7e3910',
            '950': '#441a06',
        },
        secoundPrimary: {
          '50': '#edfbff',
          '100': '#cedee9',
          '200': '#b5edff',
          '300': '#83e4ff',
          '400': '#48d3ff',
          '500': '#1eb6ff',
          '600': '#0699ff',
          '700': '#0085fe',
          '800': '#4572ed',
          '900': '#0d579b',
          '950': '#032e58',
      }
        },
      },
      container: {
          center: true,
          padding: {
            DEFAULT: '1rem',
            sm: '2rem',
            lg: '3rem',
            // xl: '5rem',
          }
        
      },
    },
  }