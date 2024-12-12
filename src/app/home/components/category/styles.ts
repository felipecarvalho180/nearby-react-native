import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 36,
    backgroundColor: colors.gray[100],
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  name: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
  },
  containerSelected: {
    backgroundColor: colors.green.base,
    borderColor: colors.green.base,
    borderWidth: 1,
  },
  nameSelected: {
    color: colors.gray[100],
  },
});
