import { View, Text, StyleSheet, Dimensions, Image, Button, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Row from './Row'
import { Chess } from 'chess.js'
import { ChessInstance } from "chess.js";
//import Piece from './Piece'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


export const colors = {
    black: "rgb(58, 176, 255)",
    white: "rgb(230, 233, 230)",
}

export const pieceSize = Dimensions.get('window').width / 8

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


const Board = () => {
    const [chess] = useState<ChessInstance>(
        new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
      );
    const [fen, setFen] = useState(chess.fen())
    const [board, setBoard] = useState(chess.board())
    const [input, setInput] = useState("")

    const playMove = () => {
        chess.move(input)   
        console.log(chess.get_comment())
        console.log(chess.history())
        console.log(fen)
        setBoard(chess.board())
    }


    const resetGame = () => {
        chess.reset()
        setBoard(chess.board())
        console.log(chess.ascii())
    }


    useEffect(() => {
    },[board])

  return (
    <View>
        <Background/>
        <View style={styles.piecesLayer}>
            {
                board.map((row, i) => (
                    row.map((square, j) => {
                        if (square != null) {
                            return (
                                <Image 
                                    style={[styles.image, {top: pieceSize * i, left: pieceSize * j}]}
                                    source={piecesImages[`${square.color}${square.type}`]}/>
                            )
                        }
                    })
                ))
            }
        </View>
        <Button onPress={playMove} title="Play"/>
        <TextInput autoCapitalize="none" style={styles.input} onChangeText={setInput}/>
        <Button title="reset" onPress={resetGame}/>
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
    },
    input: {
        borderColor: 'black',
        borderWidth: 1
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
        </View>
    )
}

export default Board