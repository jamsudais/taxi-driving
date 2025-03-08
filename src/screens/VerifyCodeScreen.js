import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const VerifyCodeScreen = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = [];

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Move to next input if there's a value and next input exists
    if (text && index < 3) {
      inputRefs[index + 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Code</Text>
      <Text style={styles.subtitle}>
        Please enter the code we just sent to email{'\n'}
        <Text style={styles.email}>example@email.com</Text>
      </Text>

      <View style={styles.codeContainer}>
        {[0, 1, 2, 3].map((index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs[index] = ref)}
            style={styles.codeInput}
            maxLength={1}
            keyboardType="numeric"
            value={code[index]}
            onChangeText={(text) => handleCodeChange(text, index)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive OTP?</Text>
        <Text style={styles.resendLink}>Resend code</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.verifyButton}
        onPress={() => navigation.navigate('CompleteProfile')}
      >
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 20,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  email: {
    color: '#FFB800',
    fontWeight: '500',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
    paddingHorizontal: 20,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 10,
    backgroundColor: '#fff',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  resendText: {
    color: '#666',
    fontSize: 16,
    marginBottom: 8,
  },
  resendLink: {
    color: '#666',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  verifyButton: {
    backgroundColor: '#FFB800',
    borderRadius: 30,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VerifyCodeScreen; 