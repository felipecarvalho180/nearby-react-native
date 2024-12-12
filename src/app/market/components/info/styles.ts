import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
    lineHeight: 22.4,
    flex: 1,
  },
});
