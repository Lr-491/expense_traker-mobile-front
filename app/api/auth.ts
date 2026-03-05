import  AsyncStorage  from "@react-native-async-storage/async-storage";


const API_URL = "http://127.0.0.1:8000/api/";

export const login = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}token/`, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ username, password })
    });

    console.log(`${API_URL}token/`);
    const data = await response.json();


    if (!response.ok) {
        throw new Error("Nom d'utilisateur ou mot de passe incorrect");
    }

    return data; // { access: "...", refresh: "..." }
}

export const register = async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
  
    console.log(`${API_URL}token/`);
    if (!response.ok) {
      throw new Error("Erreur lors de l'inscription");
    }
  
    return await response.json();
  };

export const refreshToken = async () => {
  const refresh = await AsyncStorage.getItem("refresh_token");

  const response = await fetch(`${API_URL}token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) throw new Error("Session expirée");

  const data = await response.json();
  await AsyncStorage.setItem("access_token", data.access);

  return data.access;
};

export const getCurrentUser = async () => {
  const token = await AsyncStorage.getItem("access_token");

  const response = await fetch(`${API_URL}me/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return await response.json();
};