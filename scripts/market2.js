// MarketSellScreen.js
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View
} from "react-native";

export default function MarketSellScreen() {
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const navigation = useNavigation();

  const [products, setProducts] = useState([
    { id: "1", name: "Nike Sneakers", status: "Successful", price: "₦17,000" },
    { id: "2", name: "Training Shoes", status: "Declined", price: "₦32,000" },
    { id: "3", name: "Adidas Sneakers", status: "Successful", price: "₦21,000" },
  ]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <View style={styles.placeholderImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.statusText}>Status: {item.status}</Text>
      <Text style={styles.priceText}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Market</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab}><Text>Buy</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.activeText}>Sell</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text>Exchange</Text></TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Upload */}
        <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="cloud-upload-outline" size={30} color="#aaa" />
              <Text style={styles.addText}>Add New Product</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Product Info Inputs */}
        <TextInput
          placeholder="Product Name"
          style={styles.input}
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          placeholder="Product Price"
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        {/* Product List */}
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Product Listed</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SeeAll")}>
            <Ionicons name="arrow-forward-circle" size={24} color="#004CFF" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        {/* Pending Orders */}
        <Text style={styles.sectionTitle}>Pending Orders</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {products.map((p) => (
            <View key={p.id} style={styles.pendingCircle} />
          ))}
        </ScrollView>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={24} color="#000" />
        <Ionicons name="cart-outline" size={24} color="#007bff" />
        <Ionicons name="person-outline" size={24} color="#000" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  tabs: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  tab: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20, borderWidth: 1, borderColor: "#ccc" },
  activeTab: { backgroundColor: "#004CFF" },
  activeText: { color: "#fff" },
  uploadBox: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, height: 150, justifyContent: "center", alignItems: "center", marginBottom: 15 },
  placeholder: { justifyContent: "center", alignItems: "center" },
  addText: { color: "#004CFF", marginTop: 5 },
  imagePreview: { width: "100%", height: "100%", borderRadius: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 10, marginBottom: 10 },
  sectionTitle: { fontWeight: "bold", fontSize: 16, marginVertical: 10 },
  productCard: { backgroundColor: "#f9f9f9", borderRadius: 10, padding: 10, marginRight: 10, width: 130 },
  placeholderImage: { backgroundColor: "#ddd", height: 80, borderRadius: 10, marginBottom: 8 },
  productName: { fontWeight: "500" },
  statusText: { fontSize: 12, color: "#555" },
  priceText: { fontWeight: "bold", color: "#004CFF" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  pendingCircle: { width: 50, height: 50, backgroundColor: "#eee", borderRadius: 25, marginRight: 10 },
  bottomNav: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingVertical: 10, borderTopWidth: 1, borderColor: "#eee", marginTop: 10 },
});
