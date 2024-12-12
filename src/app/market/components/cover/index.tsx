import { ImageBackground, View } from "react-native";
import { styles } from "./styles";
import { Button } from "@/components/button";
import { router } from "expo-router";
import { IconArrowLeft } from "@tabler/icons-react-native";

type Props = {
  uri: string;
};

export function Cover({ uri }: Props) {
  return (
    <ImageBackground source={{ uri }} style={styles.container}>
      <View style={styles.header}>
        <Button style={styles.button} onPress={() => router.back()}>
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  );
}
