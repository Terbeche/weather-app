export interface Location {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    }

export interface DashboardLocation {
    id: number;
    location_id: number;
    name: string;
    temperature: number;
    rainfall: number;
    latitude: number;
    longitude: number;
    weather_code: number;
    }

export class LocationDTO {
    public id: number;
    public name: string;
    public latitude: number;
    public longitude: number;

    constructor(location: Location) {
        this.id = location.id;
        this.name = location.name;
        this.latitude = location.latitude;
        this.longitude = location.longitude;
    }
}

export class DashboardLocationDTO {
    public id: number;
    public location_id: number;
    public name: string;
    public temperature: number;
    public rainfall: number;
    public latitude: number;
    public longitude: number;
    public weather_code: number;

    constructor(dashboardLocation: DashboardLocation) {
        this.id = dashboardLocation.id;
        this.location_id = dashboardLocation.location_id;
        this.name = dashboardLocation.name;
        this.temperature = dashboardLocation.temperature;
        this.rainfall = dashboardLocation.rainfall;
        this.latitude = dashboardLocation.latitude;
        this.longitude = dashboardLocation.longitude;
        this.weather_code = dashboardLocation.weather_code;
    }
}