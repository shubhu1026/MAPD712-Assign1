import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { CustomPicker } from "react-native-custom-picker";

export default function App() {
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [bmi, setBMI] = React.useState("");

  const [selectedSystem, setSelectedSystem] = useState("metric");

  const OnSubmit = () => {
    let h = parseFloat(height);
    let w = parseFloat(weight);

    if (selectedSystem === "standard") {
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
        <Text style={styles.label}>Unit System:</Text>

        <CustomPicker
          options={options}
          onValueChange={(value) => {
            setSelectedSystem(value.toLowerCase());
          }}
          style={styles.picker}
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
        />
      </View>
      <Text style={styles.result}>Your BMI: {bmi}</Text>
      <Button onPress={OnSubmit} title="Calculate BMI" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  unitPicker: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  picker: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  result: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
  },
});
