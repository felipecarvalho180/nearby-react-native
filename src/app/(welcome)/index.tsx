import { Text, View } from "react-native";

import { Button } from "@/components/button";
import { router } from "expo-router";
import { Welcome } from "./components/welcome";
import { Steps } from "./components/steps";

export default function App() {
  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <Welcome />
      <Steps />

      <Button onPress={() => router.navigate("/home")}>
        <Button.Title>Começar</Button.Title>
      </Button>
    </View>
  );
}
