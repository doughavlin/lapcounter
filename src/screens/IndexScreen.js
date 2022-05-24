import React, { useState, useContext, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { Context as OptionsContext } from "../context/OptionsContext";
import { Context } from "../context/LapContext";
import { Feather } from "@expo/vector-icons";
import Timer from "../components/Timer";
import moment from "moment";

const IndexScreen = ({ navigation }) => {
  const [athleteName, setAthleteName] = useState("");
  const [remainingLaps, setRemainingLaps] = useState(0);
  const { state: options, editOptions } = useContext(OptionsContext);
  const { state: { laps, active }, addLap } = useContext(Context);
  const { lapLength, totalLaps } = options;
  // const { laps } = state;
    
  return (
    <View style={styles.home}>
      <Text style={styles.description}>This is a swim lap counter, to start create an event and define the options for your event.</Text>
      <TouchableOpacity style={styles.saveButton}>
        <Button title="Create Event" onPress={() => navigation.navigate("Create")} />
      </TouchableOpacity>
      </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
    
  },
  description: {
    padding: 20
  },  
  saveButton: {
    width: "30%",
  }
});

export default IndexScreen;
