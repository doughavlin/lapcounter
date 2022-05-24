import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const EventForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [lapLength, setLapLength] = useState(initialValues.lapLength);
  const [measurement, setMeasurement] = useState(initialValues.measurement);
  const [maxLaps, setMaxLaps] = useState(initialValues.maxLaps);

  return (
    <View>
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={text => setTitle(text)}
      />
      
      <Text style={styles.label}>Enter Lap Length:</Text>
      <TextInput
        style={styles.input}
        value={lapLength}
        onChangeText={text => setLapLength(text)}
      />

      <Text style={styles.label}>Enter Measurement:</Text>
      <TextInput
        style={styles.input}
        value={measurement}
        onChangeText={text => setMeasurement(text)}
      />
      
      <Text style={styles.label}>Enter Total Laps:</Text>
      <TextInput
        style={styles.input}
        value={maxLaps}
        onChangeText={text => setMaxLaps(text)}
      />
      <Text>Event Distance: {lapLength * maxLaps} {measurement}</Text>

      <Button title="Save Event" onPress={() => onSubmit(title, lapLength, measurement, maxLaps)} />
    </View>
  );
};

EventForm.defaultProps = {
  initialValues: {
    title: '',
    lapLength: '50',
    measurement: 'meters',
    maxLaps: '200'
  }
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    padding: 5,
    margin: 5
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5
  },
});

export default EventForm;
