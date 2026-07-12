import { AQI_CATEGORIES } from './constants';

export const getAQICategory = (aqi) => {
  if (typeof aqi !== 'number') return AQI_CATEGORIES.GOOD;
  
  const categories = Object.values(AQI_CATEGORIES);
  return categories.find(cat => aqi >= cat.min && aqi <= cat.max) || AQI_CATEGORIES.HAZARDOUS;
};

export const getAQIColor = (aqi) => {
  return getAQICategory(aqi).color;
};

export const getAQILabel = (aqi) => {
  return getAQICategory(aqi).label;
};

export const getAQIDescription = (aqi) => {
  const label = getAQILabel(aqi);
  switch (label) {
    case 'Good':
      return 'Air quality is considered satisfactory, and air pollution poses little or no risk.';
    case 'Moderate':
      return 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.';
    case 'Poor':
      return 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
    case 'Unhealthy':
      return 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.';
    case 'Severe':
      return 'Health warnings of emergency conditions. The entire population is more likely to be affected.';
    case 'Hazardous':
      return 'Health alert: everyone may experience more serious health effects.';
    default:
      return '';
  }
};
