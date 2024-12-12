import { Text, View } from "react-native";
import { styles } from "./styles";
import { IconTicket } from "@tabler/icons-react-native";
import { colors } from "@/styles/colors";

type Props = {
  coupon: string;
};

export function Coupon({ coupon }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Utilize esse cupom</Text>
      <View style={styles.content}>
        <IconTicket size={24} color={colors.green.light} />
        <Text style={styles.code}>{coupon}</Text>
      </View>
    </View>
  );
}
