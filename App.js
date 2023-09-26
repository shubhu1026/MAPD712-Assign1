import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [bmi, setBMI] = React.useState("");

  const OnSubmit = () => {
    h = parseInt(height);
    w = parseInt(weight);
    b = w / (h * h);
    setBMI(b);
  };

  return (
    <View style={styles.container}>
      <Text>Weight</Text>
      <TextInput
        placeholder="Enter your weight"
        onChangeText={(text) => setWeight(text)}
        value={weight}
      ></TextInput>

      <Text>Height</Text>
      <TextInput
        placeholder="Enter your height"
        onChangeText={(text) => setHeight(text)}
        value={height}
      ></TextInput>

      <Text>{bmi}</Text>
      <Text>{height}</Text>
      <Text>{weight}</Text>
      <Button onPress={OnSubmit} title="Compute BMI"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
