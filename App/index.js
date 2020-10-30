import React from "react";
import { Button, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Main from "cards/App/screens/Main";
import Game from "cards/App/screens/Game";

const MainStack = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const GameStack = createStackNavigator({
  Game: {
    screen: Game,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const App = createSwitchNavigator({
  MainStack,
  GameStack,
});

export default createAppContainer(App);
