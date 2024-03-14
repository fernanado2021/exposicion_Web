import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Colors } from "../styles/colors";
import { Audio } from "expo-av";
import { Direction, Coordinate, GestureEventType } from "../types/types";
import { checkEatsFood } from "../utils/checkEatsFood";
import { checkGameOver } from "../utils/checkGameOver";
import { randomFoodPosition } from "../utils/randomFoodPosition";
import Food from "./Food";
import Header from "./Header";
import Score from "./Score";
import Snake from "./Snake";
import Toast from "react-native-simple-toast";

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 63 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

export default function Game(): JSX.Element {
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    // Función para cargar y reproducir el audio al iniciar el juego
    async function playStartSound() {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/audio/sound.mp3")
      );
      setSound(sound);
      await sound.playAsync();
    }
    playStartSound(); // Llamar a la función para reproducir el sonido al iniciar el juego

    return () => {
      // Función para detener el audio al salir del componente
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (isGameOver && sound) {
      sound.stopAsync(); // Detener el audio cuando el juego termina
    }
  }, [isGameOver, sound]);

  useEffect(() => {
    if (!isGameOver && !isPaused) {
      const intervalId = setInterval(() => {
        moveSnake();
      }, MOVE_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver, isPaused]);

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = { ...snakeHead };

    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver(true);
      return;
    }

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }

    if (checkEatsFood(newHead, food, 2)) {
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setSnake([newHead, ...snake]);
      setScore(score + SCORE_INCREMENT);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };

  const handleGesture = (event: GestureEventType) => {
    const { translationX, translationY } = event.nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        setDirection(Direction.Right);
      } else {
        setDirection(Direction.Left);
      }
    } else {
      if (translationY > 0) {
        setDirection(Direction.Down);
      } else {
        setDirection(Direction.Up);
      }
    }
  };

  const reloadGame = async () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setIsGameOver(false);
    setScore(0);
    setDirection(Direction.Right);
    setIsPaused(false);

    // Reanudar el audio si no está pausado
    if (sound && !isPaused) {
      await sound.replayAsync();
    }
  };

  const pauseGame = async () => {
    setIsPaused(!isPaused);

    // Pausar o reanudar el audio dependiendo del estado de pausa
    if (sound) {
      if (isPaused) {
        await sound.pauseAsync();
      } else {
        await sound.replayAsync();
      }
    }
  };

  const gameOverMessage = () => {
    if (isGameOver) {
      Toast.show(`Perdiste. Puntaje obtenido: ${score}`, Toast.LONG);
    }
  };

  useEffect(() => {
    gameOverMessage();
  }, [isGameOver, score]);

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Header reloadGame={reloadGame} pauseGame={pauseGame} isPaused={isPaused}>
          <Score score={score} />
        </Header>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  boundaries: {
    flex: 1,
    borderColor: Colors.secondary,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Colors.background,
  },
});
