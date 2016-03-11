import {React} from 'nylas-exports'
import Actions from './weather-actions'
import WeatherStore from './weather-store'

class WeatherPreferences extends React.Component {

  constructor() {
    super()
    const unit = WeatherStore.unit()
    this.state = {tempUnit: unit};
  }

  componentDidMount() {
    this.unsubscriber = WeatherStore.listen(this._onWeatherChanged);
  }

  componentWillUnmount() {
    this.unsubscriber()
  }

  _onSelect = (event)=> {
    Actions.selectTemperatureUnit(event.target.value);
  }

  _onWeatherChanged = ()=> {
    const unit = WeatherStore.unit()
    this.setState({tempUnit: unit});
  }

  render() {
    return (
      <div>
        <section className="container-templates">
          <h2>Weather</h2>
          <form>
            <input onChange={this._onSelect} type="radio" value="fahrenheit" name="temp" checked={this.state.tempUnit == "fahrenheit" ? true : null}>Fahrenheit</input><br/>
            <input onChange={this._onSelect} type="radio" value="celsius" name="temp" checked={this.state.tempUnit == "celsius" ? true : null}>Celsius</input>
          </form>
        </section>
      </div>
    );
  }
}

export default WeatherPreferences;
