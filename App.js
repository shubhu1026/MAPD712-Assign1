import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import { CustomPicker } from "react-native-custom-picker";

export default function App() {
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [bmi, setBMI] = React.useState("");

  const [selectedSystem, setSelectedSystem] = useState("metric");

  const OnSubmit = () => {
    let h = parseFloat(height);
    let w = parseFloat(weight);

    if (selectedSystem != "Metric" && selectedSystem != "Standard") {
      Alert.alert(
        "Alert",
        "Please select a unit system before pressing the 'Calculate' button",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      return;
    }
    if (selectedSystem.toLowerCase() === "standard") {
      // Convert feet to cm
      h *= 30.48;

      // Convert lbs to kg
      w *= 0.453592;
    }

    // Convert m to cm
    h /= 100;

    // BMI formula and output only 2 digits after decimal
    const b = (w / (h * h)).toFixed(2);
    setBMI(b);
  };

  const options = ["Metric", "Standard"];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>BMI Calculator</Text>

      <View style={styles.unitPicker}>
        <Text>Unit System:</Text>

        <CustomPicker
          options={options}
          onValueChange={(value) => {
            setSelectedSystem(value);
          }}
          style={styles.picker}
          textStyle={{ color: "#b5c6e0" }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your weight"
          onChangeText={(text) => setWeight(text)}
          value={weight}
          keyboardType="numeric"
          placeholderTextColor="#333"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Height</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your height"
          onChangeText={(text) => setHeight(text)}
          value={height}
          keyboardType="numeric"
          placeholderTextColor="#333"
        />
      </View>
      <Text style={styles.result}>Your BMI: {bmi}</Text>
      <Button onPress={OnSubmit} title="Calculate BMI" color="#b5c6e0" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebf4f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  unitPicker: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
    color: "#333",
  },
  picker: {
    borderColor: "#b5c6e0",
    color: "#b5c6e0",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    borderColor: "#b5c6e0",
    borderWidth: 1,
    padding: 8,
    fontSize: 16,
    color: "#333",
  },
  result: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
