import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet, ImageBackground } from 'react-native';
import { db } from '../config/Config';
import { ref, onValue, update } from 'firebase/database';
import Toast from 'react-native-simple-toast';

export default function PerfilScreen() {
  const [correo, setCorreo] = useState('');
  const [nick, setNick] = useState('');
  const [edad, setEdad] = useState('');
  const [avatarURL, setAvatarURL] = useState('');

  useEffect(() => {
    const starCountRef = ref(db, `usuarios/${correo.replace(/\./g, '_')}`);
    onValue(starCountRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        setNick(userData.nick);
        setEdad(userData.edad);
        setAvatarURL(userData.avatarURL);
      }
    });
  }, [correo]);

  function actualizar() {
    // Realiza la actualización en la base de datos
    update(ref(db, `usuarios/${correo.replace(/\./g, '_')}`), {
      edad: edad,
      nick: nick,
    })
      .then(() => {
        Toast.show('Perfil actualizado correctamente.');
        console.log('Perfil actualizado correctamente');
      })
      .catch((error) => {
        console.error('Error al actualizar el perfil:', error);
        Toast.show('Ocurrió un error al actualizar el perfil.');
      });
  }

  return (
    <ImageBackground source={{ uri: 'https://media.licdn.com/dms/image/C5622AQFMJjm9jTc26g/feedshare-shrink_800/0/1664992721552?e=2147483647&v=beta&t=0zIYD5u7ylRmj-0_FdlbwCj-HRvd-PfEeDUPCkIuqLs' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>ACTUALIZAR DATOS</Text>
        <Image source={{ uri: avatarURL }} style={styles.avatar} />
        <TextInput
          style={styles.input}
          placeholder='Ingrese su correo actual'
          placeholderTextColor="#fff" // Color del texto del placeholder
          onChangeText={(texto) => setCorreo(texto)}
        />

        <TextInput
          style={styles.input}
          placeholder='Ingrese su nuevo nick'
          placeholderTextColor="#fff" // Color del texto del placeholder
          onChangeText={(texto) => setNick(texto)}
        />

        <TextInput
          style={styles.input}
          placeholder='Ingrese su nueva edad'
          placeholderTextColor="#fff" // Color del texto del placeholder
          onChangeText={(texto) => setEdad(texto)}
        />

        <Button color='#50C878' title='Actualizar' onPress={() => actualizar()} />

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
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
    fontFamily: 'Roboto', // Utiliza una fuente moderna como Roboto
  },
  input: {
    width: 300,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    color: '#fff', // Color del texto del TextInput
    backgroundColor: 'rgba(255, 255, 255, 0.08)', // Fondo transparente con opacidad
    fontWeight:'bold'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#50C878',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto', // Utiliza una fuente moderna como Roboto
  },
});
