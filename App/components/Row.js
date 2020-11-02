import React from "react";
import { Animated, StyleSheet, Dimensions } from "react-native";

const screen = Dimensions.get("window");
let CARD_WIDTH;
let CARD_HEIGHT;

const getRowOffset = (index) => {
  switch (index) {
    case 0:
      return 1.5;
    case 1:
      return 0.5;
    case 2:
      return -0.5;
    case 3:
      return -1.5;
    default:
      return 0;
  }
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
});

export default class Row extends React.Component {
  offset = new Animated.Value(CARD_HEIGHT * getRowOffset(this.props.index));
  opacity = new Animated.Value(0);
  // isEasy = this.props.diffEasy;

  componentDidMount() {
    if (this.props.diffEasy) {
      CARD_WIDTH = Math.floor(screen.width * 0.25);
      CARD_HEIGHT = Math.floor(CARD_WIDTH * (323 / 222));
    } else {
      CARD_WIDTH = Math.floor(screen.width * 2);
      CARD_HEIGHT = Math.floor(CARD_WIDTH * 2);
    }

    this.timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(this.offset, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(this.opacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const animationStyles = {
      opacity: this.opacity,
      transform: [
        {
          translateY: this.offset,
        },
      ],
    };
    return (
      <Animated.View style={[styles.row, animationStyles]}>
        {this.props.children}
      </Animated.View>
    );
  }
}
