import { View, Text, StyleSheet, Dimensions, Image, Button, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Row from './Row'
import { Chess } from 'chess.js'
import { ChessInstance } from "chess.js";
import Piece from './Piece'
import 'react-native-get-random-values';
import { pieceSize } from './Piece';

const Board = () => {
    const [chess] = useState<ChessInstance>(
        new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
      );
    const [fen, setFen] = useState(chess.fen())
    const [board, setBoard] = useState(chess.board())
    const [movingPiecePosition, setMovingPiecePosition] = useState('')
    const [legalMoves, setLegalMoves] = useState(["00"])
    const [isMoving, setIsMoving] = useState(false)
    const [pieceStartPosition, setPieceStartPosition] = useState("")
    const [pieceType, setPieceType] = useState("")
    const [pieceEndPosition, setPieceEndPosition] = useState("")
    const [update, setUpdated] = useState(false)

    //Be aware that index XY axis are supposed to be in this order, but when we use Board[Y][X]
    const HandleMove = (pieceIndex) => {
        console.log("--------------")
        let piecePosition = convertIndexToPos(pieceIndex)

        

                
            if (isMoving) {
                CheckIfTake(pieceIndex) 
                if(legalMoves.includes(piecePosition)){
                    PlayMove(piecePosition, pieceType)
                    setIsMoving(false)
                    console.log("Went through -> 1")
                    console.log(`To: ${piecePosition}, From: ${pieceStartPosition}`)
                }

                    setIsMoving(false)
                    setLegalMoves([])
                    setPieceStartPosition("")
                    console.log("Went through -> 2")

            }
            //Check if my first target is null, if yes just return
            // if(board[pieceIndex[1]][pieceIndex[0]] == null) { 
            //     return
            // }
            
            //Control if not clicking again on the same piece
            else if (piecePosition != pieceStartPosition){
                console.log(`(Starting) Piece Index (XY): ${pieceIndex} Position: ${piecePosition}`)
                if(board[pieceIndex[1]][pieceIndex[0]] == null) { 
                    setPieceStartPosition("")
                    RefreshLegalMoves([])
                    setIsMoving(false)
                    console.log("Went through -> 3")
                }
                //If != null means that the piece want to go on a empty cell wich is good 
                else {
                    setPieceStartPosition(piecePosition)
                    RefreshLegalMoves(piecePosition)
                    setIsMoving(true)
                    setPieceType(GetPieceType(pieceIndex))
                    console.log("Went through -> 4")
                }

            }
            
            // //Control if click again on the same piece
            // else if (piecePosition == movingPiecePosition ){
            //     setMovingPiecePosition("")
            //     setLegalMoves([])
            //     setIsMoving(false)
            //     console.log("5")
            // }
            
    }

    const CheckIfTake = (pieceIndex) => {
        let x = parseInt(pieceIndex[0])
        let y = parseInt(pieceIndex[1]) 
        let isTaking = false

        board.map((row, j) => {
            row.map((square, i) => {
                if(j == y && i == x && square != null) {
                    isTaking = true
                }
            })
        })
        return isTaking
    }

    const PlayMove = (pieceEndPosition, pieceType) => {
        let pieceEndIndex = convertPosToIndex(pieceEndPosition)
        let isTaking = CheckIfTake(pieceEndIndex)
        let move = ""
        console.log("IsTaking? ", isTaking)

        //Not taking
        if (!isTaking) {
            switch(pieceType){
                case 'p' :
                    console.log("Its a pawn")
                    //En passant
                    if(pieceStartPosition[0] != pieceEndPosition[0]){
                        move = pieceStartPosition[0] + "x" + pieceEndPosition
                    }
                    //Normal takes
                    else {
                        move = pieceEndPosition
                    }
                    break
                case 'n' :
                    console.log("Its a knight")
                    move = "N" + pieceEndPosition
                    break
                case 'b' :
                    console.log("Its a bishop")
                    move = "B" + pieceEndPosition
                    break
                case 'r' :
                    console.log("Its a Rook")
                    move = "R" + pieceEndPosition
                    break
                case 'q' :
                    console.log("Its a Queen")
                    move = "Q" + pieceEndPosition
                    break
                case 'k' :
                    console.log("Its a King")
                    move = "K" + pieceEndPosition
                    break
            } 

        }
        //Taking
        else if(isTaking){
            switch(pieceType){
                case 'p' :
                    console.log("Its a pawn")
                    move =  pieceStartPosition[0] + "x" + pieceEndPosition
                    break
                case 'n' :
                    console.log("Its a knight")
                    move = "N" + "x" + pieceEndPosition
                    break
                case 'b' :
                    console.log("Its a bishop")
                    move = "B" + "x" + pieceEndPosition
                    break
                case 'r' :
                    console.log("Its a Rook")
                    move = "R" + "x" + pieceEndPosition
                    break
                case 'q' :
                    console.log("Its a Queen")
                    move = "Q" + "x" + pieceEndPosition
                    break
                case 'k' :
                    console.log("Its a King")
                    move = "K" + "x" + pieceEndPosition
                    break
            }
        }
        
        console.log("Move input: ", move)
        chess.move(move)   
        setBoard(chess.board())
    }



    const resetGame = () => {
        chess.reset()
        setBoard(chess.board())
        setLegalMoves([])
        setMovingPiecePosition("")
    }

    const GetPieceType = (index: string) : string => {
        let x = parseInt(index[0])
        let y = parseInt(index[1])

        if (board[y][x] == null) {
            return "not a piece"
        }
        else {
            return board[y][x].type
        }
    }

    const RefreshLegalMoves = (piecePosition) => {
        let moves = chess.moves({square: piecePosition})
        let legalMoves = []

        console.log("list of legal moves")
        moves.map(move => {
            if(move.slice(-1) == "+" || move.slice(-1) == "#") {
                
                legalMoves.push(move.slice(0, -1).slice(-2))
            }
            else {
                legalMoves.push(move.slice(-2))
            }

            console.log(move)
        })

        setLegalMoves([...legalMoves])

    }

    const showLegalMoves = (i, j) => {
        let isLegal = false
        legalMoves.map(move => {
            if (convertPosToIndex(move) == `${i}${j}`) {
                isLegal = true
            }
        })
        //return sLegal
        return isLegal
    }

    const convertIndexToPos = (index : string) : string => {
        //ex 32 = d6
        let x = index[0]
        let y = parseInt(index[1])
        switch(x) {
            case '0': 
                return 'a' + `${8 - y}`
            case '1': 
                return 'b' + `${8 - y}`
            case '2': 
                return 'c' + `${8 - y}`
            case '3': 
                return 'd' + `${8 - y}`
            case '4': 
                return 'e' + `${8 - y}`
            case '5': 
                return 'f' + `${8 - y}`
            case '6': 
                return 'g' + `${8 - y}`
            case '7': 
                return 'h' + `${8 - y}`
        }
    }

    const convertPosToIndex = (pos : string) : string => {
        //ex d6 = 23
        let x = pos[0]
        let y = parseInt(pos[1])
        switch(x) {
            case 'a':
                return (`0${8 - y}`)
            case 'b':
                return (`1${8 - y}`)
            case 'c':
                return (`2${8 - y}`)
            case 'd':
                return (`3${8 - y}`)
            case 'e':
                return (`4${8 - y}`)
            case 'f':
                return (`5${8 - y}`)
            case 'g':
                return (`6${8 - y}`)
            case 'h':
                return (`7${8 - y}`)
            default:
              // code block
          }
    }

    useEffect(() => {
        //console.log('Legal Moves', legalMoves)
        console.log(pieceType)
    })
    

  return (
    <View>
        <Background/>
        <View style={styles.board}>
            {
                board.map((row, y) => (
                    row.map((square, x) => {
                            return (
                                <View>
                                    <TouchableOpacity onPress={(() => HandleMove(`${x}${y}`))}>
                                        {square && 
                                            <Piece 
                                                square={square.square}
                                                key={`${y}${x}${square.color}${square.type}`} 
                                                movingPiece={pieceStartPosition}
                                                x={x} 
                                                y={y} 
                                                type={`${square.color}${square.type}`}/>
                                        }
                                        {/*Legal Moves Layout */} 
                                        {<View style={[styles.layout, {top: pieceSize * y, left: pieceSize * x, backgroundColor: showLegalMoves(x, y) ? 'lightblue' : 'transparent' }]}></View>}
                                    </TouchableOpacity>
                                </View>
                            )
                    })
                ))
            }
        </View>
        <Button title="reset" onPress={resetGame}/>
    </View>
  )
}


const styles = StyleSheet.create({
    background: {
        height: Dimensions.get('window').width,
    },
    board: {
        position: 'absolute',
    },
    image: {
        width: pieceSize,
        height: pieceSize,
        top: pieceSize * 2
    },
    input: {
        borderColor: 'black',
        borderWidth: 1
    },
    layout: {
        position: 'absolute', height: pieceSize, width: pieceSize, zIndex: -1
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
