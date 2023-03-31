import { Component, OnInit } from '@angular/core';
import { Country } from './models/country';
import { AppService } from './services/app.service';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { City } from './models/city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'feedback4eTaskClient';

  countiesControl = new FormControl();
  countries: Country[] = [];
  filteredCountries: Observable<Country[]> | undefined;
  selectedCountry: Country | undefined;

  citiesControl = new FormControl();
  cities: City[] = [];
  filteredCities: Observable<City[]> | undefined;
  selectedCityCode: string | undefined;


  airportControl = new FormControl({ value: "", disabled: true });

  constructor(private appService: AppService) { }

  ngOnInit() { }

  ngAfterContentInit(): void {
    this.getCountries()
  }


  getCountries() {
    // Ülkeleri yükle
    this.appService.getCountries().subscribe(data => {
      data.forEach(x => {
        this.countries.push({
          countryCode: x.countryCode,
          countryName: x.countryName,
          id: x.id
        });
      })

      this.filteredCountries = this.countiesControl.valueChanges.pipe(
        startWith(''),
        map(value => value == undefined ? "" : (typeof value === 'string' ? value : value.name)),
        map(name => (name ? this._filterCountries(name) : this.countries)),
      );
    });
  }



  changeCountriesControl(event: Country) {
    this.selectedCountry = event;
    this.getCitiesBtCountryName();
  }

  getCitiesBtCountryName() {
    this.appService.getCitiesByCountryName(this.selectedCountry?.countryName ?? "").subscribe(data => {
      console.log(data, 'lsdkjdslkjsd');

      data.forEach(x => {
        this.cities.push({
          cityName: x.cityName,
          cityIata: x.cityIata,
          id: x.id
        });
      })

      this.filteredCities = this.citiesControl.valueChanges.pipe(
        startWith(''),
        map(value => value == undefined ? "" : (typeof value === 'string' ? value : value.name)),
        map(name => (name ? this._filterCities(name) : this.cities)),
      );
    })
  }

  changeCityControl(event: City) {
    this.selectedCityCode = event.cityIata;
    console.log(this.selectedCityCode, event.cityIata);
    this.getAirportInformations();
  }


  getAirportInformations() {
    this.appService.getAirportInformations(this.selectedCityCode ?? "").subscribe(data => {
      this.airportControl.setValue(`City : ${data.city}- IATA : ${data.city_iata}/ Country : ${data.country} - Location: [Lon: ${data.location?.lon}- Lot : ${data.location?.lat}]`);

    })
  }




  //-----------------------------------------------------------------------------------------------------------------\\

  private _filterCountries(name: string): Country[] {
    const filterValue = name.toLocaleLowerCase();
    return this.countries.filter(option => option.countryName?.toLocaleLowerCase().includes(filterValue));
  }

  displayCountries(data: Country): string {
    return data && data.countryName ? data.countryName : '';
  }


  displayCities(data: City): string {
    return data && data.cityName ? data.cityName : '';
  }

  private _filterCities(name: string): Country[] {
    const filterValue = name.toLocaleLowerCase();
    return this.cities.filter(option => option.cityName?.toLocaleLowerCase().includes(filterValue));
  }
}

