import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert('Permission Denied', 'Please enable location services to use this app.');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg('Error getting location');
        console.error('Location error:', error);
      }
    })();
  }, []);

  const initialRegion = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  } : {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleDestinationPress = () => {
    if (location) {
      navigation.navigate('PickupLocation', {
        initialLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Current Location"
            >
              <View style={styles.currentLocationMarker}>
                <View style={styles.currentLocationDot} />
              </View>
            </Marker>
          )}
          {/* Add taxi markers here */}
        </MapView>
        
        <View style={styles.searchBar}>
          <View style={styles.locationInput}>
            <Ionicons name="location" size={24} color="#FFB800" />
            <Text style={styles.locationText}>Current Location</Text>
            <TouchableOpacity style={styles.bookmarkButton}>
              <Ionicons name="bookmark-outline" size={24} color="#FFB800" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSheet}>
          <Text style={styles.whereToText}>Where to?</Text>
          <View style={styles.destinationOptions}>
            <TouchableOpacity
              style={styles.destinationCard}
              onPress={handleDestinationPress}
            >
              <View style={styles.destinationIcon}>
                <Ionicons name="location" size={24} color="#fff" />
              </View>
              <View>
                <Text style={styles.destinationTitle}>Destination</Text>
                <Text style={styles.destinationSubtitle}>Enter Destination</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.officeCard}>
              <View style={styles.officeIcon}>
                <Ionicons name="business" size={24} color="#fff" />
              </View>
              <View>
                <Text style={styles.officeTitle}>Office</Text>
                <Text style={styles.officeDistance}>35 Km Away</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  currentLocationMarker: {
    backgroundColor: 'rgba(255, 184, 0, 0.2)',
    padding: 10,
    borderRadius: 20,
  },
  currentLocationDot: {
    width: 10,
    height: 10,
    backgroundColor: '#FFB800',
    borderRadius: 5,
  },
  searchBar: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  bookmarkButton: {
    padding: 5,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  whereToText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  destinationOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  destinationCard: {
    backgroundColor: '#FFB800',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
  },
  destinationIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
  },
  destinationTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  destinationSubtitle: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
  officeCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
  },
  officeIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
  },
  officeTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  officeDistance: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
});

export default HomeScreen; 