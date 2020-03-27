import React, {Component} from 'react';
import LoginScreen from './src/libs/Others/LoginScreen';
import ChiTietVatTuScreen from './src/libs/Others/ChiTietVatTuScreen';
import ExpandableListViewScreen from './src/libs/ExpandableListView/ExpandableListViewScreen';
import CalendarScreen from './src/libs/CCalendar/CalendarScreen';
import MainScreen from './src/screen/MainScreen';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const AppStack = createStackNavigator({
        MainScreen: MainScreen,
        CalendarScreen: CalendarScreen,
        ExpandableListViewScreen: ExpandableListViewScreen,
        ChiTietVatTuScreen: ChiTietVatTuScreen,
        LoginScreen: LoginScreen,
    },
    {
        initialRouteName: 'MainScreen',
        navigationOptions: {
            header: null,
        },
    });

const Navigator = createAppContainer(AppStack);

class App extends Component {
    render() {
        return <Navigator/>;
    }
}

export default App;
