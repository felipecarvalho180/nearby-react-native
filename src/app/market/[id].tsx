import Loading from "@/components/loading";
import { api } from "@/services/api";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Modal, ScrollView, StatusBar, Text, View } from "react-native";
import { Cover } from "./components/cover";
import { Details, PropsDetail } from "./components/details";
import { Coupon } from "./components/coupon";
import { Button } from "@/components/button";
import { styles } from "./styles";
import { CameraView, useCameraPermissions } from "expo-camera";

type Market = PropsDetail & {
  cover: string;
};

export default function Market() {
  const qrLock = useRef<boolean>(false);
  const [_, requestPermission] = useCameraPermissions();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [market, setMarket] = useState<Market>();
  const [isLoading, setIsLoading] = useState(true);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [couponIsFetching, setCouponIsFetching] = useState(false);

  async function fetchMarket() {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/markets/${id}`);
      setMarket(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMarket();
  }, [id, coupon]);

  const handleOpenCamera = async () => {
    try {
      const { granted } = await requestPermission();
      if (granted) {
        setIsModalVisible(true);
        qrLock.current = false;
      } else {
        Alert.alert(
          "Permissão negada",
          "Você precisa conceder permissão para usar a câmera",
          [
            {
              text: "OK",
              onPress: () => setIsModalVisible(false),
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível abrir a câmera");
    }
  };

  const getCoupon = async (code: string) => {
    setCouponIsFetching(true);

    try {
      const { data } = await api.patch(`/coupons/${code}`);

      Alert.alert("Cupom", data.coupon);
      setCoupon(data.coupon);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível utilizar o cupom");
    } finally {
      setCouponIsFetching(false);
    }
  };

  const handleUseCoupon = async (id: string) => {
    setIsModalVisible(false);
    Alert.alert(
      "Cupom",
      "Não é possível utilizar o cupom resgatado. Deseja realmente resgatar o cupom?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => getCoupon(id),
        },
      ]
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!market) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={isModalVisible} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={market.cover} />
        <Details market={market} />
        {coupon && <Coupon coupon={coupon} />}
        <View style={styles.buttonContainer}>
          <Button onPress={handleOpenCamera}>
            <Button.Title>Ler QR Code</Button.Title>
          </Button>
        </View>
      </ScrollView>

      <Modal style={styles.modal} visible={isModalVisible}>
        <CameraView
          style={styles.modal}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(() => {
                handleUseCoupon(data);
              }, 1000);
            }
          }}
        />

        <View style={styles.modalContent}>
          <Button
            onPress={() => setIsModalVisible(false)}
            isLoading={couponIsFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
