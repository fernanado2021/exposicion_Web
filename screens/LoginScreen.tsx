import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';
import Toast from 'react-native-simple-toast';

const backgroundImageUrl = 'https://media.licdn.com/dms/image/C5622AQFMJjm9jTc26g/feedshare-shrink_800/0/1664992721552?e=2147483647&v=beta&t=0zIYD5u7ylRmj-0_FdlbwCj-HRvd-PfEeDUPCkIuqLs';

export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  async function login() {
    try {
      if (!correo || !contrasenia) {
        Toast.show("Ingrese su correo electrónico y contraseña");
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, correo, contrasenia);
      const user = userCredential.user;
      navigation.navigate("Drawer");
      setCorreo('');
      setContrasenia('');
    } catch (error) {
      let errorMessage = '';

      switch (error.code) {
        case "auth/invalid-credential":
          errorMessage = "Credenciales incorrectas";
          break;
        case "auth/missing-password":
          errorMessage = "Ingrese su contraseña";
          break;
        default:
          errorMessage = "Ingrese sus credenciales";
          break;
      }

      Toast.show(errorMessage);
    }
  }
  
  return (
    <ImageBackground source={{ uri: backgroundImageUrl }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <TextInput
          style={styles.input}
          placeholder='Ingresar email'
          keyboardType='email-address'
          onChangeText={(texto: any) => setCorreo(texto)}
          value={correo}
          placeholderTextColor="#fff"
        />

        <TextInput
          style={styles.input}
          placeholder="Ingresar contraseña"
          onChangeText={(texto: any) => setContrasenia(texto)}
          value={contrasenia}
          secureTextEntry={true}
          placeholderTextColor="#fff"
        />

        <Button title='Ingresar' onPress={() => login()} />

        <TouchableOpacity
          onPress={() => navigation.navigate('Registro')}
          accessibilityRole="button"
        >
          <Text style={styles.registerText} accessibilityRole="button">👉 Regístrate aquí 👈</Text>
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
    marginTop: 80
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    fontWeight: 'bold'
  },
  registerText: {
    marginTop: 20,
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  }
});
