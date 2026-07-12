export const aqiScaleData = {
  US: [
    { category: 'Good', min: 0, max: 50, color: '#009966', description: 'Air quality is considered satisfactory, and air pollution poses little or no risk.' },
    { category: 'Moderate', min: 51, max: 100, color: '#FFDE33', description: 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people.' },
    { category: 'Poor', min: 101, max: 150, color: '#FF9933', description: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.' },
    { category: 'Unhealthy', min: 151, max: 200, color: '#CC0033', description: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.' },
    { category: 'Severe', min: 201, max: 300, color: '#660099', description: 'Health warnings of emergency conditions. The entire population is more likely to be affected.' },
    { category: 'Hazardous', min: 301, max: 500, color: '#7E0023', description: 'Health alert: everyone may experience more serious health effects.' }
  ],
  India: [
    { category: 'Good', min: 0, max: 50, color: '#009966', description: 'Minimal impact.' },
    { category: 'Satisfactory', min: 51, max: 100, color: '#FFDE33', description: 'May cause minor breathing discomfort to sensitive people.' },
    { category: 'Moderate', min: 101, max: 200, color: '#FF9933', description: 'May cause breathing discomfort to people with lung disease such as asthma, and discomfort to people with heart disease, children and older adults.' },
    { category: 'Poor', min: 201, max: 300, color: '#CC0033', description: 'May cause breathing discomfort to people on prolonged exposure, and discomfort to people with heart disease.' },
    { category: 'Very Poor', min: 301, max: 400, color: '#660099', description: 'May cause respiratory illness to the people on prolonged exposure. Effect may be more pronounced in people with lung and heart diseases.' },
    { category: 'Severe', min: 401, max: 500, color: '#7E0023', description: 'May cause respiratory impact even on healthy people, and serious health impacts on people with lung/heart disease.' }
  ]
};
