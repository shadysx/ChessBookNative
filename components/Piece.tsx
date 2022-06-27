import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { pieceSize } from './Board'

const piecesImages = {
    br: require("../assets/pieces/br.png"),
    bn: require("../assets/pieces/bn.png"),
    bb: require("../assets/pieces/bb.png"),
    bq: require("../assets/pieces/bq.png"),
    bk: require("../assets/pieces/bk.png"),
    bp: require("../assets/pieces/bp.png"),
    wr: require("../assets/pieces/wr.png"),
    wn: require("../assets/pieces/wn.png"),
    wb: require("../assets/pieces/wb.png"),
    wq: require("../assets/pieces/wq.png"),
    wk: require("../assets/pieces/wk.png"),
    wp: require("../assets/pieces/wp.png"),
}

const Piece = ({x, y, type}) => {
  return (
    <View>
        <Image 
            style={[styles.image, {top: pieceSize * y, left: pieceSize * x}]}
            source={piecesImages[`${type}`]}/>
    </View>
  )
}
const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        width: pieceSize,
        height: pieceSize,
    }
})

export default Piece