/** @babel */
import NylasStore from 'nylas-store';
import Actions from './weather-actions';
const Forecast = require('forecast');
const extIP = require('external-ip');
const geoip = require('geoip-lite');

const getIP = extIP({
  replace: true,
  services: ['http://ifconfig.co/x-real-ip', 'http://ifconfig.io/ip'],
  timeout: 600,
  getIP: 'parallel'
});

const Units = {
  F: "fahrenheit",
  C: "celsius",
}

class WeatherStore extends NylasStore {

  constructor() {
    super();
    this._unit = Units.F;
    const forecast = new Forecast({
      service: 'forecast.io',
      key: '721e3df6f2b715253fb3332a1925887e',
      units: this._unit,
      cache: true,
      ttl: {
        minutes: 27,
        seconds: 45
      }
    });
    getIP((err, ip) => {
      const geo = geoip.lookup(ip);
      forecast.get(geo.ll, (err, weather) => {
        this._weather = weather;
        this._geo = geo;
      });
    });
    this.trigger();
    Actions.selectTemperatureUnit.listen(this.onTemperatureUnitSelected);
  }

  unit() {
    return this._unit;
  }

  weather() {
    return this._weather;
  }

  geo() {
    return this._geo;
  }



  onTemperatureUnitSelected = (unit) => {
    this._unit = unit;
    forecast = new Forecast({
      service: 'forecast.io',
      key: 'FORECAST_API_KEY',
      units: this._unit,
      cache: true,
      ttl: {
        minutes: 27,
        seconds: 45
      }
    });
    getIP(
        (err, ip) => {
            geo = geoip.lookup(ip);
            forecast.get(geo.ll, (err, weather) => {
                this._weather = weather;
                this._geo = geo;
                this.trigger()
            });
        }
    );
  }

}

export default new WeatherStore();

