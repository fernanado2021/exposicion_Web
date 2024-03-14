import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { db } from '../config/Config';
import { ref, set, serverTimestamp } from 'firebase/database';

const GameOverScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const score = route.params?.score || 0;
  const [nick, setNick] = useState('');

  const handlePlayAgain = () => {
    // Verifica que se haya ingresado un nick antes de guardar la puntuación
    if (nick.trim() === '') {
      alert('Por favor, ingresa tu nick antes de guardar la puntuación.');
      return;
    }

    // Guardar la puntuación en Firebase Realtime Database con el nick como clave primaria
    const scoresRef = ref(db, `puntuaciones/${nick}`);
    set(scoresRef, {
      score: score,
      timestamp: serverTimestamp(),
    });

    // Navegar de vuelta a la pantalla de selección de dificultad
    navigation.navigate('Niveles');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameOverText}>Juego terminado</Text>
      <Text style={styles.scoreText}>Puntuación final: {score}</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu nick"
        value={nick}
        onChangeText={(text) => setNick(text)}
      />
      <Button title="Jugar de nuevo" onPress={handlePlayAgain} color="#D4AC0D" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default GameOverScreen;
