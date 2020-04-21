import React, {Component} from 'react';
import NativeToast from './NativeToast';
import { View, Text, TouchableOpacity} from 'react-native';

class NativeToastScreen extends Component {
    showToast = () => {
        NativeToast.show("test", NativeToast.SHORT);
    }

    render() {
        return (
            <TouchableOpacity
                onPress={()=>this.showToast()}>
                <View>
                    <Text>Toast</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default NativeToastScreen;
