import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, ImageBackgroundBase } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';

const JuegoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const difficulty = route.params?.difficulty || 'easy';

  const [score, setScore] = useState(0);
  const [time, setTime] = useState(300);
  const [flies, setFlies] = useState([] as Fly[]);

  useEffect(() => {
    // Función para generar moscas
    const generateFlies = () => {
      const newFlies: Fly[] = [];

      for (let i = 0; i < difficultyLevel[difficulty].flyCount; i++) {
        newFlies.push({
          id: i,
          x: Math.random() * (windowWidth - 50),
          y: Math.random() * (windowHeight - 50),
          speedX: (Math.random() - 0.5) * 15,
          speedY: (Math.random() - 0.5) * 15,
        });
      }

      setFlies(newFlies);
    };

    // Generar moscas cuando la dificultad cambia
    generateFlies();
  }, [difficulty]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          updateFlyPositions();
          return prevTime - 1;
        } else {
          clearInterval(timer);
          navigation.navigate('GameOver', { score });
          return 0;
        }
      });
    }, 1000 / 20);

    return () => clearInterval(timer);
  }, [navigation, score]);

  // Función para manejar el clic en la mosca
  const handleFlyClick = (flyId: number) => {
    setScore((prevScore) => prevScore + 1);
    setFlies((prevFlies) => prevFlies.filter((fly) => fly.id !== flyId));
  };

  // Función para actualizar la posición de las moscas
  const updateFlyPositions = () => {
    setFlies((prevFlies) =>
      prevFlies.map((fly) => ({
        ...fly,
        x: fly.x + fly.speedX,
        y: fly.y + fly.speedY,
        speedX: (fly.x + fly.speedX > windowWidth - 50 || fly.x + fly.speedX < 0) ? -fly.speedX : fly.speedX,
        speedY: (fly.y + fly.speedY > windowHeight - 50 || fly.y + fly.speedY < 0) ? -fly.speedY : fly.speedY,
      }))
    );
  };

  // Función para reiniciar el juego cuando la dificultad cambia
  const restartGame = () => {
    setScore(0);
    setTime(300);
  };

  useEffect(() => {
    // Reiniciar el juego cuando la dificultad cambia
    restartGame();
  }, [difficulty]);

  return (

    <View style={styles.container}>
      <ImageBackground source={{uri:'https://lapsonmexico.com/wp-content/uploads/2021/12/51PfTF2p3XL._AC_.jpg'}} style={styles.backgroundImage}>
        <Text>Tiempo restante: {time} segundos</Text>
        <Text>Puntuación: {score}</Text>

        {flies.map((fly) => (
          <TouchableOpacity
            key={fly.id}
            style={[styles.fly, { left: fly.x, top: fly.y }]}
            onPress={() => handleFlyClick(fly.id)}
          >
            <Image
              source={{ uri: 'https://png.pngtree.com/png-vector/20230801/ourmid/pngtree-cartoon-fly-vector-icon-with-big-eyes-on-a-beige-background-png-image_6822893.png' }}
              style={styles.flyImage}
            />
          </TouchableOpacity>
        ))}
      </ImageBackground>
    </View>

  );
};

const windowWidth = 300;
const windowHeight = 500;

const difficultyLevel = {
  easy: { flyCount: 20 },
  medium: { flyCount: 35 },
  hard: { flyCount: 50 },
};

interface Fly {
  id: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c57d56'
  },
  backgroundImage:{
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  fly: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    borderRadius: 25,
  },
  flyImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default JuegoScreen;
