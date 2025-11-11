import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const SettingsScreen = () => {
  const [selectedCountry, setSelectedCountry] = useState('Nigeria');
  const [selectedCurrency, setSelectedCurrency] = useState('NGN');
  const [selectedSize, setSelectedSize] = useState('UK');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleCountryChange = (itemValue) => {
    setSelectedCountry(itemValue);
    console.log(`Selected country code: ${itemValue}`);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'No',
          onPress: () => console.log('Account deletion cancelled'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            console.log('Account deleted!');
            // Implement your account deletion logic here
            // e.g., make an API call, clear user data, navigate to logout screen
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const SettingItem = ({ label, value, onPress, hasPicker = false, children }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} disabled={hasPicker}>
      <Text style={styles.settingLabel}>{label}</Text>
      {hasPicker ? (
        children
      ) : (
        <View style={styles.settingValueContainer}>
          <Text style={styles.settingValue}>{value}</Text>
          <Text style={styles.arrowIcon}>&gt;</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.sectionHeader}>Personal</Text>
        <SettingItem label="Profile" value="" onPress={() => console.log('Navigate to Profile')} />
        <SettingItem label="Shipping Address" value="" onPress={() => console.log('Navigate to Shipping Address')} />
        <SettingItem label="Payment methods" value="" onPress={() => console.log('Navigate to Payment methods')} />

        <Text style={styles.sectionHeader}>Market</Text>
        <SettingItem label="Country" hasPicker={true}>
          <Picker
            selectedValue={selectedCountry}
            onValueChange={handleCountryChange}
            style={styles.picker}
            itemStyle={styles.pickerItem} // iOS specific
          >
            <Picker.Item label="Nigeria" value="Nigeria" />
            <Picker.Item label="USA" value="USA" />
            <Picker.Item label="Canada" value="Canada" />
            <Picker.Item label="UK" value="UK" />
          </Picker>
        </SettingItem>
        <SettingItem label="Currency" hasPicker={true}>
          <Picker
            selectedValue={selectedCurrency}
            onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="NGN" value="NGN" />
            <Picker.Item label="USD" value="USD" />
            <Picker.Item label="GBP" value="GBP" />
            <Picker.Item label="EUR" value="EUR" />
          </Picker>
        </SettingItem>
        <SettingItem label="Sizes" hasPicker={true}>
          <Picker
            selectedValue={selectedSize}
            onValueChange={(itemValue) => setSelectedSize(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="UK" value="UK" />
            <Picker.Item label="US" value="US" />
            <Picker.Item label="EU" value="EU" />
          </Picker>
        </SettingItem>
        <SettingItem label="Terms and Conditions" value="" onPress={() => console.log('Navigate to T&C')} />

        <Text style={styles.sectionHeader}>Account</Text>
        <SettingItem label="Language" hasPicker={true}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Spanish" value="Spanish" />
            <Picker.Item label="French" value="French" />
          </Picker>
        </SettingItem>
        <SettingItem label="About Errand" value="" onPress={() => console.log('Navigate to About Errand')} />

        <TouchableOpacity onPress={handleDeleteAccount} style={styles.deleteAccountContainer}>
          <Text style={styles.deleteAccountText}>Delete My Account</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.errandText}>Errand</Text>
          <Text style={styles.versionText}>Version 1.0 September, 2025</Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation (Simplified representation) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  scrollViewContent: {
    paddingBottom: 80, // Space for bottom nav
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  settingValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 16,
    color: '#666',
    marginRight: 5,
  },
  arrowIcon: {
    fontSize: 16,
    color: '#ccc',
  },
  picker: {
    // Styling for Android pickers. iOS pickers are styled differently.
    // For iOS, you might want to wrap the Picker in a View and control its size.
    width: 150, // Adjust as needed
  },
  pickerItem: {
    // Only affects iOS Picker.Item styling
    fontSize: 16,
  },
  deleteAccountContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    alignItems: 'center',
    
  },
  deleteAccountText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionContainer: {
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 20,
  },
  errandText: {
    fontSize: 16,
    color: '#666',
  },
  versionText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  navItem: {
    padding: 10,
  },
});

export default ProfileScreen;

