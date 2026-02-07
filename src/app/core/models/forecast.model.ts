export interface ForecastItem {
  temperature: number;   // Celsius
  windSpeed: number;     // m/s
  description: string;   // clear sky, rain, etc.
  icon: string;  
  time: string;        // OpenWeather icon code
}

export interface ForecastDay {
  date: string;
  forecasts: ForecastItem[];
}

