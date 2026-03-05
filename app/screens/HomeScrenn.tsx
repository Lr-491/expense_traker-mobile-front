import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getExpenses, deleteExpense } from "../api/expenses";
import { getCurrentUser, refreshToken } from "../api/auth";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const router = useRouter();

  const loadData = async () => {
    try {
      const user = await getCurrentUser();
      setUsername(user.username);

      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.navigate("/screens/(aut)/LoginScreen");
  };

  const handleDelete = async (id: number) => {
    await deleteExpense(id);
    loadData();
  };

  const total = expenses.reduce(
    (sum, item) => sum + parseFloat(item.amount),
    0
  );

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Bonjour, {username}</Text>

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => router.navigate("/screens/AddExpensesScreen")}>
            <Text style={styles.actionBtn}>➕</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={refreshToken}>
            <Text style={styles.actionBtn}>🔄</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.actionBtn}>🚪</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* TOTAL */}
      <View style={styles.totalCard}>
        <Text style={styles.totalText}>Total dépenses</Text>
        <Text style={styles.totalAmount}>{total.toFixed(2)} FCFA</Text>
      </View>

      <Text style={styles.greeting}>Transactions récentes</Text>
      {/* LIST */}
      {expenses.length === 0 ? (
        <Text style={styles.empty}>Aucune dépense enregistrée</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.category}>{item.category_name}</Text>
              <Text>{item.description}</Text>
              <Text style={styles.amount}>{item.amount} FCFA</Text>

              <View style={styles.row}>
                <TouchableOpacity
                   onPress={() =>
                    router.push({
                      pathname: "/screens/EditExpenseScreen",
                      params: { id: item.id.toString() },
                    })
                  }
                >
                  <Text style={styles.edit}>Modifier</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Text style={styles.delete}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}




const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f2f4f8" },
  
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  
    greeting: { fontSize: 18, fontWeight: "bold" },
  
    actions: { flexDirection: "row", gap: 15 },
  
    actionBtn: { fontSize: 22 },
  
    totalCard: {
      backgroundColor: "#2563eb",
      padding: 20,
      borderRadius: 15,
      marginVertical: 20,
    },
  
    totalText: { color: "#fff", fontSize: 16 },
    totalAmount: { color: "#fff", fontSize: 28, fontWeight: "bold" },
  
    empty: { textAlign: "center", marginTop: 50 },
  
    card: {
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 12,
      marginBottom: 10,
    },
  
    category: { fontWeight: "bold" },
    amount: { fontWeight: "bold", marginTop: 5 },
  
    row: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  
    edit: { color: "#2563eb" },
    delete: { color: "#e63946" },
  });