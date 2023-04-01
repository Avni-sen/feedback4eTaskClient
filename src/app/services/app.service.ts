import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country';
import { City } from '../models/city';
import { Airport } from '../models/airport';
import { CalculateAirportsRequest } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }


  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(environment.getApiUrl + '/Airports/getcountries');
  }

  getCitiesByCountryName(countryname: string): Observable<City[]> {
    return this.http.get<City[]>(environment.getApiUrl + '/Airports/getcitiesbycountryname?countryname=' + countryname);
  }

  getAirportInformations(citycode: string): Observable<Airport> {
    return this.http.get<Airport>('https://places-dev.cteleport.com/airports/' + citycode);
  }

  calculateAirportsMesuretmentForMils(CalculateAirportsRequest: CalculateAirportsRequest): Observable<any> {
    console.log(CalculateAirportsRequest);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(environment.getApiUrl + '/Airports/', JSON.stringify(CalculateAirportsRequest), { headers });
  }


}
