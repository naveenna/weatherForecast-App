export interface ForecastItem {
  temperature: number;   
  windSpeed: number;    
  description: string;   
  icon: string;   
  time: string;      
}

export interface ForecastDay {
  date: string;
  forecasts: ForecastItem[];
}

