import AsyncStorage from "@react-native-async-storage/async-storage";


const API_URL = "http://127.0.0.1:8000/api/";

export const addExpense = async (categoryId: number, amount: number, description: string) => {
    const token = await AsyncStorage.getItem("access_token");
    const response = await fetch(`${API_URL}expenses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ category: categoryId, amount, description }),
    });
  
    const data = await response.json();

    if (!response.ok) throw new Error(data.detail || "Impossible d'ajouter la dépense");
    return data;
  };

  export const getExpenses = async () => {
    const token = await AsyncStorage.getItem("access_token");
  
    const response = await fetch(`${API_URL}expenses/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Erreur récupération dépenses");
    }
  
    return await response.json();
  };

export const updateExpense = async (id: number, amount: number) => {
    const token = await AsyncStorage.getItem("access_token");
    const response = await fetch(`${API_URL}expenses/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    });
  
    if (!response.ok) throw new Error("Impossible de modifier la dépense");
    return await response.json();
  };

export const deleteExpense = async (id: number) => {
    const token = await AsyncStorage.getItem("access_token");
    const response = await fetch(`${API_URL}expenses/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) throw new Error("Impossible de supprimer la dépense");
  };

  export const getCategories = async () => {
    const token = await AsyncStorage.getItem("access_token");
  
    const response = await fetch(`${API_URL}categories/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await response.json();
    console.log(data);
    
    if (!response.ok) {
      throw new Error("Erreur récupération catégories");
    }
  
    return data;
  };