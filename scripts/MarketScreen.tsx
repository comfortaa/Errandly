import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Default export React component for Expo (React Native) app
// Tailwind classes are used in JSX (assumes tailwind is configured in your project)

export default function ErrandMarketScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Buy'); // Buy | Sell | Exchange
  const [searchText, setSearchText] = useState('');

  // For "Sell" flow: image + text fields
  const [pickedImage, setPickedImage] = useState(null);
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDesc, setProductDesc] = useState('');

  // mock data for grids and carousels (developer will replace with real data)
  const categories = [
    {id: '1', title: 'Clothing'},
    {id: '2', title: 'Shoes'},
    {id: '3', title: 'Bags'},
    {id: '4', title: 'Gadgets'},
    {id: '5', title: 'Watch'},
    {id: '6', title: 'Hoodies'},
  ];

  const topProducts = [{id:'1'},{id:'2'},{id:'3'},{id:'4'},{id:'5'}];

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission for media library needed.');
      }
    })();
  }, []);

  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled) {
        setPickedImage(result.assets[0].uri);
      }
    } catch (err) {
      console.warn('Image picker error', err);
    }
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      console.log('Camera permission denied');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
    }
  };

  // simple small components used inside the screen
  const TabButton = ({ label }) => (
    <TouchableOpacity onPress={() => setActiveTab(label)} className={`px-3 py-2 rounded-full border ${activeTab===label? 'border-blue-500 bg-blue-50':'border-gray-300 bg-white'}`}>
      <Text className={`${activeTab===label? 'text-blue-[#004CFF]font-semibold':'text-gray-600'}`}>{label}</Text>
    </TouchableOpacity>
  );

  const CategoryCard = ({item}) => (
    <View className="w-1/2 p-2">
      <TouchableOpacity className="bg-white rounded-xl p-3 shadow">
        <View className="h-28 bg-gray-100 rounded mb-2 items-center justify-center">
          <Text className="text-gray-400">Image</Text>
        </View>
        <Text className="text-sm font-medium">{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-4 pt-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-extrabold">Market</Text>
          <TouchableOpacity onPress={() => openCamera()} className="p-2">
            <Ionicons name="camera-outline" size={24} />
          </TouchableOpacity>
        </View>

        <View className="mt-3 flex-row items-center bg-white rounded-xl p-2 shadow">
          <Ionicons name="search" size={18} style={{marginLeft:6}} />
          <TextInput
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            className="flex-1 px-2 py-1"
          />
          <TouchableOpacity onPress={openCamera} className="p-2">
            <Ionicons name="camera" size={20} />
          </TouchableOpacity>
        </View>

        {/* tabs */}
        <View className="mt-4 flex-row space-x-3">
          <TabButton label="Buy" />
          <TabButton label="Sell" />
          <TabButton label="Exchange" />
        </View>
      </View>

      <ScrollView className="flex-1 mt-4" contentContainerStyle={{paddingBottom: 120}}>
        {/* Buy tab content */}
        {activeTab === 'Buy' && (
          <View className="px-4">
            {/* Promo banner */}
            <View className="rounded-xl bg-yellow-400 h-36 p-4 mb-4 justify-between">
              <Text className="text-white text-xl font-bold">Big Sale</Text>
              <Text className="text-white">Up to 50% - Happening Now</Text>
            </View>

            {/* Categories grid */}
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-lg font-semibold">Categories</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Buy')}>
                <Text className="text-[#004CFF]">See All →</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row flex-wrap -mx-2">
              {categories.map(c => <CategoryCard key={c.id} item={c} />)}
            </View>

            {/* Top products horizontal */}
            <View className="mt-4">
              <Text className="text-lg font-semibold mb-2">Top Products</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
                {topProducts.map(p => (
                  <View key={p.id} className="w-20 h-20 rounded-full bg-white m-2 items-center justify-center shadow">
                    <Text>Img</Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* New Items / Product list placeholder (scrollable) */}
            <View className="mt-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-lg font-semibold">New Items</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Buy')}>
                  <Text className="text-[#004CFF]">See All →</Text>
                </TouchableOpacity>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {/* placeholders for product cards */}
                {[1,2,3,4].map(i => (
                  <View key={i} className="w-40 h-48 bg-white rounded-xl mr-3 p-3 shadow">
                    <View className="h-28 bg-gray-100 rounded mb-3 items-center justify-center">
                      <Text>Img</Text>
                    </View>
                    <Text className="font-medium">Product {i}</Text>
                    <Text className="text-sm text-gray-400">₦{i * 5000}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        {/* Sell tab content */}
        {activeTab === 'Sell' && (
          <View className="px-4">
            <View className="border-2 border-dashed border-gray-300 rounded-xl h-36 items-center justify-center">
              {pickedImage ? (
                <Image source={{uri: pickedImage}} className="w-full h-full rounded-xl" style={{resizeMode:'cover'}} />
              ) : (
                <TouchableOpacity onPress={openImagePicker} className="items-center">
                  <Ionicons name="image-outline" size={36} />
                  <Text className="text-[#004CFF]mt-2">Add New Product</Text>
                </TouchableOpacity>
              )}
            </View>

            <View className="mt-4 space-y-3">
              <TextInput
                placeholder="Product title"
                value={productTitle}
                onChangeText={setProductTitle}
                className="bg-white p-3 rounded-xl shadow"
              />
              <TextInput
                placeholder="Price"
                value={productPrice}
                onChangeText={setProductPrice}
                keyboardType="numeric"
                className="bg-white p-3 rounded-xl shadow"
              />
              <TextInput
                placeholder="Short description"
                value={productDesc}
                onChangeText={setProductDesc}
                multiline
                numberOfLines={3}
                className="bg-white p-3 rounded-xl shadow h-24 text-top"
              />

              <TouchableOpacity className="bg-[#004CFF]rounded-xl p-3 items-center">
                <Text className="text-white font-semibold">Submit for Review</Text>
              </TouchableOpacity>
            </View>

            {/* Product Listed preview */}
            <View className="mt-6">
              <View className="flex-row justify-between items-center mt-6 mb-2">
              <Text className="text-lg font-semibold">Product Listed</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SellProductList')}>
                <Text className="text-[#004CFF]text-sm font-medium">See All →</Text>
              </TouchableOpacity>
            </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[1,2,3].map(i => (
                  <View key={i} className="w-40 h-44 bg-white rounded-xl mr-3 p-3 shadow">
                    <View className="h-24 bg-gray-100 rounded mb-3 items-center justify-center"><Text>Img</Text></View>
                    <Text className="font-medium">Sample Item {i}</Text>
                    <Text className="text-xs text-gray-400">Status: Successful</Text>
                    <Text className="font-bold">₦{i * 10000}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Pending Orders (avatars) */}
            <View className="mt-6">
              <Text className="text-lg font-semibold mb-2">Pending Orders</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[1,2,3,4,5].map(i => (
                  <View key={i} className="w-12 h-12 rounded-full bg-white mr-3 items-center justify-center shadow">
                    <Text>U{i}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>

          </View>
        )}

        {/* Exchange tab short placeholder */}
        {activeTab === 'Exchange' && (
          <View className="px-4">
            <Text className="text-lg font-semibold">Exchange</Text>
            <Text className="text-gray-500 mt-2">Exchange flow will be handled here. Use image picker + text fields similar to Sell tab.</Text>

            <TouchableOpacity onPress={openImagePicker} className="mt-4 bg-white p-3 rounded-xl shadow items-center">
              <Text>Select Image for Exchange</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>

    </SafeAreaView>
  );
}

