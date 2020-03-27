import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';

const listModule = [
    {
        name: 'LoginScreen',
    },
    {
        name: 'ChiTietVatTuScreen',
    },
    {
        name: 'CalendarScreen',
    },
    // {
    //     name: 'ExpandableListViewScreen'
    // }
];

class MainScreen extends Component {

    navigateScreen = (name) => {
        this.props.navigation.navigate(name);
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={listModule}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => <Item name={item.name} onPress={this.navigateScreen}/>}
                />
            </View>
        );
    }
}

class Item extends Component{
    render () {
        const {name, onPress} = this.props;
        return (
           <TouchableOpacity
                onPress={()=> onPress(name)}
           >
               <View style={styles.itemContainer}>
                   <Text style={styles.itemTitle}>{name}</Text>
               </View>
           </TouchableOpacity>
        )
    }
}

const styles ={
    container: {
        width: '100%',
        backgroundColor: 'white'
    },
    itemContainer:{
        width: '100%',
        height: 50,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
    },
    itemTitle:{
        fontSize: 16,
    }
};

export default MainScreen;
