import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native';
class ExpandableListView extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        const { dataHeader, dataItem } = this.props;
        return (
            <FlatList
                data={dataHeader}
                keyExtractor={(item, index) => item + '-' + index}
                keyboardShouldPersistTaps={'handled'}
                renderItem={
                    ({ item, index }) => <Item header={item} data={dataItem} index={index} />
                }
            />
        )
    }
}

export default ExpandableListView;

class Item extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        const { header, data, index } = this.props;
        return (
            <View style={{ backgroundColor: 'white', paddingLeft: 20 }}>
                <Text>{header}</Text>
                <FlatList
                    data={data[index].data}
                    keyExtractor={(item, index) => item + '-' + index}
                    keyboardShouldPersistTaps={'handled'}
                    renderItem={
                        ({ item, index }) => <ItemSub data={item} index={index} />
                    }
                />
            </View>

        )
    }
}

class ItemSub extends Component {
    render() {
        const { data, index } = this.props;
        return (
            <Text>{data}</Text>
        )
    }
}