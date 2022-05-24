import React, { useState, useContext, useEffect, useRef } from "react";
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
import AwesomeAlert from "react-native-awesome-alerts";
import { Context as LapContext } from "../context/LapContext";
import { Context as EventContext } from "../context/EventContext";
import { Feather } from "@expo/vector-icons";
import Timer from "../components/Timer";
import moment from "moment";
import { Icon } from "expo";

const CounterScreen = ({ navigation }) => {
  const {
    state: { lapLength, maxLaps, title, measurement },
  } = useContext(EventContext);
  const {
    state: { laps, active },
    addLap,
    deleteLap,
  } = useContext(LapContext);
  const [athleteName, setAthleteName] = useState("");
  const [showLapAlert, setShowLapAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleteLapObj, setDeleteLapObj] = useState();
  const [message, setMessage] = useState("");
  const [remainingLaps, setRemainingLaps] = useState(maxLaps);
  const lapsRef = useRef();

  const save = () => {
    const dataToSave = {
      name: athleteName,
      laps,
      lapLength,
      maxLaps,
      title,
      measurement,
    };
    console.log(dataToSave);
  };

  const handleDelete = (lap) => {
    setDeleteLapObj(lap);
    setShowDeleteAlert(true);
  };

  useEffect(() => {
    // scroll down list as we add laps
    if (laps.length > 0) {
      lapsRef.current.scrollToIndex({ animated: true, index: laps.length - 1 });
    }

    const newRemaining = maxLaps - laps.length;
    if (newRemaining) {
      setRemainingLaps(newRemaining);
    }
    // show alert on the last 3 laps
    switch (newRemaining) {
      case 2:
        setMessage("Put Kickboard down Next Lap");
        setShowLapAlert(true);
        break;
      case 1:
        setMessage("Last Lap!");
        setShowLapAlert(true);
        break;
      case 0:
        setMessage("Done!");
        setShowLapAlert(true);
        break;
      default:
        break;
    }
  }, [laps]);

  // This covers the issue when adding a new lap doesn't scroll to the bottom
  // of the FlatList. The 200 miliseconds gets us enough time to build the list.
  const scrollFail = () => {
    const wait = new Promise((resolve) => setTimeout(resolve, 200));
    wait.then(() => {
      lapsRef.current?.scrollToIndex({
        index: laps.length - 1,
        animated: true,
      });
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.athlete}
        placeholder="Athlete Name"
        onChangeText={(athleteName) => setAthleteName(athleteName)}
        defaultValue={athleteName}
      />
      <Timer />
      <FlatList
        data={laps}
        ref={lapsRef}
        keyExtractor={(lap) => lap.id.toString()}
        onScrollToIndexFailed={scrollFail}
        style={styles.lapsList}
        renderItem={({ item }) => {
          return (
            <View style={styles.row}>
              <Text style={styles.title}>Lap {item.lapNumber}</Text>
              <Text>{moment(item.time).format("h:mm:ss.SS a")}</Text>
              <Text>{moment(item.lapTime).format("mm:ss.S")}</Text>
              <Text>{item.lapNumber * lapLength}</Text>
              {item.lapNumber > 1 ? <Feather
                name="trash"
                size={20}
                title="Delete"
                onPress={() => handleDelete(item)}
              /> : <Feather disabled name="minus-circle" width={20} size={20} title="Can't remove first lap."></Feather>
            }
            </View>
          );
        }}
      />
      <Text style={styles.remaining}>Remaining: {remainingLaps}</Text>

      <View style={styles.saveView}>
        <TouchableOpacity style={styles.saveButton}>
          <Button
            title="Save Laps"
            onPress={save}
            disabled={active || laps.length === 0}
          />
        </TouchableOpacity>
      </View>
      {showDeleteAlert && // for some reason passing this as the show attribute wasn't working 100% of the time.
      <AwesomeAlert
        show={true}
        title={`Delete Lap ${deleteLapObj?.lapNumber}?`}
        showConfirmButton
        showCancelButton
        closeOnTouchOutside
        closeOnHardwareBackPress
        confirmText="Are you Sure?"
        confirmButtonColor="#2196f3"
        onConfirmPressed={() => {
          setShowDeleteAlert(false);
          deleteLap(deleteLapObj.id);
        }}
        onCancelPressed={() => {
          setShowDeleteAlert(false);
        }}
      />
      }
      <AwesomeAlert
        show={showLapAlert}
        title={message}
        showConfirmButton
        confirmText="Got it!"
        confirmButtonColor="#2196f3"
        onConfirmPressed={() => {
          setShowLapAlert(false);
        }}
      />
    </View>
  );
};

CounterScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  lapsList: {
    backgroundColor: "lightyellow",
    height: "50vh",
    flexGrow: 0,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "gray",
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
  athlete: {
    fontSize: 24,
    alignSelf: "center",
    textAlign: "center",
    height: 40,
  },
  remaining: {
    fontSize: 18,
    padding: 10,
  },
  saveView: {
    width: "100%",
    position: "absolute",
    bottom: 10,
    height: 70,
    alignItems: "center",
  },
  saveButton: {
    width: "30%",
  },
});

export default CounterScreen;
