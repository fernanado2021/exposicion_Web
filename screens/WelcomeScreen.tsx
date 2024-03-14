import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { auth } from '../config/Config';
import Toast from 'react-native-simple-toast';

export default function WelcomeScreen({ navigation }: any) {
  function salir() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        Toast.show("Sesión cerrada correctamente");
        navigation.navigate("Login");
      })
      .catch(() => {
        Toast.show("No se pudo cerrar sesión");
      });
  }

  const backgroundImageUrl = "https://media.licdn.com/dms/image/C5622AQFMJjm9jTc26g/feedshare-shrink_800/0/1664992721552?e=2147483647&v=beta&t=0zIYD5u7ylRmj-0_FdlbwCj-HRvd-PfEeDUPCkIuqLs"; // Reemplaza "URL_DE_LA_IMAGEN" con la URL de tu imagen

  return (
    <ImageBackground source={{ uri: backgroundImageUrl }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>¡Bienvenido!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => salir()}
        >
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'red', // Puedes cambiar el color del botón según tus preferencias
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff', // Puedes cambiar el color del texto del botón según tus preferencias
    fontSize: 16,
    fontWeight: 'bold',
  },
});
