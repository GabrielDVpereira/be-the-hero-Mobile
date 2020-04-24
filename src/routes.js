import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import Incidents from "./pages/incidents";
import Details from "./pages/details";

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName="incidents"
        screenOptions={{
          headerShown: false,
        }}
      >
        <AppStack.Screen name="incidents" component={Incidents} />
        <AppStack.Screen name="details" component={Details} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
