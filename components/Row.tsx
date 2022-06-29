import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Square from './Square'


const Row = ({ row }) => {
    return (
        <View style={styles.row}>
            {new Array(8).fill(0).map((_, col) => (<Square key={col} row={row} col={col} />))}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
    }
})

export default Row
