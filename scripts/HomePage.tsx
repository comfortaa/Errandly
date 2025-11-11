import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
    FlatList, Image, SafeAreaView,
    StyleSheet,
    Text, TouchableOpacity,
    View
} from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function HomeScreen({ navigation }) {
  const balance = 0;
  const formatted = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(balance);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          <Ionicons name="camera-outline" size={28} color="#004CFF" />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", gap: 15 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Scanner")}>
            <Ionicons name="qr-code-outline" size={28} color="#004CFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Ionicons name="settings-outline" size={28} color="#004CFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.balanceCard}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.balanceText}>Balance</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Transactions")}>
            <Text style={{ color: "#004CFF" }}>Transaction History</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.amount}>{formatted}</Text>
        <Text style={styles.walletAddress}>Wallet address: 9023********</Text>
      </View>


      
        
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="add-circle-outline" size={28} color="#004CFF" />
          <Text>Top Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="arrow-down-circle-outline" size={28} color="#004CFF" />
          <Text>Withdraw</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="cart-outline" size={28} color="#004CFF" />
          <Text>Market</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>About Errandly</Text>
      <View style={styles.aboutBox}>
        <Text style={{ color: "#fff" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
          consectetur turpis. Morbi eu eleifend lacus.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>New Arrivals</Text>
      <FlatList
        data={[1, 2, 3]}
        horizontal
        renderItem={() => (
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            style={styles.newArrival}
          />
        )}
        keyExtractor={(item) => item.toString()}
      />
    </SafeAreaView>
  );
}

// ---------- Camera Screen ----------
function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <Text>We need camera permission</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={{ color: "#fff" }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return <CameraView style={{ flex: 1 }} />;
}

// ---------- Scanner Screen ----------
function ScannerScreen() {
  return (
    <View style={styles.center}>
      <Text>Scanner functionality will go here.</Text>
    </View>
  );
}



// ---------- New Product Page ----------
function NewProductScreen() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  return (
    <View style={styles.center}>
      <Text>Upload Product Image</Text>
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={{ color: "#fff" }}>Upload</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ width: 150, height: 150, marginTop: 10 }} />}
    </View>
  );
}

// ---------- Tab Navigation ----------
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let icon;
          if (route.name === "Home") icon = "home-outline";
          else if (route.name === "Cart") icon = "cart-outline";
          else if (route.name === "Profile") icon = "person-outline";
          return (
            <Ionicons
              name={icon}
              size={24}
              color={focused ? "#004CFF" : "black"}
            />
          );
        },
        tabBarActiveTintColor: "#004CFF",
        tabBarInactiveTintColor: "black",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Cart" component={NewProductScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={SettingsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

// ---------- Root Stack ----------
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  greeting: { fontSize: 20, fontWeight: "600" },
  balanceCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
  },
  balanceText: { color: "#555" },
  amount: { fontSize: 24, fontWeight: "700" },
  walletAddress: { color: "#999", fontSize: 12 },
  sectionTitle: { fontWeight: "600", marginVertical: 10 },
  actionsRow: { flexDirection: "row", justifyContent: "space-around" },
  actionButton: { alignItems: "center" },
  aboutBox: {
    backgroundColor: "#004CFF",
    borderRadius: 10,
    padding: 15,
  },
  newArrival: { width: 100, height: 100, borderRadius: 10, marginRight: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: {
    backgroundColor: "#004CFF",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
});
