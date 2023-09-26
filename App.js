import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { CustomPicker } from "react-native-custom-picker";

export default function App() {
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [bmi, setBMI] = React.useState("");
  const [weightStatus, setWeightStatus] = React.useState("");

  const [selectedSystem, setSelectedSystem] = useState("metric");

  const OnSubmit = () => {
    // Check if the user has selected a unit system for bmi calculation
    if (selectedSystem != "Metric" && selectedSystem != "Standard") {
      Alert.alert(
        "Alert",
        "Please select a unit system before pressing the 'Calculate' button",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      return;
    }

    // check if the user has entered both height and weight values
    if (height == "" || weight == "") {
      Alert.alert(
        "Alert",
        "Please input values before pressing the 'Calculate' button",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      return;
    }

    let h = parseFloat(height);
    let w = parseFloat(weight);

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

    // set weight status according to the bmi
    if (b < 18.5) setWeightStatus("Underweight");
    else if (b >= 18.5 && b < 25) setWeightStatus("Healthy Weight");
    else if (b >= 25 && b < 30) setWeightStatus("Overweight");
    else setWeightStatus("Obesity");
  };

  // Clear function called when clear button is pressed to clear all values
  const OnClear = () => {
    setWeight("");
    setBMI("");
    setHeight("");
    setWeightStatus("");
  };

  const options = ["Metric", "Standard"];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.heading}>BMI Calculator</Text>

        <View style={styles.unitPicker}>
          <Text>Measurement System:</Text>

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
          <Text style={styles.label}>
            Weight{" "}
            {selectedSystem == "Metric"
              ? "(kg)"
              : selectedSystem == "Standard"
              ? "(lbs)"
              : ""}
          </Text>
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
          <Text style={styles.label}>
            Height{" "}
            {selectedSystem == "Metric"
              ? "(cms)"
              : selectedSystem == "Standard"
              ? "(feet)"
              : ""}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your height"
            onChangeText={(text) => setHeight(text)}
            value={height}
            keyboardType="numeric"
            placeholderTextColor="#333"
          />
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button onPress={OnSubmit} title="Calculate BMI" color="#b5c6e0" />
          </View>
          <View style={styles.button}>
            <Button onPress={OnClear} title="Clear" color="#b5c6e0" />
          </View>
        </View>

        <Text style={styles.result}>Your BMI: {bmi}</Text>
        <Text style={styles.result}>{weightStatus}</Text>
      </View>
    </TouchableWithoutFeedback>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});
