/** @babel */
import {Reflux} from 'nylas-exports';

Actions = {
  'selectTemperatureUnit': Reflux.createAction('selectTemperatureUnit')
}

Actions['selectTemperatureUnit'].sync = true;

export default Actions;

