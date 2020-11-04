import React from "react";
import {
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

const screen = Dimensions.get("window");
const CARD_WIDTH = Math.floor(screen.width * 0.25);
const CARD_HEIGHT = Math.floor(CARD_WIDTH * (323 / 222));

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 5,
    borderRadius: 3,
  },
  cardImageEasy: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  cardImageHard: {
    width: CARD_WIDTH / 1.75,
    height: CARD_HEIGHT / 1.75,
  },
});

const getColumnOffset = (index) => {
  switch (index) {
    case 0:
      return 1.2;
    case 1:
      return 0;
    case 2:
      return -1.2;
    default:
      return 0;
  }
};

export default class Card extends React.Component {
  offset = new Animated.Value(CARD_WIDTH * getColumnOffset(this.props.index));

  componentDidMount() {
    this.timeout = setTimeout(() => {
      Animated.timing(this.offset, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { onPress, image, isVisible, isEasy } = this.props;
    let displayImage = (
      <Image source={image} style={styles.cardImageEasy} resizeMode="contain" />
    );

    if (!isVisible) {
      displayImage = (
        <Image
          source={require("../assets/card-back.png")}
          style={styles.cardImageEasy}
          resizeMode="contain"
        />
      );
    }

    // If Difficulty Hard
    if (!isEasy) {
      if (!isVisible) {
        displayImage = (
          <Image
            source={require("../assets/card-back.png")}
            style={styles.cardImageHard}
            resizeMode="contain"
          />
        );
      } else {
        displayImage = (
          <Image
            source={image}
            style={styles.cardImageHard}
            resizeMode="contain"
          />
        );
      }
    }

    const animationStyles = {
      transform: [
        {
          translateX: this.offset,
        },
      ],
    };

    return (
      <TouchableOpacity onPress={onPress}>
        <Animated.View style={[styles.card, animationStyles]}>
          {displayImage}
        </Animated.View>
      </TouchableOpacity>
    );
  }
}
