import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    marginBottom: 32,
  },
  title: {
    color: colors.gray[500],
    fontSize: 14,
    fontFamily: fontFamily.medium,
    marginBottom: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.green.soft,
    paddingHorizontal: 8,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 8,
  },
  code: {
    color: colors.gray[600],
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    textTransform: "uppercase",
  },
});
