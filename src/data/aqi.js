export const aqiBands = [
  {
    id: 'good',
    label: 'Good',
    range: '0-50',
    token: 'aqi-good',
    guidance: 'Air quality is satisfactory. Enjoy outdoor activities as normal.',
  },
  {
    id: 'moderate',
    label: 'Moderate',
    range: '51-100',
    token: 'aqi-moderate',
    guidance: 'Sensitive groups should reduce prolonged outdoor exertion.',
  },
  {
    id: 'unhealthy',
    label: 'Unhealthy',
    range: '101-200',
    token: 'aqi-unhealthy',
    guidance: 'Everyone may feel effects. Wear a mask outdoors and run air purifiers indoors.',
  },
  {
    id: 'hazardous',
    label: 'Hazardous',
    range: '201+',
    token: 'aqi-hazardous',
    guidance: 'Health emergency. Stay indoors with air purification running.',
  },
];