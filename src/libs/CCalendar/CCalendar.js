import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Alert,
    TouchableOpacity,
    FlatList,
    Dimensions,
    TextInput,
    Modal,
    ScrollView,
} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

class CCalendar extends Component {
    constructor(props) {
        super(props);
        this.listWeekEn = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        this.listWeekVn = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        this.listDay = ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];
        this.listMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        this.isFirstLoad = true;
        this.count = 0;
        this.state = {
            currentYear: 2020,
            listSelectedDay: [moment().utc().format('DD/MM/YYYY').toString()],
            isModalVisible: false,
            showDateTimePicker: false,
            date: moment().toDate(),
        };
    }

    onDateTimePickerChange = (event, selectedDate) => {
        if (event.type === 'set') {
            const currentDate = selectedDate || this.state.currentYear;
            this.setState({
                currentYear: moment(currentDate).year(),
                showDateTimePicker: false,
                date: currentDate,
            });
            this.input.setNativeProps({
                text: 'Tháng 01',
            });
            this.viewPager.setPageWithoutAnimation(0);
        }
    };

    onDaySelect = (day) => {
        if (this.count === 1) {
            this.setState({
                listSelectedDay: [day],
            });
            this.count = 0;
        } else if (this.state.listSelectedDay.length === 1) {
            let list = this.getDaysBetween(this.state.listSelectedDay[0], day);
            this.setState({
                listSelectedDay: list,
            });
            this.props.onSelectedRange(list);
        } else if (this.state.listSelectedDay.length === 0) {
            this.setState({
                listSelectedDay: [day],
            });
        }
    };

    getDaysBetween = (startDate, endDate) => {
        let dates = [];
        let currDate = moment(startDate, 'DD/MM/YYYY').startOf('day');
        let lastDate = moment(endDate, 'DD/MM/YYYY').startOf('day');
        if (moment(startDate, 'DD/MM/YYYY').isBefore(moment(endDate, 'DD/MM/YYYY'), 'day')) {
            currDate.subtract(1, 'days');
            while (currDate.add(1, 'days').diff(lastDate) <= 0) {
                let curDate = currDate.clone();
                dates.push(curDate.format('DD') + '/' + curDate.format('MM') + '/' + curDate.format('YYYY'));
            }
            this.count = 1;
            return dates;
        } else {
            currDate.add(1, 'days');
            while (currDate.subtract(1, 'days').diff(lastDate) >= 0) {
                let curDate = currDate.clone();
                dates.push(curDate.format('DD') + '/' + curDate.format('MM') + '/' + curDate.format('YYYY'));
            }
            this.count = 1;
            return dates;
        }
    };

    onMonthViewChange = (e) => {
        if (this.isFirstLoad) {
            this.isFirstLoad = false;
            this.viewPager.setPageWithoutAnimation(moment().month());
        } else {
            let currentMonth = this.listMonth[e.nativeEvent.position];
            this.input.setNativeProps({
                text: 'Tháng ' + currentMonth,
            });
        }
    };

    onButtonRangePress = (type) => {
        this.viewPager.setPage(moment().month());
        switch (type) {
            case 1:
                let data = [
                    parseInt(moment().utc().format('DD')) < 10 ? '0' + moment().utc().format('DD') : moment().utc().format('DD')
                        + '/' + moment().utc().format('MM')
                        + '/' + moment().utc().format('YYYY'),
                ];
                this.setState({
                    listSelectedDay: data,
                });
                this.props.onSelectedRange(data);
                break;
            case 2:
                let dateStart = moment(moment().utc().startOf('week'));
                let dateEnd = moment(moment().utc().endOf('week'));
                let dayStart = dateStart.format('DD');
                let monthStart = dateStart.format('MM');
                let yearStart = dateStart.format('YYYY');
                let dayEnd = dateEnd.format('DD');
                let monthEnd = dateEnd.format('MM');
                let yearEnd = dateEnd.format('YYYY');
                let list = [
                    (parseInt(dayStart) + 1) + '/' + monthStart + '/' + yearStart,
                    (parseInt(dayEnd) + 1) + '/' + monthEnd + '/' + yearEnd,
                ];
                let range = this.getDaysBetween(list[0], list[1]);
                this.setState({
                    listSelectedDay: range,
                });
                this.props.onSelectedRange(range);
                break;
            case 3:
                let maxDayInMonth = (moment().utc().month() + 1) === 2 ? (moment().utc().year % 4 === 0 ? '29' : this.listDay[1]) : this.listDay[moment().utc().month()];
                let dateStart2 = moment(moment().utc().startOf('month'));
                let monthStart2 = dateStart2.format('MM');
                let yearStart2 = dateStart2.format('YYYY');
                let list2 = [
                    '1/' + monthStart2 + '/' + yearStart2,
                    maxDayInMonth + '/' + monthStart2 + '/' + yearStart2,
                ];
                let range2 = this.getDaysBetween(list2[0], list2[1]);
                this.setState({
                    listSelectedDay: range2,
                });
                this.props.onSelectedRange(range2);
                break;
        }
    };

    render() {
        const {selectBackgroundColor, selectTextColor, isSelectRangeButton, monthTextColor, yearTextColor, weekTextColor} = this.props;
        return (
            <>
                {
                    this.state.showDateTimePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={this.state.date}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={this.onDateTimePickerChange}
                        />
                    )
                }
                <View style={styles.container}>
                    <View style={styles.calendarContainer}>
                        {isSelectRangeButton &&
                        <View style={styles.selectRangeButtonContainer}>
                            <TouchableOpacity
                                onPress={() => this.onButtonRangePress(1)}>
                                <View style={styles.selectRangeButton}>
                                    <Text style={styles.selectRangeText}>Hôm nay</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.onButtonRangePress(2)}>
                                <View style={styles.selectRangeButton}>
                                    <Text style={styles.selectRangeText}>Tuần này</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.onButtonRangePress(3)}>
                                <View style={styles.selectRangeButton}>
                                    <Text style={styles.selectRangeText}>Tháng này</Text>
                                </View>
                            </TouchableOpacity>
                        </View>}
                        <View style={styles.calendarHeader}>
                            <View style={{
                                width: '100%',
                                paddingLeft: 10,
                                paddingRight: 16,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <View pointerEvents='none'>
                                    <TextInput
                                        style={[styles.calendarHeaderTitle, {color: monthTextColor && monthTextColor}]}
                                        ref={ref => {
                                            this.input = ref;
                                        }}
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={() => this.setState({
                                        showDateTimePicker: true,
                                    })}>
                                    <Text
                                        style={[styles.calendarHeaderTitle, {color: yearTextColor && yearTextColor}]}>{this.state.currentYear}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.calendarWeekView}>
                                {this.listWeekVn.map((val, index) => {
                                    return <Text key={val + '/' + index} style={[styles.weekItem, { color : weekTextColor && weekTextColor}]}>{val}</Text>;
                                })}
                            </View>
                        </View>
                        <ViewPager
                            initialPage={0}
                            ref={ref => {
                                this.viewPager = ref;
                            }}
                            onPageScroll={this.onMonthViewChange}>
                            {
                                this.listMonth.map((month, index) => {
                                    let year = this.state.currentYear;
                                    let maxDayInMonth = index === 1 ? (year % 4 === 0 ? '29' : this.listDay[1]) : this.listDay[index];
                                    let listDays = [];
                                    for (let i = 1; i <= maxDayInMonth; i++) {
                                        listDays.push(i < 10 ? '0' + i : i);
                                    }
                                    return <MonthView2
                                        key={month + '/' + this.state.year}
                                        year={year}
                                        month={month}
                                        maxDayInMonth={maxDayInMonth}
                                        onDaySelect={this.onDaySelect}
                                        listSelectedDay={this.state.listSelectedDay}
                                        selectBackgroundColor={selectBackgroundColor}
                                        selectTextColor={selectTextColor}
                                        listDays={listDays}/>;
                                })
                            }
                        </ViewPager>
                    </View>
                </View>
                {/*<Modal*/}
                {/*    animationType='fade'*/}
                {/*    transparent={true}*/}
                {/*    onRequestClose={() => this.onShowPickYearDialog()}*/}
                {/*    visible={this.state.isModalVisible}>*/}
                {/*    <TouchableOpacity*/}
                {/*        onPress={() => this.onShowPickYearDialog()}>*/}
                {/*        <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>*/}
                {/*            <View style={{*/}
                {/*                backgroundColor: 'rgba(0,0,0,0.5)',*/}
                {/*                position: 'absolute',*/}
                {/*                width: '100%',*/}
                {/*                height: '100%',*/}
                {/*            }}/>*/}
                {/*            <View style={{backgroundColor: 'white', width: '100%', height: 300}}>*/}
                {/*            </View>*/}
                {/*        </View>*/}
                {/*    </TouchableOpacity>*/}
                {/*</Modal>*/}
            </>
        );
    }
}

export default CCalendar;

class MonthView2 extends Component {
    constructor(props) {
        super(props);
        this.count = 0;
        this.state = {
            line: [],
        };
    }

    componentDidMount() {
        const firstDateOfMonthWeekDay = moment(this.props.year + '-' + this.props.month + '-01').day();
        let lineCount = Math.ceil((parseInt(this.props.maxDayInMonth) + parseInt(firstDateOfMonthWeekDay)) / 7) + 1;
        let listLine = [];
        for (let i = 0; i < lineCount; i++) {
            listLine.push(i);
        }
        this.setState({
            line: listLine,
        });
    }

    render() {
        const {
            year,
            month,
            maxDayInMonth,
            listDays,
            ref,
            selectBackgroundColor,
            selectTextColor,
        } = this.props;
        const firstDateOfMonthWeekDay = moment(year + '-' + month + '-01').day();
        const listWeekLine = [0, 1, 2, 3, 4, 5, 6];
        let count = -1;
        return (
            <ScrollView>
                {this.state.line && this.state.line.map((val, index) => {
                    return <View key={val + '/' + index} style={styles.line}>
                        <View style={{flexDirection: 'row'}}>
                            {
                                listWeekLine.map((val2, index2) => {
                                    if (index === 0 && index2 >= firstDateOfMonthWeekDay) {
                                        count++;
                                        return <DayItem2 key={val2 + '/' + index2}
                                                         dayNumber={listDays[count]}
                                                         month={month}
                                                         year={year}
                                                         selectBackgroundColor={selectBackgroundColor}
                                                         selectTextColor={selectTextColor}
                                                         onDaySelect={this.props.onDaySelect}
                                                         listSelectedDay={this.props.listSelectedDay}
                                        />;
                                    } else if (index > 0 && count < listDays.length - 1) {
                                        count++;
                                        return <DayItem2 key={val2 + '/' + index2}
                                                         dayNumber={listDays[count]}
                                                         month={month}
                                                         year={year}
                                                         selectBackgroundColor={selectBackgroundColor}
                                                         selectTextColor={selectTextColor}
                                                         onDaySelect={this.props.onDaySelect}
                                                         listSelectedDay={this.props.listSelectedDay}
                                        />;
                                    } else {
                                        return <DayItem2 key={val2 + '/' + index2}
                                                         style={{borderColor: 'transparent'}}
                                                         dayNumber={''}
                                                         month={''}
                                                         year={''}
                                                         selectBackgroundColor={'transparent'}
                                                         selectTextColor={selectTextColor}
                                                         onDaySelect={this.props.onDaySelect}
                                                         listSelectedDay={this.props.listSelectedDay}
                                        />;
                                    }
                                })
                            }
                        </View>
                    </View>;
                })}
            </ScrollView>
        );
    }
}

class DayItem2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCurrentDate: false,
            isMiddleDate: false,
        };
    }

    render() {
        const {dayNumber, month, year, style, onDaySelect, listSelectedDay, selectBackgroundColor, selectTextColor} = this.props;
        let dateString = dayNumber + '/' + month + '/' + year;
        // let currentDate = moment().utc().format('DD/MM/YYYY').toString();
        // let isCurrent = currentDate === dateString;
        const styleFirstDateInRange = {
            backgroundColor: selectBackgroundColor ? selectBackgroundColor : '#66c2ff',
            borderTopLeftRadius: Math.ceil((Dimensions.get('window').width / 7) / 2),
            borderBottomLeftRadius: Math.ceil((Dimensions.get('window').width / 7) / 2),
        };
        const styleMiddleDateInRange = {
            backgroundColor: selectBackgroundColor ? selectBackgroundColor : '#66c2ff',
            borderRadius: 0,
        };
        const styleLastDateInRange = {
            backgroundColor: selectBackgroundColor ? selectBackgroundColor : '#66c2ff',
            borderTopRightRadius: Math.ceil((Dimensions.get('window').width / 7) / 2),
            borderBottomRightRadius: Math.ceil((Dimensions.get('window').width / 7) / 2),
        };
        const stylesNormal = {
            backgroundColor: selectBackgroundColor ? selectBackgroundColor : '#66c2ff',
            borderRadius: Math.ceil((Dimensions.get('window').width / 7) / 2),
        };
        return (
            <TouchableOpacity
                onPress={() => {
                    if (dayNumber !== '') {
                        onDaySelect(dayNumber + '/' + month + '/' + year);
                    }
                }}>
                <View style={[style,
                    moment(listSelectedDay[0], 'DD/MM/YYYY').isBefore(moment(listSelectedDay[listSelectedDay.length - 1], 'DD/MM/YYYY'), 'day') && listSelectedDay.includes(dateString) && listSelectedDay.indexOf(dateString) === 0 && styleFirstDateInRange,
                    moment(listSelectedDay[0], 'DD/MM/YYYY').isBefore(moment(listSelectedDay[listSelectedDay.length - 1], 'DD/MM/YYYY'), 'day') && listSelectedDay.includes(dateString) && listSelectedDay.indexOf(dateString) === listSelectedDay.length - 1 && styleLastDateInRange,
                    moment(listSelectedDay[0], 'DD/MM/YYYY').isAfter(moment(listSelectedDay[listSelectedDay.length - 1], 'DD/MM/YYYY'), 'day') && listSelectedDay.includes(dateString) && listSelectedDay.indexOf(dateString) === 0 && styleLastDateInRange,
                    moment(listSelectedDay[0], 'DD/MM/YYYY').isAfter(moment(listSelectedDay[listSelectedDay.length - 1], 'DD/MM/YYYY'), 'day') && listSelectedDay.includes(dateString) && listSelectedDay.indexOf(dateString) === listSelectedDay.length - 1 && styleFirstDateInRange,
                    listSelectedDay.length === 1 && moment(listSelectedDay[0], 'DD/MM/YYYY').isSame(moment(dateString, 'DD/MM/YYYY')) && stylesNormal,
                    listSelectedDay.includes(dateString) && listSelectedDay.indexOf(dateString) !== 0 && listSelectedDay.indexOf(dateString) !== listSelectedDay.length - 1 && styleMiddleDateInRange,
                ]}>
                    <Text
                        style={[styles.dateItemText, {color: listSelectedDay.includes(dateString) ? (selectTextColor ? selectTextColor : 'white') : 'black'}]}>{dayNumber}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },
    calendarContainer: {
        width: '100%',
    },
    calendarHeader: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarHeaderTitle: {
        height: 50,
        textAlignVertical: 'center',
        fontSize: 18,
        fontWeight: '700',
    },
    calendarWeekView: {
        flexDirection: 'row',
    },
    weekItem: {
        width: Dimensions.get('window').width / 7,
        height: Dimensions.get('window').width / 7,
        backgroundColor: 'transparent',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'grey',
        fontSize: 16,
        fontWeight: '700'
    },
    line: {
        width: '100%',
        height: Dimensions.get('window').width / 7,
        marginBottom: 2,
    },
    dateItemText: {
        height: Dimensions.get('window').width / 7,
        width: Dimensions.get('window').width / 7,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 16,
    },
    selectRangeButtonContainer: {
        marginTop: 16,
        height: 42,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 6,
        paddingBottom: 6,
    },
    selectRangeButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderColor: '#50B688',
        borderWidth: 0.7,
    },
    selectRangeText: {
        fontSize: 16,
        color: '#50B688',
        fontWeight: '600',
        textAlign: 'center',
        textAlignVertical: 'center',
        width: Dimensions.get('window').width / 3 - 32,
    },
});
