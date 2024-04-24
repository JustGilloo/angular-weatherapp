export interface Weather {
    current: Current,
    daily: DailyWeather,
    latitude: number,
    longitude: number,
    current_units: CurrentUnit,
}

export interface Current {
    temperature_2m: number,
    time: Date,
    weather_code: number,
}

export interface CurrentUnit {
    temperature_2m: string
}

export interface DailyWeather {
    time: Date[],
    weather_code: number[]
    temperature_2m_max: number[],
    temperature_2m_min: number[],
}

export interface WeatherIcon {
    code: number,
    image: string
}
