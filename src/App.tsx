import { store } from './store/store';
import { AppShell } from './core/AppShell';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <AppShell />
    </Provider>
  );
}

export default App;
