/**
 * AddExpenseScreen.tsx
 *
 * Écran permettant à l'utilisateur connecté
 * d'ajouter une nouvelle dépense.
 *
 * Fonctionnement :
 * - L'utilisateur saisit catégorie, montant et description
 * - Les données sont envoyées à l'API Django sécurisée (JWT)
 * - En cas de succès → retour à la HomeScreen
 * - En cas d'erreur → affichage d'un message
 */

import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator
} from "react-native";

import { addExpense, getCategories } from "../api/expenses";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

export default function AddExpenseScreen() {

  /**
   * États locaux du formulaire
   *
   * IMPORTANT :
   * TextInput retourne toujours des STRING.
   * On convertira le montant en number au moment de l'envoi.
   */
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        console.log(data);
        
      } catch (err) {
        console.log(err);
      }
    };

    loadCategories();
  }, []);

  /**
   * handleAddExpense
   *
   * - Valide les champs
   * - Convertit le montant en number
   * - Appelle l'API
   * - Gère les erreurs
   */
  const handleAddExpense = async () => {
    setError("");

    // Validation simple
    if (!selectedCategory || !amount) {
      setError("Veuillez remplir les champs obligatoires");
      return;
    }

    try {
      setLoading(true);

      await addExpense(
        selectedCategory,      // conversion en number
        parseFloat(amount),    // conversion sécurisée
        description
      );

      // Retour à l'écran précédent
      router.back();

    } catch (err: any) {
      setError(err.message || "Erreur lors de l'ajout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>Ajouter une dépense</Text>

            {/* Dropdown Catégories */}
            <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Choisir une catégorie" value={null} />
          {categories.map((cat) => (
            <Picker.Item
              key={cat.id}
              label={cat.name}
              value={cat.id}
            />
          ))}
        </Picker>
      </View>

      <TextInput
        placeholder="Montant (FCFA)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Description (optionnel)"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleAddExpense}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Ajouter</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

/**
 * Styles modernes et minimalistes
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f4f8",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
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
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});