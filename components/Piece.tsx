import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import { Chess } from 'chess.js'
import Square from './Square'

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

const Piece = ({x, y, type, movingPiece, square }) => {
  //START GESTURE CONTROL
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const animatedStyles = useAnimatedStyle(() => {

    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        //{ scale: withSpring(isPressed.value ? 1.2 : 1) },
      ],
      //backgroundColor: isPressed.value ? 'yellow' : 'blue',
    };
  });

  const start = useSharedValue({ x: 0, y: 0 });
  const gesture = Gesture.Pan()
  .onBegin(() => {
    isPressed.value = true;
  })
  .onUpdate((e) => {
    offset.value = {
      x: e.translationX + start.value.x,
      y: e.translationY + start.value.y,
    };
  })
  .onEnd(() => {
    start.value = {
      x: offset.value.x,
      y: offset.value.y,
    };
    console.log(offset.value)
  })
  .onFinalize(() => {
    isPressed.value = false;
  });
  //END GESTURE CONTROL



  return (
    <View>
        {/* <GestureDetector gesture={gesture}>
            <Animated.View style={animatedStyles}> */}

                <Image 
                    style={[styles.image, {top: pieceSize * y, left: pieceSize * x, backgroundColor: square == movingPiece ? 'lightblue' : 'transparent' }]}
                    source={piecesImages[`${type}`]}/>
 

            {/* </Animated.View>
        </GestureDetector> */}
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