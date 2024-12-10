import { ActivityIndicator, View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/styles/colors";

export default function Loading() {
  return (
    <ActivityIndicator color={colors.green.base} style={styles.container} />
  );
}
