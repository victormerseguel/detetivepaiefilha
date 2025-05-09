import {
  Entypo,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarActiveTintColor: "#feec5f",
        tabBarInactiveTintColor: "#e8e8e8",
        tabBarStyle: {
          backgroundColor: "#599253",
          borderColor: "transparent",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name={"people-group"} size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="armas"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="pistol" size={33} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="locais"
        options={{
          tabBarIcon: ({ color }) => (
            //   <IconSymbol size={28} name="paperplane.fill" color={color} />
            <Entypo name="location" size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="confidencial"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="file-lock" size={33} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
