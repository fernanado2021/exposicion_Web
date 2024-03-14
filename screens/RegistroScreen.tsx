import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../config/Config';
import * as ImagePicker from 'expo-image-picker';
import { ref as databaseRef, update } from "firebase/database";
import { getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from '../config/Config';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-simple-toast';

export default function RegistroScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [nick, setNick] = useState('');
  const [edad, setEdad] = useState('');
  const [imagen, setImagen] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImagen(result.uri);
    }
  };

  async function subirImagenYRegistrar() {
    try {
      if (!imagen) {
        Toast.show('Seleccione una imagen');
        return;
      }

      const storageRef = ref(storage, 'avatars/' + correo);
      const response = await fetch(imagen);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob, {
        contentType: 'image/jpg',
      });

      const imageURL = await getDownloadURL(storageRef);

      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasenia);
      const user = userCredential.user

      const userRef = databaseRef(db, `usuarios/${correo.replace(/\./g, '_')}`);
      await update(userRef, {
        nick: nick,
        edad: edad,
        avatarURL: imageURL,
      });

      Toast.show('¡Registro exitoso! Has sido registrado correctamente.');
      navigation.navigate('Login');

      setCorreo('');
      setContrasenia('');
      setNick('');
      setEdad('');
    } catch (error) {
      console.error(error);
      Toast.show('Ocurrió un error durante la carga de imagen o el registro.');
    }
  }

  return (
    <ImageBackground source={{ uri: 'https://media.licdn.com/dms/image/C5622AQFMJjm9jTc26g/feedshare-shrink_800/0/1664992721552?e=2147483647&v=beta&t=0zIYD5u7ylRmj-0_FdlbwCj-HRvd-PfEeDUPCkIuqLs' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>
        {imagen !== '' && <Image source={{ uri: imagen }} style={styles.img} />}
        <View style={styles.row}>
          <Ionicons name="camera" size={35} color="white" onPress={() => pickImage()} style={styles.icon} />
          <Text style={styles.text}>Suba su imagen</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder='Ingrese email'
          placeholderTextColor="#fff"
          onChangeText={(texto) => setCorreo(texto)}
          value={correo}
        />
        <TextInput
          style={styles.input}
          placeholder='Ingrese contraseña'
          placeholderTextColor="#fff"
          onChangeText={(texto) => setContrasenia(texto)}
          secureTextEntry={true}
          value={contrasenia}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese un nick"
          placeholderTextColor="#fff"
          onChangeText={(texto) => setNick(texto)}
          value={nick}
        />
        <TextInput
          style={styles.input}
          placeholder="Edad"
          placeholderTextColor="#fff"
          onChangeText={(texto) => setEdad(texto)}
          value={edad}
        />
        <Button title='Registrarse' onPress={() => subirImagenYRegistrar()} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.touchableOpacity}>
          <Text style={styles.touchableOpacityText}>👉 Ir a Iniciar Sesión 👈</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.09)',
    padding: 20,
    marginTop: 75
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 75,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'transparent',
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    color: '#fff',
  },
  touchableOpacity: {
    paddingVertical: 10,
  },
  touchableOpacityText: {
    color: '#fff',
  }
});
