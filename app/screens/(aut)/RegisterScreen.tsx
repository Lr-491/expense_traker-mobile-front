import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import { register } from "../../api/auth";
import { Link, useRouter } from "expo-router";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()

  const handleRegister = async () => {
    try {
      await register(username, email, password);
      router.replace("/screens/(aut)/LoginScreen");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername} />
        <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
        <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />

        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={{ color: "#fff" }}>Créer un compte</Text>
        </TouchableOpacity>
        <Link href={"/screens/(aut)/LoginScreen"}>
            <Text>
                Vous possedez un compte ? Connexion
            </Text>
          </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#222",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 20,
    elevation: 6, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  input: {
    backgroundColor: "#f1f3f6",
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "#e63946",
    textAlign: "center",
    marginBottom: 10,
  },
});