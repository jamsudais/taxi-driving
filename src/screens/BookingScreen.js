import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';

const BookingScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Active');

  const renderBookingCard = (status) => (
    <View style={styles.bookingCard}>
      {status === 'Cancelled' && (
        <View style={styles.cancelledLabelContainer}>
          <Text style={styles.cancelledLabel}>Cancel by Driver</Text>
        </View>
      )}
      <View style={styles.driverInfo}>
        <Image
          source={require('../../assets/profile-image.png')}
          style={styles.driverImage}
        />
        <View style={styles.driverDetails}>
          <Text style={styles.driverName}>Jenny Wilson</Text>
          <Text style={styles.vehicleInfo}>Sedan (4 Seater)</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFB800" />
          <Text style={styles.ratingText}>5.0</Text>
        </View>
      </View>

      <View style={styles.rideDetails}>
        <View style={styles.rideDetailItem}>
          <Ionicons name="location" size={16} color="#FFB800" />
          <Text style={styles.rideDetailText}>4.5 Mile</Text>
        </View>
        <View style={styles.rideDetailItem}>
          <Ionicons name="time" size={16} color="#FFB800" />
          <Text style={styles.rideDetailText}>4 Mins</Text>
        </View>
        <View style={styles.rideDetailItem}>
          <Ionicons name="wallet" size={16} color="#FFB800" />
          <Text style={styles.rideDetailText}>$1.25/mile</Text>
        </View>
      </View>

      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTimeLabel}>Date & Time</Text>
        <Text style={styles.dateTimeText}>Oct 18, 2023 | 08:00 AM</Text>
      </View>

      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>6391 Westheimer RD. San..</Text>
        <Text style={styles.addressText}>1901 Thoridgr Cir Sh..</Text>
      </View>

      <View style={styles.carNumberContainer}>
        <Text style={styles.carNumberLabel}>Car Number</Text>
        <Text style={styles.carNumberText}>GR 678-UVUX</Text>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      {status === 'Active' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rescheduleButton}>
            <Text style={styles.rescheduleButtonText}>Reschedule</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking</Text>
      </View>

      <View style={styles.tabContainer}>
        {['Active', 'Completed', 'Cancelled'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tabButton}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'Active' && renderBookingCard('Active')}
        {activeTab === 'Completed' && renderBookingCard('Completed')}
        {activeTab === 'Cancelled' && renderBookingCard('Cancelled')}
      </ScrollView>
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#FFB800',
    fontWeight: 'bold',
  },
  activeTabIndicator: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFB800',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  vehicleInfo: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#FFB800',
    marginLeft: 4,
  },
  rideDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rideDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rideDetailText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },
  dateTimeContainer: {
    marginBottom: 16,
  },
  dateTimeLabel: {
    fontSize: 14,
    color: '#666',
  },
  dateTimeText: {
    fontSize: 16,
    color: '#333',
  },
  addressContainer: {
    marginBottom: 16,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  carNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  carNumberLabel: {
    fontSize: 14,
    color: '#666',
  },
  carNumberText: {
    fontSize: 16,
    color: '#333',
  },
  map: {
    height: 150,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
  },
  rescheduleButton: {
    backgroundColor: '#FFB800',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  rescheduleButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  cancelledLabelContainer: {
    backgroundColor: '#FFF5E5',
    borderRadius: 12,
    padding: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  cancelledLabel: {
    color: '#FFB800',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default BookingScreen; 