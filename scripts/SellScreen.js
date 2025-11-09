import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SellPage({ navigation }) {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [sellerInfo, setSellerInfo] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");

  const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    Alert.alert("Product Submitted", `₦${parseFloat(price || 0).toFixed(2)}`);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-xl font-semibold mb-4">Market</Text>

      {/* Image Upload */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity
          onPress={pickImage}
          className="bg-[#004CFF] px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold">Upload</Text>
        </TouchableOpacity>

        <View className="w-32 h-32 bg-gray-200 rounded-xl items-center justify-center overflow-hidden">
          {image ? (
            <Image source={{ uri: image }} className="w-full h-full" />
          ) : (
            <Text className="text-gray-400">No Image</Text>
          )}
        </View>
      </View>

      {/* Product Description */}
      <Text className="text-gray-700 mb-1 font-medium">Product Description</Text>
      <TextInput
        className="bg-white p-3 rounded-xl mb-3 shadow-sm"
        placeholder="Enter product details"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      {/* About Seller */}
      <Text className="text-gray-700 mb-1 font-medium">About Seller</Text>
      <TextInput
        className="bg-white p-3 rounded-xl mb-3 shadow-sm"
        placeholder="Enter seller info"
        multiline
        value={sellerInfo}
        onChangeText={setSellerInfo}
      />

      {/* Price */}
      <Text className="text-gray-700 mb-1 font-medium">Price (₦)</Text>
      <TextInput
        className="bg-white p-3 rounded-xl mb-3 shadow-sm"
        placeholder="0.00"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      {/* Size */}
      <Text className="text-gray-700 mb-1 font-medium">Size</Text>
      <View className="flex-row flex-wrap mb-6">
        {sizes.map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => setSize(s)}
            className={`px-4 py-2 rounded-xl border ${
              size === s ? "bg-[#004CFF] border-[#004CFF]" : "border-gray-300"
            } mr-2 mb-2`}
          >
            <Text
              className={`${
                size === s ? "text-white font-semibold" : "text-gray-700"
              }`}
            >
              {s}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-[#004CFF] p-4 rounded-xl items-center"
      >
        <Text className="text-white font-semibold text-base">Submit Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
