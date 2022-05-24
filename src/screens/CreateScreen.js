import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/EventContext';
import EventForm from '../components/EventForm';

const CreateScreen = ({ navigation }) => {
  const { addEvent } = useContext(Context);

  return (
    <EventForm
      onSubmit={(title, lapLength, measurement, maxLaps) => {
        addEvent(title, lapLength, measurement, maxLaps, () => navigation.navigate('Counter'));
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default CreateScreen;
