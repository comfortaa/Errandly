import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

const Onboarding = ({ navigation }) => {
  return (
    <Swiper
      loop={false}
      dot={<View style={styles.dot} />}
      activeDot={<View style={styles.activeDot} />}
    >
      
      <ImageBackground
        source={require('../assets/login.png')} 
        style={styles.background}
      >
        <View style={styles.card}>
          <Image
            source={require('../assets/shopping.png')}
            style={styles.image}
          />
          <Text style={styles.title}>Hello</Text>
          <Text style={styles.subtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur turpis.
            Morbi eu eleifend lacus.
          </Text>
        </View>
      </ImageBackground>

      
      <ImageBackground
        source={require('../assets/login.png')}
        style={styles.background}
      >
        <View style={styles.card}>
          <Image
            source={require('../assets/shopping2.png')} 
            style={styles.image}
          />
          <Text style={styles.title}>Ready?</Text>
          <Text style={styles.subtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')} // or any next screen
          >
            <Text style={styles.buttonText}>Let’s Start</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  image: {
    width: '100%',
    height: 280,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginTop: 15,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#777',
    marginVertical: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#004CFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  dot: {
    backgroundColor: '#d3d3d3',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#004CFF',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
});

export default Onboarding;
