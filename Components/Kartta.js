import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, Button, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
const myKey = 'JMU5h8bsP4SthjzoIN7jyKXiMewMoyje'

export default function App() {
  const [location, setLocation] = useState(null);
  const [etsittava, setEtsittava] = useState('');
  const [tulos, setTulos] = useState('');
  const [lati, setLati] = useState('60.200692');
  const [long, setLong] = useState('24.934302');


  const buttonPressed = async () => {
    try {
      const response = await fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${myKey}&location=${etsittava}`);
      const result = await response.text();
      setTulos(result);
      console.log(result);
      const parsedResult = JSON.parse(result);
      setLati(parsedResult.results[0].locations[0].displayLatLng.lat);
      setLong(parsedResult.results[0].locations[0].displayLatLng.lng);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  

const initial = {
  latitude: 60.200692,
  longitude: 24.934302,
  latitudeDelta: 0.0322,
  longitudeDelta: 0.0221
};

const coordinates = {
  latitude: parseFloat(lati),
  longitude: parseFloat(long)
};
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={initial}
      >
        <Marker
          coordinate={coordinates}
          title= {etsittava}
        />
      </MapView>
      <TextInput style={{fontSize: 18, width: 200}} placeholder='Anna osoite' value={etsittava} onChangeText={text => setEtsittava(text)}/>
      <Button title="Show" onPress={() => buttonPressed()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});