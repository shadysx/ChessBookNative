import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import Row from './Row'
import { Chess } from 'chess.js'
import Piece from './Piece'

export const colors = {
    black: "rgb(58, 176, 255)",
    white: "rgb(230, 233, 230)",
}

export const pieceSize = Dimensions.get('window').width / 8

const Board = () => {
    const chess = new Chess()
    const [state, setState] = useState({
        player: "w",
        board: chess.board()
    })
  return (
    <View>
        <Background/>
        <View style={styles.piecesLayer}>
            {
                state.board.map((row, i) => (
                    row.map((square, j) => {

                        console.log(square)
                        if (square != null) {
                            return (
                                <Piece x={j} y={i} type={`${square.color}${square.type}`}/>
                            )
                        }
                    })
                ))
                    

            }
        </View>


      
    </View>
  )
}

const styles = StyleSheet.create({
    background: {
        height: Dimensions.get('window').width,
    },
    piecesLayer: {
        borderColor: 'red',
        position: 'absolute',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    image: {
        position: 'absolute',
        width: pieceSize,
        height: pieceSize,
        top: pieceSize * 2
        
    }
})

export const Background = () => {
    return (
        <View style={styles.background}>
        {
            new Array(8).fill(0).map((_, row) => (
                <Row key={row} row={row} />
            ))

        }
        {
        }
        </View>
    )
}

export default Board