import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
} from "react-native";

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
  buttonView: {},
  button: {},
  text: {},
});

export default class Main extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safearea}>
          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Game", { isEasy: true })
              }
            >
              <Text style={styles.text}>Easy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Game", { isEasy: false })
              }
            >
              <Text style={styles.text}>Hard</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
