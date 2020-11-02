import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";

import Card from "cards/App/components/Card";
import Row from "cards/App/components/Row";

import { AVAILABLE_CARDS } from "../data/availableCards";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7CB48F",
    flex: 1,
  },
  safearea: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default class Game extends React.Component {
  state = {
    data: [],
    moveCount: 0,
    selectedIndices: [],
    currentImage: null,
    matchedPairs: [],
    isDifficultyEasy: this.props.navigation.getParam("isEasy"),
  };

  componentDidMount() {
    this.setState({
      isDifficultyEasy: this.props.navigation.getParam("isEasy"),
    });
    // console.log("prop isDiff", this.state.isDifficultyEasy);
    this.draw();
  }

  componentDidUpdate() {
    if (this.state.matchedPairs.length >= 6) {
      this.gameComplete();
    }
  }

  gameComplete = () => {
    Alert.alert(
      "Winner!",
      `You completed the puzzle in ${this.state.moveCount} moves!`,
      [
        {
          text: "Home",
          onPress: () => this.props.navigation.navigate("Main"),
        },
      ]
    );
  };

  draw = () => {
    const possibleCards = [...AVAILABLE_CARDS];
    const selectedCards = [];
    let numCards;

    if (this.state.isDifficultyEasy) {
      numCards = 6;
    } else {
      numCards = 15;
    }

    for (let i = 0; i < numCards; i += 1) {
      const randomIndex = Math.floor(Math.random() * possibleCards.length);
      const card = possibleCards[randomIndex];

      selectedCards.push(card);
      selectedCards.push(card);

      possibleCards.splice(randomIndex, 1);
    }

    selectedCards.sort(() => 0.5 - Math.random());

    const cardRow = [];
    let columnSize;
    let index = 0;

    if (this.state.isDifficultyEasy) {
      columnSize = 3;
    } else {
      columnSize = 5;
    }

    while (index < selectedCards.length) {
      cardRow.push(selectedCards.slice(index, columnSize + index));
      index += columnSize;
    }

    const data = cardRow.map((row, i) => {
      return {
        name: i,
        columns: row.map((image) => ({ image })),
      };
    });

    this.setState({ data });
  };

  handleCardPress = (cardId, image) => {
    let callWithUserParams = false;
    this.setState(
      ({ selectedIndices, currentImage, matchedPairs, moveCount }) => {
        const nextState = {};

        if (selectedIndices.length > 1) {
          callWithUserParams = true;
          return { selectedIndices: [] };
        }

        nextState.moveCount = moveCount + 1;
        if (selectedIndices.length === 1) {
          if (image === currentImage && !selectedIndices.includes(cardId)) {
            nextState.currentImage = null;
            nextState.matchedPairs = [...matchedPairs, image];
          }
        } else {
          nextState.currentImage = image;
        }

        nextState.selectedIndices = [...selectedIndices, cardId];

        return nextState;
      },
      () => {
        if (callWithUserParams) {
          this.handleCardPress(cardId, image);
        }
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safearea}>
          {this.state.data.map((row, rowIndex) => (
            <Row
              key={row.name}
              index={rowIndex}
              diffEasy={this.state.isDifficultyEasy}
            >
              {row.columns.map((card, index) => {
                const cardId = `${row.name}-${card.image}-${index}`;

                return (
                  <Card
                    key={cardId}
                    index={index}
                    onPress={() => this.handleCardPress(cardId, card.image)}
                    image={card.image}
                    isVisible={
                      this.state.selectedIndices.includes(cardId) ||
                      this.state.matchedPairs.includes(card.image)
                    }
                  />
                );
              })}
            </Row>
          ))}
        </SafeAreaView>
      </View>
    );
  }
}
