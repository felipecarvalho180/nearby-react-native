import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 232,
    marginBottom: -32,
    backgroundColor: colors.gray[200],
  },
  header: {
    padding: 24,
    paddingTop: 56,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
