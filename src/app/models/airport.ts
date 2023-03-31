interface Location {
 lon: number;
 lat: number;
}

export class Airport {
 id?: number;
 city?: string;
 city_iata?: string;
 country?: string;
 location?: Location;
}
