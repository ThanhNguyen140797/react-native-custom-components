import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import ExpandableListView from './ExpandableListView';

const DATA1 = [
    "DFT",
    "DHN",
    "DIR",
    "DMF",
    "DNT",
    "DAM",
    "DSM",
    "DCS",
    "DHR"
]

const DATA2 = [
    {
        "data": ["PFDV","PFDP","PCLD"]
    },
    {
        "data": [
            "PHNC",
        ]
    },
    {
        "data": [
            "GDIR",
            "GBOD",
        ]
    },
    {
        "data": [
            "PMDV",
            "PMDP",
            "PMRD",
        ]
    },
    {
        "data": [
            "PTEC",
            "PWEB",
            "PWIN",
            "PAPI",
            "PQAC",
            "PFED",
        ]
    },
    {
        "data": [
            "PACT",
            "PHRM",
            "PCOM",
            "PPCO",
        ]
    },
    {
        "data": [
            "PSLS",
        ]
    },
    {
        "data": [
            "PCSR",
            "PCE3",
            "PCE2",
            "PCDV",
        ]
    },
    {
        "data": [
            "PHDV",
            "PHDP",
            "PHCS",
            "PHCA"
        ]
    }
]

export default class ExpandableListViewScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ExpandableListView
                    dataHeader={DATA1}
                    dataItem={DATA2}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor:'red'
    }
});
