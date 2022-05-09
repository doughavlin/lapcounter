import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from './src/context/LapContext';
import { Provider as OptionsProvider } from './src/context/OptionsContext'
import { Provider as EventProvider } from './src/context/EventContext'
import IndexScreen from './src/screens/IndexScreen';
import CounterScreen from './src/screens/CounterScreen';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';

const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Show: ShowScreen,
    Create: CreateScreen,
    Edit: EditScreen,
    Counter: CounterScreen,
  },
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'Laps',
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <EventProvider>
    <OptionsProvider>
    <Provider>
      <App />
    </Provider>
    </OptionsProvider>
    </EventProvider>
  );
};
