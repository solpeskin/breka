import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import Categories from "../screens/Categories";
import Cart from "../screens/Cart";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileStackNavigator from "./ProfileStackNavigator";
import Favorites from "../screens/Favorites";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='HomeStack'
            screenOptions={() => ({
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                headerShown: false,
            })}
        >
            <Tab.Screen
                name="CategoriesScreen"
                component={Categories}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                {focused ? <Ionicons name="menu" size={20} color="black" />
                                : <Ionicons name="menu-outline" size={20} color="black" />}
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="myProfile"
                component={ProfileStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                {focused ? <MaterialCommunityIcons name="account-circle" size={20} color="black" />
                                : <MaterialCommunityIcons name="account-circle-outline" size={20} color="black" />}
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="HomeStack"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Text style={[styles.text, focused && styles.textFocused]}>HOME</Text>
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="CartScreen"
                component={Cart}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                {focused ? <Ionicons name="cart" size={20} color="black" />
                                : <Ionicons name="cart-outline" size={20} color="black" />}
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                {focused ? <Ionicons name="bookmark" size={20} color="black" />
                                : <Ionicons name="bookmark-outline" size={20} color="black" />}
                            </View>
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
    tabBar: {
        height: 80,
    },
    text: {
        color: "black",
    },
    textFocused: {
        fontWeight: 500
    },
});
