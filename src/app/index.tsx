import "./App.scss";
import Routing from '../pages';
import { withProviders } from './providers';

const App: any = () => {
  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default withProviders(App);
