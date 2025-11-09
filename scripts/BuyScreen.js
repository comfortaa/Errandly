// screens/BuyProductsScreen.js
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BuyProductsScreen() {
  const [products, setProducts] = useState([
    { id: 1, name: "", seller: "", location: "", price: "", image: null },
  ]);
  const navigation = useNavigation();

  const pickImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const updated = [...products];
      updated[index].image = result.assets[0].uri;
      setProducts(updated);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const addNewProduct = () => {
    setProducts([
      ...products,
      { id: Date.now(), name: "", seller: "", location: "", price: "", image: null },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-semibold mb-4">Market</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {products.map((item, index) => (
          <View
            key={item.id}
            className="bg-white rounded-2xl p-3 mb-5 shadow border border-gray-200"
          >
            {/* Image Picker */}
            <TouchableOpacity
              onPress={() => pickImage(index)}
              className="w-full h-44 bg-gray-200 rounded-xl items-center justify-center mb-3"
            >
              {item.image ? (
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-44 rounded-xl"
                />
              ) : (
                <Text className="text-gray-500">Tap to upload image</Text>
              )}
            </TouchableOpacity>

            {/* Editable Fields */}
            <TextInput
              placeholder="Product Name"
              value={item.name}
              onChangeText={(v) => handleInputChange(index, "name", v)}
              className="border border-gray-300 rounded-lg px-3 py-2 mb-2"
            />
            <TextInput
              placeholder="Seller Name"
              value={item.seller}
              onChangeText={(v) => handleInputChange(index, "seller", v)}
              className="border border-gray-300 rounded-lg px-3 py-2 mb-2"
            />
            <TextInput
              placeholder="Location"
              value={item.location}
              onChangeText={(v) => handleInputChange(index, "location", v)}
              className="border border-gray-300 rounded-lg px-3 py-2 mb-2"
            />
            <TextInput
              placeholder="Price (₦)"
              keyboardType="numeric"
              value={item.price}
              onChangeText={(v) => handleInputChange(index, "price", v)}
              className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
            />

            {/* Buttons */}
            <View className="flex-row justify-between">
              <TouchableOpacity className="border border-blue-500 px-3 py-2 rounded-lg">
                <Text className="text-blue-500 font-semibold">Send Message</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("OrderDetails", {
                    price: parseFloat(item.price || 0).toFixed(2),
                    name: item.name,
                    image: item.image,
                  })
                }
                className="border border-blue-500 px-5 py-2 rounded-lg"
              >
                <Text className="text-blue-500 font-semibold">Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Add new product button */}
        <TouchableOpacity
          onPress={addNewProduct}
          className="border-2 border-dashed border-blue-400 rounded-xl p-4 items-center"
        >
          <Text className="text-blue-500 font-semibold">+ Add New Product</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
