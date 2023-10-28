import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import LandingScreen from "../screens/LandingScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CareTakerHomeScreen from "../screens/CareTakerHomeScreen";
import ViewCaretakerScreen from "../screens/ViewCaretakerScreen";
import MyBookingsScreen from "../screens/MyBookingsScreen";
import TaskScreen from "../screens/TaskScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import CareTakerTaskScreen from "../screens/CareTakerTaskScreen";

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    function BottomTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Home",
                        tabBarLabelStyle: { color: "#435334" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Ionicons
                                    name="ios-home"
                                    size={24}
                                    color="#435334"
                                />
                            ) : (
                                <Ionicons
                                    name="ios-home-outline"
                                    size={24}
                                    color="#435334"
                                />
                            ),
                    }}
                />
                <Tab.Screen
                    name="Bookings"
                    component={MyBookingsScreen}
                    options={{
                        tabBarLabel: "Bookings",
                        headerShown: false,
                        tabBarLabelStyle: { color: "#435334" },
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Ionicons
                                    name="ios-calendar"
                                    size={24}
                                    color="#435334"
                                />
                            ) : (
                                <Ionicons
                                    name="ios-calendar-outline"
                                    size={24}
                                    color="#435334"
                                />
                            ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={UserProfileScreen}
                    options={{
                        tabBarLabel: "Profile",
                        headerShown: false,
                        tabBarLabelStyle: { color: "#435334" },
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Ionicons
                                    name="ios-person"
                                    size={24}
                                    color="#435334"
                                />
                            ) : (
                                <Ionicons
                                    name="ios-person-outline"
                                    size={24}
                                    color="#435334"
                                />
                            ),
                    }}
                />
            </Tab.Navigator>
        );
    }

    function CareTakerBottomTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Dashboard"
                    component={CareTakerHomeScreen}
                    options={{
                        tabBarLabel: "Home",
                        headerShown: false,
                        tabBarLabelStyle: { color: "#435334" },
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Ionicons
                                    name="ios-home"
                                    size={24}
                                    color="#435334"
                                />
                            ) : (
                                <Ionicons
                                    name="ios-home-outline"
                                    size={24}
                                    color="#435334"
                                />
                            ),
                    }}
                />
                <Tab.Screen
                    name="Tasks"
                    component={CareTakerTaskScreen}
                    options={{
                        tabBarLabel: "Tasks",
                        headerShown: false,
                        tabBarLabelStyle: { color: "#435334" },
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Ionicons
                                    name="ios-calendar"
                                    size={24}
                                    color="#435334"
                                />
                            ) : (
                                <Ionicons
                                    name="ios-calendar-outline"
                                    size={24}
                                    color="#435334"
                                />
                            ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={UserProfileScreen}
                    options={{
                        tabBarLabel: "Profile",
                        headerShown: false,
                        tabBarLabelStyle: { color: "#435334" },
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Ionicons
                                    name="ios-person"
                                    size={24}
                                    color="#435334"
                                />
                            ) : (
                                <Ionicons
                                    name="ios-person-outline"
                                    size={24}
                                    color="#435334"
                                />
                            ),
                    }}
                />
            </Tab.Navigator>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Landing"
                screenOptions={{
                    contentStyle: {
                        backgroundColor: "#ffffff",
                    },
                }}
            >
                <Stack.Screen
                    name="Landing"
                    component={LandingScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Main"
                    component={BottomTabs}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="CareTakerMain"
                    component={CareTakerBottomTabs}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="ViewCaretaker"
                    component={ViewCaretakerScreen}
                    options={{ headerShown: true, title: "Caretaker" }}
                />

                <Stack.Screen
                    name="UserTask"
                    component={TaskScreen}
                    options={{ headerShown: true, title: "Tasks" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;

const styles = StyleSheet.create({});
