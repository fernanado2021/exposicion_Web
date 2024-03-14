import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../styles/colors";
import { FontAwesome } from "@expo/vector-icons";

interface HeaderProps {
  reloadGame: () => void;
  pauseGame: () => void;
  children: JSX.Element;
  isPaused: boolean;
}

export default function Header({
  children,
  reloadGame,
  pauseGame,
  isPaused,
}: HeaderProps): JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={reloadGame}>
        <Ionicons name="reload-circle" size={35} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer} onPress={pauseGame}>
        <FontAwesome
          name={isPaused ? "play-circle" : "pause-circle"}
          size={35}
          color={Colors.primary}
        />
      </TouchableOpacity>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: Colors.secondary,
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
    marginHorizontal: 20,
    marginTop: 20,
  },
  iconContainer: {
    padding: 10,
    backgroundColor: Colors.primaryLight,
  },
});
