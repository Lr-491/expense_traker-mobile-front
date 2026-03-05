import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../../api/auth";
import { Link, useRouter } from "expo-router";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()

  const handleLogin = async () => {
    try {
        const cleanUsername = username.trim();
        const cleanPassword = password.trim();
    
        const data = await login(cleanUsername, cleanPassword);
        console.log("RESPONSE:", data);
        await AsyncStorage.setItem("access_token", data.access);
        router.replace("/screens/HomeScrenn");
    } catch (err: any) {
      setError("nom d'utilisatuer ou mot de passe incorrect front");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>Connexion</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Nom d'utilisateur"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <TextInput
          placeholder="Mot de passe"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
        <Link href={"/screens/(aut)/RegisterScreen"}>
          <Text>
              Pas de compte ? S'inscrire
          </Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f8",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
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