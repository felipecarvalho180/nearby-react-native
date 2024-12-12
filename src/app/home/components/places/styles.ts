import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray[100],
  },
  content: {
    paddingHorizontal: 24,
    gap: 12,
    paddingBottom: 100,
  },
  indicator: {
    width: 80,
    height: 4,
    backgroundColor: colors.gray[300],
  },
  title: {
    color: colors.gray[600],
    fontFamily: fontFamily.regular,
    fontSize: 16,
    marginBottom: 16,
  },
});
