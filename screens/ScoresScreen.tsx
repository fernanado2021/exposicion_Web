import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { db } from '../config/Config';
import { ref, onValue } from 'firebase/database';

interface ScoreData {
  [key: string]: {
    score: number;
    timestamp: number;
  };
}

const ScoresListScreen: React.FC = () => {
  const [scores, setScores] = useState<{ nick: string; score: number; timestamp: number }[]>([]);

  useEffect(() => {
    const scoresRef = ref(db, 'puntuaciones');

    const unsubscribe = onValue(scoresRef, (snapshot) => {
      const scoresData: ScoreData = snapshot.val();
      if (scoresData) {
        const scoresArray = Object.keys(scoresData).map((nick) => ({
          nick,
          score: scoresData[nick].score,
          timestamp: scoresData[nick].timestamp,
        }));
        setScores(scoresArray);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const renderScoreItem = ({ item }: { item: { nick: string; score: number; timestamp: number } }) => (
    <View style={styles.scoreItem}>
      <Text style={styles.nickText}>Nick: {item.nick}</Text>
      <Text style={styles.scoreText}>Puntuación: {item.score}</Text>
      {/* Puedes mostrar el timestamp si lo deseas */}
      {/* <Text style={styles.timestampText}>Timestamp: {item.timestamp}</Text> */}
    </View>
  );

  return (
    <ImageBackground source={{ uri: 'https://media.licdn.com/dms/image/C5622AQFMJjm9jTc26g/feedshare-shrink_800/0/1664992721552?e=2147483647&v=beta&t=0zIYD5u7ylRmj-0_FdlbwCj-HRvd-PfEeDUPCkIuqLs' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Puntuaciones</Text>
        <FlatList
          data={scores}
          renderItem={renderScoreItem}
          keyExtractor={(item) => item.nick}
        />
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 200
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff', // Color del texto
  },
  scoreItem: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.01)', // Fondo semi-transparente    width: '100%',
  },
  nickText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'white'
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 4,
    color: 'white'
  },
});

export default ScoresListScreen;
