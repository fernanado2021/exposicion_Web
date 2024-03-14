import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";

import WelcomeScreen from "../screens/WelcomeScreen";
import NivelesScreen from "../screens/NivelesScreen";
import GameOverScreen from "../screens/GameOverScreen";
import JuegosScreen from "../screens/JuegosScreen";
import PerfilScreen from "../screens/PerfilScreen";
import ScoresScreen from "../screens/ScoresScreen";
import RegistroScreen from "../screens/RegistroScreen";
import Game from "../src/Components/Game";
import Board from '../src1/components/Board';


const Stack = createStackNavigator();
function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Registro" component={RegistroScreen}/>
            <Stack.Screen name="Drawer" component={MyDrawer} options={{headerShown: false}}/>  
        </Stack.Navigator>
    )
}

const Drawer = createDrawerNavigator();
function MyDrawer(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="Welcome" component={WelcomeScreen} />
            <Drawer.Screen name="Niveles" component={NivelesScreen}/>
            <Drawer.Screen name="Perfil" component={PerfilScreen}/>
            <Drawer.Screen name="Snack" component={Game}/>
            <Drawer.Screen name="Buscaminnas" component={Board}/>
            <Drawer.Screen name="Score" component={ScoresScreen}/>
            <Drawer.Screen name="Juegos" component={JuegosScreen} options={{ drawerLabel: () => null }} />
            <Drawer.Screen name="GameOver" component={GameOverScreen}options={{ drawerLabel: () => null }}/>

        </Drawer.Navigator>
    )
}

export default function MainNavigator(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}