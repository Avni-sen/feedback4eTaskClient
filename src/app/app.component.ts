import { Component, OnInit } from '@angular/core';
import { Country } from './models/country';
import { AppService } from './services/app.service';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith, tap } from 'rxjs';
import { City } from './models/city';
import { CalculateAirportsRequest } from './models/location';
import { ToastrService } from 'ngx-toastr';

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
  milesControl = new FormControl({ value: "", disabled: true });

  //------------------------------------------------------------------------\\

  countiesSecondControl = new FormControl();
  countriesSecond: Country[] = [];
  filteredCountiesSecond: Observable<Country[]> | undefined;
  selectedCountrySecond: Country | undefined;

  citiesSecondControl = new FormControl();
  citiesSecond: City[] = [];
  filteredCitiesSecond: Observable<City[]> | undefined;
  selectedSecondCityCode: string | undefined;
  airportSecondControl = new FormControl({ value: "", disabled: true });


  secondaryAirportLocationLat: number | undefined;
  secondaryAirportLocationLon: number | undefined;
  airportLocationLat: number | undefined;
  airportLocationLon: number | undefined;



  constructor(private appService: AppService, private toastr: ToastrService) { }

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

      this.filteredCountiesSecond = this.countiesSecondControl.valueChanges.pipe(
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
    this.getAirportInformations();
  }


  getAirportInformations() {
    this.appService.getAirportInformations(this.selectedCityCode ?? "").subscribe(data => {
      this.airportLocationLat = data.location?.lat;
      this.airportLocationLon = data.location?.lon;
      this.airportControl.setValue(`City : ${data.city}- IATA : ${data.city_iata}/ Country : ${data.country} - Location: [Lon: ${data.location?.lon}- Lot : ${data.location?.lat}]`);

    })
  }


  changeCountiesSecondControl(event: Country) {
    this.selectedCountrySecond = event;
    this.getCitiesBtCountryNameSecond();
  }

  getCitiesBtCountryNameSecond() {
    this.appService.getCitiesByCountryName(this.selectedCountrySecond?.countryName ?? "").subscribe(data => {

      data.forEach(x => {
        this.citiesSecond.push({
          cityName: x.cityName,
          cityIata: x.cityIata,
          id: x.id
        });
      })

      this.filteredCitiesSecond = this.citiesSecondControl.valueChanges.pipe(
        startWith(''),
        map(value => value == undefined ? "" : (typeof value === 'string' ? value : value.name)),
        map(name => (name ? this._filterSecondCities(name) : this.citiesSecond)),
      );
    })
  }

  changeCitySecondControl(event: City) {
    this.selectedSecondCityCode = event.cityIata;
    this.getAirportInformationsSecond();
  }


  getAirportInformationsSecond() {
    this.appService.getAirportInformations(this.selectedSecondCityCode ?? "").subscribe(data => {
      this.secondaryAirportLocationLat = data.location?.lat;
      this.secondaryAirportLocationLon = data.location?.lon;
      this.airportSecondControl.setValue(`City : ${data.city}- IATA : ${data.city_iata}/ Country : ${data.country} - Location: [Lon: ${data.location?.lon}- Lot : ${data.location?.lat}]`);

    })
  }



  calculate() {
    if (!this.selectedCountry) {
      this.toastr.error('Ülke Seçiniz!', 'Uyarı!');
      return
    }

    if (!this.selectedCityCode) {
      this.toastr.error('Şehir Seçiniz!', 'Uyarı!');
      return
    }


    if (!this.selectedCountrySecond) {
      this.toastr.error('İkinci Ülkeyi Seçiniz!', 'Uyarı!');
      return
    }

    if (!this.selectedSecondCityCode) {
      this.toastr.error('İkinci Şehiri Seçiniz!', 'Uyarı!');
      return
    }

    this.toastr.success('Seçimleriniz Başarılı! Hesaplanıyor!', 'Uyarı!');


    if (this.airportLocationLat !== undefined && this.secondaryAirportLocationLat !== undefined
      && this.airportLocationLon !== undefined && this.secondaryAirportLocationLon !== undefined) {
      let res: CalculateAirportsRequest = {
        firstAirportLon: this.airportLocationLon,
        firstAirportLat: this.airportLocationLat,
        secondAirportLon: this.secondaryAirportLocationLon,
        secondAirportLat: this.secondaryAirportLocationLat

      }

      this.appService.calculateAirportsMesuretmentForMils(res).subscribe(data => {

        this.milesControl.setValue(data.toFixed(2) + ' miles');
        this.toastr.success('Hesaplama Başarılı!', 'Uyarı!');
      });
    }
  }

  resetCountryValue() {
    //countrycontrolleri temizle 
    this.countiesControl.setValue("")
    this.citiesControl.setValue("")
    this.selectedCountry = undefined;
    this.selectedCityCode = undefined;
    this.airportLocationLat = undefined;
    this.airportLocationLon = undefined;
    this.airportControl.setValue('');
    this.cities = [];
    this.filteredCities = undefined
    this.milesControl.setValue("")
  }

  resetSecondCountryValue() {
    this.countiesSecondControl.setValue("")
    this.citiesSecondControl.setValue("")
    this.selectedCountrySecond = undefined;
    this.selectedSecondCityCode = undefined;
    this.secondaryAirportLocationLat = undefined;
    this.secondaryAirportLocationLon = undefined;
    this.airportSecondControl.setValue('');
    this.citiesSecond = [];
    this.milesControl.setValue("")
  }

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

  private _filterSecondCities(name: string): Country[] {
    const filterValue = name.toLocaleLowerCase();
    return this.citiesSecond.filter(option => option.cityName?.toLocaleLowerCase().includes(filterValue));
  }
}
