// screens/OrderDetailsScreen.js
import { useState } from "react";
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderDetailsScreen({ route }) {
  const { price, name, image } = route.params || {};
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];

  const handleAddToCart = () => alert(`${name} added to cart`);
  const handleBuyNow = () => alert(`Buying ${quantity} x ${name}`);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Product Image */}
      <View className="w-full h-64 bg-gray-200 justify-center items-center">
        {image ? (
          <Image source={{ uri: image }} className="w-full h-full" />
        ) : (
          <Text className="text-gray-500">No Image Selected</Text>
        )}
      </View>

      <View className="bg-white rounded-t-3xl -mt-6 p-5 shadow">
        <View className="flex-row items-center mb-3">
          {image && <Image source={{ uri: image }} className="w-16 h-16 rounded-lg mr-3" />}
          <View>
            <Text className="text-xl font-bold text-gray-800">₦{price}</Text>
            <Text className="text-gray-500">{name || "Product name"}</Text>
          </View>
        </View>

        <Text className="text-lg font-semibold mt-2 mb-1">About product</Text>

        {/* Size Selection */}
        <Text className="text-gray-700 font-medium mb-2">Size</Text>
        <View className="flex-row flex-wrap mb-3">
          {sizes.map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setSelectedSize(s)}
              className={`px-4 py-2 rounded-xl border ${
                selectedSize === s
                  ? "bg-[#004CFF] border-[#004CFF]"
                  : "border-gray-300"
              } mx-1 mb-2`}
            >
              <Text
                className={`font-medium ${
                  selectedSize === s ? "text-white" : "text-gray-700"
                }`}
              >
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quantity */}
        <Text className="text-gray-700 font-medium mb-2">Quantity</Text>
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
            className="border border-gray-400 rounded-full w-10 h-10 items-center justify-center"
          >
            <Text className="text-lg font-bold">−</Text>
          </TouchableOpacity>
          <Text className="text-lg font-semibold mx-4">{quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            className="border border-gray-400 rounded-full w-10 h-10 items-center justify-center"
          >
            <Text className="text-lg font-bold">+</Text>
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={handleAddToCart}
            className="flex-1 border border-gray-400 rounded-xl p-3 mr-2 items-center"
          >
            <Text className="text-gray-700 font-semibold">Add to cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleBuyNow}
            className="flex-1 bg-blue-[#004CFF] rounded-xl p-3 ml-2 items-center"
          >
            <Text className="text-white font-semibold">Buy now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
