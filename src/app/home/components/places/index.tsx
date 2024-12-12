import { Text, useWindowDimensions } from "react-native";
import { Place, PlaceProps } from "../place";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { styles } from "./styles";
import { useRouter } from "expo-router";

type Props = {
  data: PlaceProps[];
};

export function Places({ data }: Props) {
  const router = useRouter();

  const dimensions = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(
    () => ({
      min: 278,
      max: dimensions.height - 128,
    }),
    [dimensions]
  );

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={styles.indicator}
      backgroundStyle={styles.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Place
            data={item}
            onPress={() => router.navigate(`/market/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <Text style={styles.title}>Explore locais perto de você</Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  );
}
