import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/(aut)/LoginScreen";
import HomeScreen from "./screens/HomeScrenn";
import RegisterScreen from "./screens/(aut)/RegisterScreen";
import AddExpenseScreen from "./components/ExpenseCard";
import EditExpenseScreen from "./screens/(root)/EditExpenseScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (

      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        <Stack.Screen name="EditExpense" component={EditExpenseScreen} />
      </Stack.Navigator>

  );
}