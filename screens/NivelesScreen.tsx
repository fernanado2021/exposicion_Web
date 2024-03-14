import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NivelesScreen = ({ navigation }: any) => {

  const startGame = (difficulty: string) => {
    navigation.navigate('Juegos', { difficulty });
  };

  return (
    <ImageBackground source={{ uri: 'https://img.freepik.com/vector-gratis/photocall-juegos-neon-dibujado-mano_23-2149860761.jpg' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Seleccione la dificultad:</Text>
        <View style={styles.buttonContainer}>
          <Button title="Fácil" onPress={() => startGame('easy')} color="#CB4335" />
        </View>
        <View style={[styles.buttonContainer, { marginTop: 10 }]}>
          <Button title="Moderado" onPress={() => startGame('medium')} color="#CB4335" />
        </View>
        <View style={[styles.buttonContainer, { marginTop: 10 }]}>
          <Button title="Difícil" onPress={() => startGame('hard')} color="#CB4335" />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20, // Bordes redondeados
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Sombra para efecto moderno
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'white'
  },
  buttonContainer: {
    width: '100%',
  },
});

export default NivelesScreen;
