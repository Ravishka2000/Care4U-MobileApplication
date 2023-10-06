import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import LandingScreen from "../screens/LandingScreen";
import LoginScreen from "../screens/LoginScreen";
import CaretakerRegisterScreen from "../screens/CaretakerRegisterScreen";
import UserRegisterScreen from "../screens/UserRegisterScreen";
import GiveFeedbackScreen from "../screens/GiveFeedbackScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import axios from "axios";


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
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Ionicons name="ios-home" size={24} color="#435334" />
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
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Bookings",
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
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Profile",
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


                <Tab.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        tabBarLabel: "Login",
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

                <Tab.Screen
                    name="Give Feedback"
                    component={()=>(
                        <GiveFeedbackScreen/>
                    )}
                    options={{
                        tabBarLabel: "Give a Feedback",
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

                <Tab.Screen
                    name="Feedback"
                    component={()=>(
                        <FeedbackScreen/>
                    )}
                    options={{
                        tabBarLabel: "Feedback",
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
            <Stack.Navigator initialRouteName="Landing">

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


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;

const styles = StyleSheet.create({});
