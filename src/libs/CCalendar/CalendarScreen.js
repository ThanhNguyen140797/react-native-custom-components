import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import CCalendar from './CCalendar';

//example
class CalendarScreen extends Component {

    onSelectedRange = (list)=>{
       console.log(list);
    };

    render() {
        return (
            <CCalendar
                isSelectRangeButton={true}
                onSelectedRange={this.onSelectedRange}
            />
        );
    }
}

export default CalendarScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',

    },
});
