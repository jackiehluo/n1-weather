import {React} from 'nylas-exports'
import {RetinaImg} from 'nylas-component-kit'
import WeatherStore from './weather-store'
const emoji = require('node-emoji');

const icons = {
  "clear-day": emoji.get("sunny"),
  "clear-night": emoji.get("crescent_moon"),
  "rain": emoji.get("umbrella"),
  "snow": emoji.get("snowflake"),
  "sleet": emoji.get("snowflake"),
  "wind": emoji.get("dash"),
  "fog": emoji.get("foggy"),
  "cloudy": emoji.get("cloud"),
  "partly-cloudy-day": emoji.get("partly_sunny"),
  "partly-cloudy-night": emoji.get("cloud") + emoji.get("crescent_moon")
}

class WeatherSidebar extends React.Component {

  static displayName = 'WeatherSidebar'

  static containerStyles = {
    order: -99,
    flexShrink: 0
  }

  constructor() {
    super()
    const weather = WeatherStore.weather()
    const geo = WeatherStore.geo()
    const unit = WeatherStore.unit()
    this.state = {weatherForecast: weather, location: geo, tempUnit: unit};
  }

  componentDidMount() {
    this.unsubscriber = WeatherStore.listen(this._onWeatherChanged);
  }

  componentWillUnmount() {
    this.unsubscriber()
  }

  _onWeatherChanged = ()=> {
    const weather = WeatherStore.weather()
    const geo = WeatherStore.geo()
    const unit = WeatherStore.unit()
    this.setState({weatherForecast: weather, location: geo, tempUnit: unit});
  }

  render() {
    const unit = this.state.tempUnit ? this.state.tempUnit.charAt(0).toUpperCase() : "";
    const summary = this.state.weatherForecast ? this.state.weatherForecast.currently.summary + " (" + Math.round(this.state.weatherForecast.currently.temperature) + "°" + unit + ")" : "Getting the weather...";
    const weatherIcon = this.state.weatherForecast ? icons[this.state.weatherForecast.currently.icon] : "";
    const city = this.state.location ? this.state.location.city : "";
    return (
      <div className="weather-sidebar">
        {weatherIcon} {summary}<br/>
        {city}
      </div>
    );
  }

}

export default WeatherSidebar;
