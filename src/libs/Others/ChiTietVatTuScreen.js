import React, { Component, PureComponent } from 'react'
import { View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity, Dimensions, Alert } from 'react-native';

import IconSearch from '../../../assets/images/ic_search.svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const DATA = [
    {
        ma: 'Gb37658',
        ten: 'Sản phẩm mẫu 1',
        slYeuCau: '15 cái',
        slChoMuon: '15 cái',
        ngayTraDK: '10/10/2019',
        number: 0,
    },
    {
        ma: 'Gb22222',
        ten: 'Sản phẩm mẫu 2',
        slYeuCau: '17 cái',
        slChoMuon: '17 cái',
        ngayTraDK: '12/15/2019',
        number: 0,
    },
    {
        ma: 'ES3213',
        ten: 'Sản phẩm mẫu 3',
        slYeuCau: '12 cái',
        slChoMuon: '12 cái',
        ngayTraDK: '03/06/2019',
        number: 0,
    },
    {
        ma: 'Gb376582',
        ten: 'Sản phẩm mẫu 4',
        slYeuCau: '15 cái',
        slChoMuon: '15 cái',
        ngayTraDK: '05/10/2019',
        number: 0,
    },
    {
        ma: 'Gb222221',
        ten: 'Sản phẩm mẫu 5',
        slYeuCau: '17 cái',
        slChoMuon: '17 cái',
        ngayTraDK: '02/15/2019',
        number: 0,
    },
    {
        ma: 'ES389213',
        ten: 'Sản phẩm mẫu 7',
        slYeuCau: '12 cái',
        slChoMuon: '12 cái',
        ngayTraDK: '01/29/2019',
        number: 0,
    },
];

class Item extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showDateTimePicker: false,
            date: new Date(this.props.data.ngayTraDK),
        }
    }

    onDateTimePickerChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date;
        this.setState({
            date: currentDate,
            showDateTimePicker: false,
        });
        this.props.onDateSelected(this.props.index, this.state.date);
    }

    onPickDate = () => {
        this.setState({
            showDateTimePicker: true
        })
    }


    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.number != this.props.data.number || nextProps.ngayTraDK != this.props.data.ngayTraDK;
    }

    render() {
        const { data, index, onIncrease, onDecrease } = this.props;
        return (
            <View style={styles.itemContainer}>
                <Image style={styles.image} source={require('../../../assets/images/example.png')} resizeMode={'contain'} />
                {/* <Image style={styles.image} source={{uri:'https://facebook.github.io/react/logo-og.png'}} resizeMode={'contain'} /> */}
                <View style={styles.content}>
                    <Text
                        numberOfLines={2}
                        ellipsizeMode={'tail'}
                        style={styles.title1}>
                        {data.ten}
                    </Text>
                    <Text
                        numberOfLines={2}
                        ellipsizeMode={'tail'}
                        style={styles.title2}>
                        Mã: {data.ma}
                    </Text>
                    <Text
                        numberOfLines={2}
                        ellipsizeMode={'tail'}
                        style={styles.title2}>
                        SL yêu cầu: {data.slYeuCau}
                    </Text>
                    <Text
                        numberOfLines={2}
                        ellipsizeMode={'tail'}
                        style={styles.title2}>
                        SL cho mượn: {data.slChoMuon}
                    </Text>
                    <TouchableOpacity
                        onPress={this.onPickDate}>
                        <Text
                            numberOfLines={2}
                            ellipsizeMode={'tail'}
                            style={styles.title1}>
                            Ngày trả DK {data.ngayTraDK}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputNumber}>
                    <TouchableOpacity
                        onPress={() => onIncrease(index)}>
                        <View style={styles.button}>
                            <Text style={styles.titleButton}>+</Text>
                        </View>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.inputValue}
                        keyboardType={'numeric'}
                        blurOnSubmit={true}
                        value={data.number.toString()}
                    />
                    <TouchableOpacity
                        onPress={() => onDecrease(index)}>
                        <View style={styles.button}>
                            <Text style={styles.titleButton}>-</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
            </View>
        )
    }
}

class ChiTietVatTuScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            searchValue: '',
            listData: DATA,
        }
    }

    _onChangeText(name) {
        return (value) => {
            this.setState({
                [name]: value
            })
        }
    }

    onIncrease = (index) => {
        let list = this.state.listData;
        list[index].number = parseInt(list[index].number) + 1;
        this.setState({
            listData: list
        })
    }


    onDecrease = (index) => {
        let list = this.state.listData;
        if (parseInt(list[index].number) > 0) {
            list[index].number = parseInt(list[index].number) - 1;
        }
        else {
            Alert.alert(
                'Thông báo',
                'Số lượng không được âm',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: true },
            );
        }
        this.setState({
            listData: list
        })
    }

    onDateSelected = (index, date) => {
        let list = this.state.listData;
        let date2 = new Date(date);
        var dd = date2.getDate()
        var mm = date2.getMonth() + 1
        var yyyy = date2.getFullYear()
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var mDate = mm + '/' + dd + '/' + yyyy;
        list[index].ngayTraDK = mDate;
        this.setState({
            listData: list
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <IconSearch
                        width={20}
                        height={20} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder=' Tìm kiếm vật tư'
                        placeholderTextColor='#808080'
                        returnKeyType={'search'}
                        autoCapitalize='none'
                        blurOnSubmit={true}
                        onChangeText={this._onChangeText('searchValue')}
                        onSubmitEditing={() => { console.log('search') }}
                        value={this.state.searchValue}
                    />
                </View>
                <FlatList
                    data={this.state.listData}
                    keyExtractor={item => item.ma}
                    extraData={this.state.listData}
                    keyboardShouldPersistTaps={'handled'}
                    removeClippedSubviews={false}
                    renderItem={
                        ({ item, index }) => <Item data={item} index={index} onIncrease={this.onIncrease} onDecrease={this.onDecrease} onDateSelected={this.onDateSelected} />
                    }
                />
            </View>
        )
    }
}

export default ChiTietVatTuScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16
    },
    searchContainer: {
        width: '100%',
        backgroundColor: '#F1F1F1',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 2,
        paddingLeft: 16,
        paddingRight: 16
    },
    searchInput: {
        borderColor: 'transparent',
        flex: 1
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#FAFAFC',
        marginTop: 10,
        borderRadius: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 6
    },
    image: {
        width: Dimensions.get('window').width * 0.22,
        height: Dimensions.get('window').width * 0.22,
    },
    content: {
        paddingLeft: 6,
        paddingRight: 6,
        flex: 1,
    },
    title1: {
        fontWeight: '700',
        fontSize: 18
    },
    title2: {
        fontSize: 16
    },
    inputNumber: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 6,
    },
    titleButton: {
        color: '#FF9C12',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#FAE6CA',
        borderColor: 'transparent',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 20,
    },
    inputValue: {
        borderRadius: 8,
        height: 26,
        margin: 3,
        padding: 2,
        width: 40,
        backgroundColor: 'white',
        borderColor: '#FAE6CA',
        borderWidth: 1,
        textAlign: 'center'
    }
});
