import { Component } from '@angular/core';
import { OpenMeteoService } from '../Weather/open-meteo.service';
import { DailyWeather, Weather, WeatherIcon } from '../Weather/weather';
import { GeocodingService } from '../Geocoding/geocoding.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private meteoService: OpenMeteoService, private geoService: GeocodingService) { }

  weather!: Weather;
  userLocation!: Geolocation;

  weatherConditions: WeatherIcon[] = [
    { code: 0, image: "day.svg" },
    { code: 1, image: "cloudy-day-1.svg" },
    { code: 2, image: "cloudy-day-1.svg" },
    { code: 3, image: "cloudy.svg" },
    { code: 45, image: "cloudy.svg" },
    { code: 48, image: "cloudy.svg" },
    { code: 51, image: "rainy-4.svg" },
    { code: 52, image: "rainy-5.svg" },
    { code: 53, image: "rainy-6.svg" },
    { code: 56, image: "freezing_drizzle_light.png" },
    { code: 57, image: "freezing_drizzle_dense.png" },
    { code: 61, image: "rainy-4.svg" },
    { code: 62, image: "rainy-5.svg" },
    { code: 63, image: "rainy-7.svg" },
    { code: 66, image: "snowy-4.svg" },
    { code: 67, image: "snowy-5.svg" },
    { code: 71, image: "snowy-6.svg" },
    { code: 72, image: "snowy-4.svg" },
    { code: 73, image: "snowy-5.svg" },
    { code: 77, image: "snowy-6.svg" },
    { code: 80, image: "rainy-4.svg" },
    { code: 81, image: "rainy-5.svg" },
    { code: 82, image: "rainy-7.svg" },
    { code: 85, image: "snowy-4.svg" },
    { code: 86, image: "snowy-6.svg" },
    { code: 95, image: "thunder.svg" },
    { code: 96, image: "thunder.svg" },
    { code: 99, image: "thunder.svg" }
  ];
  checkGeolocationPermission(): boolean {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('User has allowed sharing their location.');
          console.log(position.coords);
        },
        (error) => {
          console.log('User has denied sharing their location.');
          console.log(error.code);
          this.geoService.fetchGeoLocationDefault().subscribe(response => {
            this.userLocation = response;
          })
          this.meteoService.fetchWeatherForecastDefault().subscribe(response => {
            this.weather = response
          })
        }
      );
      return true; // Geolocation API is supported
    } else {
      console.log('Geolocation is not supported in this browser.');
      this.geoService.fetchGeoLocationDefault().subscribe(response => {
        this.userLocation = response;
      })
      this.meteoService.fetchWeatherForecastDefault().subscribe(response => {
        this.weather = response;
      })
      return false; // Geolocation API is not supported
    }
  }

  fetchForecastWithCoords() {
    if (this.checkGeolocationPermission() === true) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        this.geoService.fetchGeoLocation(lat, long).subscribe(response => {
          this.userLocation = response;
        })
        this.meteoService.fetchWeatherForecastWithLocation(lat, long).subscribe(response => {
          this.weather = response;
        })
      })
    }
  }

  getWeekdayFromString(dateString: string): string {
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; //months start from 0, so 0-11
    const day = parseInt(dateParts[2]);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(year, month, day);

    return daysOfWeek[date.getDay()];
  }

  getFullDateFromString(dateString: string): string {
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; //months start from 0, so 0-11
    const day = parseInt(dateParts[2]);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(year, month, day);

    return date.toLocaleDateString();
  }
}
