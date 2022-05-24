import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import moment from 'moment';
import { Context as LapContext } from '../context/LapContext';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [startTime, setStartTime] = useState(); // TODO put this in context?
  const { state, addLap, resetLaps, toggleCounter } = useContext(LapContext);
  const { active, laps } = state
  
  function start() {
    setStartTime(Date.now())
    toggleCounter()
  }

  function reset() {
    setSeconds(0);
    setStartTime();
    resetLaps();
  }

  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
        
      }, 1000);

    } else if (!active && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [active, seconds])

  const handleLapPress = () => {
    const currentTime = Date.now()
    const previousTime = laps[laps.length-1]?.time ?? startTime
    const lapTime = currentTime - previousTime
    addLap(currentTime, lapTime)
  }

  return ( <>
    <View style={styles.header}>
      <Text style={styles.timer}>
        {moment.utc(seconds*1000).format('HH:mm:ss')}
      </Text>
      </View>
      <View style={styles.buttons}>
        {startTime ? (
            <>
                <Button title={active ? 'Pause' : 'Continue'} onPress={toggleCounter} />
                <Button title="Lap" onPress={() => handleLapPress()} disabled={!active} />
            </>

        ) : (
            <Button title="Start" onPress={start}/>
        )

        }
        <Button title="Reset" onPress={reset} disabled={active}/>
      </View>
      <Text style={styles.start}>Start: {startTime && moment(startTime).format('ddd MMMM Do, h:mm:ss a')}</Text>
    </>
  );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'column',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    start: {
        fontSize: 18,
        padding: 10,

    },
    timer: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'monospace'
        }
})

export default Timer;