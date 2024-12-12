import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { Categories, CategoriesProps } from "./components/categories";
import { Places } from "./components/places";
import { PlaceProps } from "./components/place";
import { colors } from "@/styles/colors";
import MapView, { Callout, Marker } from "react-native-maps";
import { fontFamily } from "@/styles/font-family";
import { useRouter } from "expo-router";

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
};

export default function Home() {
  const router = useRouter();

  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [markets, setMarkets] = useState<PlaceProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
      setSelectedCategory(data[0].id);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar as categorias");
    }
  }

  async function fetchMarkets() {
    if (!selectedCategory) return;
    try {
      const { data } = await api.get("/markets/category/" + selectedCategory);
      setMarkets(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os locais");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [selectedCategory]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.gray[200] }}>
      <Categories
        data={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          ...currentLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={currentLocation}
          image={require("@/assets/location.png")}
        />

        {markets.map((market) => (
          <Marker
            key={market.id}
            identifier={market.id}
            coordinate={{
              latitude: market.latitude,
              longitude: market.longitude,
            }}
            image={require("@/assets/pin.png")}
          >
            <Callout onPress={() => router.navigate(`/market/${market.id}`)}>
              <View>
                <Text
                  style={{
                    fontFamily: fontFamily.medium,
                    fontSize: 14,
                    color: colors.gray[600],
                  }}
                >
                  {market.name}
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.regular,
                    fontSize: 12,
                    color: colors.gray[600],
                  }}
                >
                  {market.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <Places data={markets} />
    </View>
  );
}
