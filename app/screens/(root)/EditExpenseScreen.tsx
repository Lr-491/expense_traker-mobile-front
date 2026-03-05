import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";



type RootStackParamList = {
  EditExpense: { id: number };
};

type EditExpenseRouteProp = RouteProp<
  RootStackParamList,
  "EditExpense"
>;

export default function EditExpenseScreen() {
  const route = useRoute<EditExpenseRouteProp>();
  const navigation = useNavigation();

  const { id } = useLocalSearchParams<{ id: string }>();
  const expenseId = Number(id);
  console.log("ID reçu :", expenseId);

  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  // 🔹 Charger la dépense
  useEffect(() => {
    fetchExpense();
  }, []);

  const fetchExpense = async () => {
    const token = await AsyncStorage.getItem("access_token");
    console.log(token);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/expenses/${expenseId}/`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
            },
        }
      );

      if (!response.ok) throw new Error("Erreur récupération");

      const data = await response.json();

      setAmount(data.amount.toString());
      setDescription(data.description);
      setCategory(data.category.toString());
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 Modifier la dépense
  const handleUpdate = async () => {
    const token = await AsyncStorage.getItem("access_token");
    console.log(token);
    
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/expenses/${expenseId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
            },
          body: JSON.stringify({
            amount,
            description,
            category,
          }),
        }
      );

      if (!response.ok) throw new Error("Erreur modification");

      Alert.alert("Succès", "Dépense modifiée !");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erreur", "Impossible de modifier");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Montant</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <Text>Catégorie (ID)</Text>
      <TextInput
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      <Button title="Modifier la dépense" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 8,
    borderRadius: 5,
  },
});