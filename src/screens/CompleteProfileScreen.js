import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import CountryPicker from 'react-native-country-picker-modal';
import { storage } from '../config/firebase';

const CompleteProfileScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [countryCode, setCountryCode] = useState('US');
  const [callingCode, setCallingCode] = useState('1');
  const [profileImage, setProfileImage] = useState(null);
  const [localImage, setLocalImage] = useState(null);

  const genderOptions = [
    { id: '1', label: 'Male' },
    { id: '2', label: 'Female' },
  ];

  const handleSelectGender = (selectedGender) => {
    setGender(selectedGender.label);
    setShowGenderModal(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setLocalImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = uri;
    const storageRef = storage().ref(`profile_images/${filename}`);
    
    try {
      await storageRef.putFile(uploadUri);
      const url = await storageRef.getDownloadURL();
      setProfileImage(url);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const handleCompleteProfile = () => {
    // Here you would typically save the profile data
    // For now, we'll just navigate to the next screen
    navigation.navigate('EnableLocationAccess');
  };

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Complete your Profile</Text>

      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={pickImage}>
          {localImage ? (
            <Image source={{ uri: localImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Ionicons name="person" size={40} color="#999" />
            </View>
          )}
          <View style={styles.editButton}>
            <Ionicons name="pencil" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneInputContainer}>
          <CountryPicker
            withFilter
            withCallingCode
            withFlag
            withEmoji
            withModal
            withFlagButton
            countryCode={countryCode}
            onSelect={(country) => {
              setCountryCode(country.cca2);
              setCallingCode(country.callingCode[0]);
            }}
            containerButtonStyle={styles.countryPickerButton}
          />
          <Text style={styles.callingCode}>+{callingCode}</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="Mobile Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        <Text style={styles.label}>Gender</Text>
        <TouchableOpacity 
          style={styles.genderSelector}
          onPress={() => setShowGenderModal(true)}
        >
          <Text style={[styles.genderText, gender && { color: '#000' }]}>
            {gender || 'Select'}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <Modal visible={showGenderModal} transparent animationType="slide">
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowGenderModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Gender</Text>
                <TouchableOpacity onPress={() => setShowGenderModal(false)}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={genderOptions}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={[
                      styles.genderOption,
                      gender === item.label && styles.selectedGenderOption
                    ]} 
                    onPress={() => handleSelectGender(item)}
                  >
                    <Text style={[
                      styles.genderOptionText,
                      gender === item.label && styles.selectedGenderOptionText
                    ]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <TouchableOpacity 
        style={styles.completeButton}
        onPress={handleCompleteProfile}
      >
        <Text style={styles.completeButtonText}>Complete Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  profileImageContainer: { alignSelf: 'center', position: 'relative' },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  profileImagePlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' },
  editButton: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#FFB800', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  formContainer: { marginTop: 30 },
  label: { fontSize: 16, fontWeight: '500', marginBottom: 5 },
  phoneInputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, paddingHorizontal: 10 },
  callingCode: { marginLeft: 10, fontSize: 16 },
  phoneInput: { flex: 1, fontSize: 16, paddingVertical: 10, paddingHorizontal: 10 },
  genderSelector: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, padding: 10, marginTop: 10 },
  completeButton: { backgroundColor: '#FFB800', borderRadius: 30, padding: 15, alignItems: 'center', marginTop: 30 },
  completeButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  genderText: { 
    fontSize: 16, 
    color: '#666'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  genderOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  selectedGenderOption: {
    backgroundColor: '#FFF8E7',
  },
  genderOptionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedGenderOptionText: {
    color: '#FFB800',
    fontWeight: '500',
  },
  countryPickerButton: {
    paddingVertical: 5,
  },
});

export default CompleteProfileScreen;
