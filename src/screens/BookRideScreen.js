import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BookRideScreen = ({ navigation, route }) => {
  const { pickupLocation } = route.params;
  const [selectedVehicle, setSelectedVehicle] = useState('mini');
  const [selectedGender, setSelectedGender] = useState('man');
  const [destinationAddress, setDestinationAddress] = useState('1901 Thoridgr Cir Sh..');

  const vehicles = {
    mini: {
      name: 'Mini',
      capacity: '3 Seats Capacity',
      time: '5 Min',
      price: '$1.0/mile',
      icon: 'car',
    },
    bus: {
      name: 'Bus',
      capacity: '21 Seats Capacity',
      time: '9 Min',
      price: '$5.25/mile',
      icon: 'bus',
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Ride</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.locationCard}>
          <View style={styles.locationItem}>
            <View style={[styles.locationDot, { backgroundColor: '#000' }]} />
            <Text style={styles.locationText} numberOfLines={1}>
              {pickupLocation.address}
            </Text>
          </View>
          <View style={styles.locationDivider} />
          <View style={styles.locationItem}>
            <View style={[styles.locationDot, { backgroundColor: '#FFB800' }]} />
            <Text style={styles.locationText} numberOfLines={1}>
              {destinationAddress}
            </Text>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={24} color="#FFB800" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.timeSelector}>
          <Ionicons name="time" size={24} color="#FFB800" />
          <Text style={styles.timeText}>Now</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        <View style={styles.vehicleOptions}>
          {Object.entries(vehicles).map(([key, vehicle]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.vehicleCard,
                selectedVehicle === key && styles.selectedVehicleCard,
              ]}
              onPress={() => setSelectedVehicle(key)}
            >
              <Ionicons
                name={vehicle.icon}
                size={24}
                color={selectedVehicle === key ? '#fff' : '#000'}
              />
              <View style={styles.vehicleInfo}>
                <Text
                  style={[
                    styles.vehicleName,
                    selectedVehicle === key && styles.selectedText,
                  ]}
                >
                  {vehicle.name}
                </Text>
                <Text
                  style={[
                    styles.vehicleCapacity,
                    selectedVehicle === key && styles.selectedText,
                  ]}
                >
                  {vehicle.capacity}
                </Text>
              </View>
              <View style={styles.vehiclePricing}>
                <Text
                  style={[
                    styles.vehicleTime,
                    selectedVehicle === key && styles.selectedText,
                  ]}
                >
                  {vehicle.time}
                </Text>
                <Text
                  style={[
                    styles.vehiclePrice,
                    selectedVehicle === key && styles.selectedText,
                  ]}
                >
                  {vehicle.price}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Choose a Driver Gender</Text>
        <View style={styles.genderOptions}>
          <TouchableOpacity
            style={[
              styles.genderCard,
              selectedGender === 'man' && styles.selectedGenderCard,
            ]}
            onPress={() => setSelectedGender('man')}
          >
            <Ionicons
              name="man"
              size={24}
              color={selectedGender === 'man' ? '#fff' : '#000'}
            />
            <Text
              style={[
                styles.genderText,
                selectedGender === 'man' && styles.selectedText,
              ]}
            >
              Man
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderCard,
              selectedGender === 'woman' && styles.selectedGenderCard,
            ]}
            onPress={() => setSelectedGender('woman')}
          >
            <Ionicons
              name="woman"
              size={24}
              color={selectedGender === 'woman' ? '#fff' : '#000'}
            />
            <Text
              style={[
                styles.genderText,
                selectedGender === 'woman' && styles.selectedText,
              ]}
            >
              Woman
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.additionalOptions}>
          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="cash-outline" size={24} color="#000" />
            <Text style={styles.optionText}>Cash</Text>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="person-outline" size={24} color="#000" />
            <Text style={styles.optionText}>Book for Self</Text>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="pricetag-outline" size={24} color="#000" />
            <Text style={styles.optionText}>Apply Promo</Text>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => {
          // Handle booking logic here
          console.log('Booking ride...');
          // Navigate to chat after successful booking
          navigation.navigate('Chat');
        }}
      >
        <Text style={styles.bookButtonText}>
          Book {selectedVehicle === 'mini' ? 'Mini' : 'Bus'}
        </Text>
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
  content: {
    flex: 1,
    padding: 16,
  },
  locationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 16,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  locationDivider: {
    height: 20,
    width: 1,
    backgroundColor: '#eee',
    marginLeft: 5,
    marginVertical: 8,
  },
  addButton: {
    padding: 8,
  },
  timeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  timeText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  vehicleOptions: {
    marginBottom: 24,
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedVehicleCard: {
    backgroundColor: '#FFB800',
    borderColor: '#FFB800',
  },
  vehicleInfo: {
    flex: 1,
    marginLeft: 12,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  vehicleCapacity: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  vehiclePricing: {
    alignItems: 'flex-end',
  },
  vehicleTime: {
    fontSize: 14,
    color: '#333',
  },
  vehiclePrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  selectedText: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  genderOptions: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  genderCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  selectedGenderCard: {
    backgroundColor: '#FFB800',
  },
  genderText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  additionalOptions: {
    marginBottom: 24,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  bookButton: {
    backgroundColor: '#FFB800',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookRideScreen; 