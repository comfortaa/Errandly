import { useState } from "react";
import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

const CreateAccountScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [number, setNumber] = useState("");

  const handleDone = () => {
    console.log({ name, email, password, type, number });
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setPassword("");
    setType("");
    setNumber("");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require("./assets/background.png")} // ← your background image
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Create{"\n"}Account</Text>

          <View style={styles.form}>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              placeholder="Type"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={type}
              onChangeText={setType}
            />
            <TextInput
              placeholder="Number"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={number}
              onChangeText={setNumber}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "85%",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 40,
  },
  form: {
    width: "100%",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  doneButton: {
    backgroundColor: "#004CFF",
    borderRadius: 15,
    width: "100%",
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  doneText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  cancelText: {
    color: "#555",
    fontSize: 14,
    marginTop: 15,
  },
});
