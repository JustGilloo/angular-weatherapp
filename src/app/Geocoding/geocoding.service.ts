import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private client: HttpClient) { }

  fetchGeoLocation(latitude: number, longitude: number): Observable<Geolocation> {
    return this.client.get<Geolocation>(`https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=${latitude}&lon=${longitude}`).pipe(map((a: any) => a.features[0].properties.geocoding.city));
  }

  fetchGeoLocationDefault() {
    return this.client.get<Geolocation>(`https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=50.8028&lon=4.3410`).pipe(map((a: any) => a.features[0].properties.geocoding.city));
  }
}
