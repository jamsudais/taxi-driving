import React from 'react';
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

const ProfileScreen = ({ navigation }) => {
  const menuItems = [
    { id: 1, title: 'Your Profile', icon: 'person-outline' },
    { id: 2, title: 'Manage Address', icon: 'location-outline' },
    { id: 3, title: 'Notification', icon: 'notifications-outline' },
    { id: 4, title: 'Payment Methods', icon: 'card-outline' },
    { id: 5, title: 'Pre-Booked Rides', icon: 'calendar-outline' },
    { id: 6, title: 'Settings', icon: 'settings-outline' },
    { id: 7, title: 'Emergency Contact', icon: 'alert-outline' },
    { id: 8, title: 'Help Center', icon: 'information-circle-outline' },
    { id: 9, title: 'Invite Friends', icon: 'people-outline' },
    { id: 10, title: 'Coupon', icon: 'pricetag-outline' },
    { id: 11, title: 'Logout', icon: 'log-out-outline' },
  ];

  const handleMenuPress = (title) => {
    // Handle menu item press
    console.log(`Pressed: ${title}`);
    if (title === 'Logout') {
      // Handle logout
      navigation.replace('SignIn');
    } else if (title === 'Your Profile') {
      navigation.navigate('EditProfile');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { marginLeft: 0 }]}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../../assets/profile-image.png')}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>Jenny Wilson</Text>
          <Text style={styles.loyaltyPoints}>200 Loyalty Points</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item.title)}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={24} color="#FFB800" />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={24} color="#FFB800" />
            </TouchableOpacity>
          ))}
        </View>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#FFB800',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  loyaltyPoints: {
    fontSize: 16,
    color: '#666',
  },
  menuContainer: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuIconContainer: {
    width: 40,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  }
});

export default ProfileScreen; 