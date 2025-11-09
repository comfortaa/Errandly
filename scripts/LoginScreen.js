import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
  return (
    <ImageBackground
      source={require('./assets/login.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.signupButton}
        onPress={()=> navigation.navigate('Signup')}>
          <Text style={styles.signupText}>Create Account</Text>
        </TouchableOpacity>
      
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Welcome back, Samuel!</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={() => NavigationActivation.navigate('Home')}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancel} onPress={() => NavigationActivation.navigate('Home')}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  signupButton:{
    position:'absolute',
    top: 50,
    right: 20,
  },
  signupText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
    opacity: 0.7,
  },
  formContainer: {
    paddingHorizontal: 30,
    marginTop: 100,
  },

  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#004CFF', // color code 0xFF004CFF
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  cancel: {
    color: '#888',
    textAlign: 'center',
    fontSize: 16,
  },
});
