export const healthData = [
  {
    id: 'asthma',
    name: 'Asthma',
    threshold: 100, // AQI above this triggers risk
    dos: ['Use air purifier indoors', 'Carry inhaler at all times', 'Keep windows closed'],
    donts: ['Avoid outdoor exercise', 'Do not smoke', 'Avoid dust exposure']
  },
  {
    id: 'heart',
    name: 'Heart Issues',
    threshold: 150,
    dos: ['Monitor blood pressure', 'Stay indoors in AC', 'Consult doctor if feeling heavy chest'],
    donts: ['Avoid heavy physical exertion', 'Avoid high traffic areas']
  },
  {
    id: 'allergies',
    name: 'Allergies',
    threshold: 50,
    dos: ['Wear N95 mask outdoors', 'Use nasal spray if prescribed', 'Wash face after coming indoors'],
    donts: ['Avoid gardening', 'Keep pets out of bedroom']
  },
  {
    id: 'sinus',
    name: 'Sinus',
    threshold: 100,
    dos: ['Use humidifier', 'Stay hydrated', 'Inhale steam if congested'],
    donts: ['Avoid cold beverages', 'Avoid sudden temperature changes']
  },
  {
    id: 'copd',
    name: 'COPD',
    threshold: 100,
    dos: ['Use oxygen if prescribed', 'Stay in clean air environment', 'Rest frequently'],
    donts: ['Avoid any outdoor exertion', 'Avoid passive smoking']
  }
];

export const calculateRiskLevel = (aqi) => {
  if (aqi <= 50) return 'None';
  if (aqi <= 100) return 'Mild';
  if (aqi <= 150) return 'Moderate';
  if (aqi <= 200) return 'High';
  return 'Severe';
};
