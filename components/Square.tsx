import React from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'

export const colors = {
    black: "rgb(58, 176, 255)",
    white: "rgb(230, 233, 230)",
}

const Square = ({ row, col }) => {
    const offset: any = row % 2 === 0 ? 1 : 0;
    const backgroundColor = (col + offset) % 2 === 0 ? colors.black : colors.white;
    return (
        <View style={{ flex: 1, backgroundColor, justifyContent: 'space-between' }}>
            <Text style={{ opacity: col === 0 ? 1 : 0, fontWeight: 'bold' }}>{8 - row}</Text>
            <Text style={{ alignSelf: "flex-end", opacity: row === 7 ? 1 : 0, fontWeight: 'bold' }}>{String.fromCharCode("a".charCodeAt(0) + col)}</Text>
        </View>
    );
}    

export default Square