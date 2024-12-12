import { Text, View } from "react-native";
import { styles } from "./styles";
import { Info } from "../info";
import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";

export type PropsDetail = {
  name: string;
  description: string;
  address: string;
  phone: string;
  coupons: number;
  rules: {
    id: string;
    description: string;
  }[];
};

type Props = {
  market: PropsDetail;
};

export function Details({ market }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{market.name}</Text>
      <Text style={styles.description}>{market.description}</Text>

      <View style={styles.group}>
        <Text style={styles.title}>Informações</Text>
        <Info
          icon={IconTicket}
          description={`${market.coupons} cupons disponíveis`}
        />
        <Info icon={IconMapPin} description={market.address} />
        <Info icon={IconPhone} description={market.phone} />
      </View>

      <View style={styles.group}>
        <Text style={styles.title}>Regulamento</Text>
        {market.rules.map((rule) => (
          <Text key={rule.id} style={styles.rule}>
            {`\u2022 ${rule.description}`}
          </Text>
        ))}
      </View>
    </View>
  );
}
