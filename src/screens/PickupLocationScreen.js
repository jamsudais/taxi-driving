import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const PickupLocationScreen = ({ navigation, route }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    (async () => {
      if (selectedLocation) {
        try {
          const [addressResult] = await Location.reverseGeocodeAsync({
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          });
          if (addressResult) {
            const formattedAddress = `${addressResult.street}, ${addressResult.city}`;
            setAddress(formattedAddress);
          }
        } catch (error) {
          console.error('Error getting address:', error);
        }
      }
    })();
  }, [selectedLocation]);

  const handleMapPress = (event) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  const handleConfirmLocation = () => {
    navigation.navigate('BookRide', {
      pickupLocation: {
        coordinate: selectedLocation,
        address: address,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pick-up</Text>
      </View>

      {selectedLocation && (
        <View style={styles.addressBar}>
          <View style={styles.addressDot} />
          <Text style={styles.addressText} numberOfLines={1}>
            {address || 'Loading address...'}
          </Text>
          <TouchableOpacity onPress={() => setSelectedLocation(null)}>
            <Ionicons name="close" size={24} color="#FFB800" />
          </TouchableOpacity>
        </View>
      )}

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: route.params?.initialLocation?.latitude || 37.78825,
          longitude: route.params?.initialLocation?.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation}>
            <View style={styles.markerContainer}>
              <View style={styles.marker} />
            </View>
          </Marker>
        )}
      </MapView>

      <TouchableOpacity
        style={[
          styles.confirmButton,
          !selectedLocation && styles.confirmButtonDisabled,
        ]}
        onPress={handleConfirmLocation}
        disabled={!selectedLocation}
      >
        <Text style={styles.confirmButtonText}>Confirm Location</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFB800',
    marginRight: 12,
  },
  addressText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginRight: 12,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFB800',
    borderWidth: 3,
    borderColor: '#fff',
  },
  confirmButton: {
    backgroundColor: '#FFB800',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#ccc',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PickupLocationScreen; 