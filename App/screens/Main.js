import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  Image,
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
  button: {
    borderRadius: 10,
    borderColor: "#000",
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 2,
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    color: "#fff",
    fontSize: 40,
    padding: 5,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default class Main extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safearea}>
          <Image
            style={styles.icon}
            source={require("../assets/card-main.png")}
          />
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("Game", { isEasy: true })
              }
            >
              <Text style={styles.text}>Easy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
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
