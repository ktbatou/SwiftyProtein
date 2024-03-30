import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import styles from "@routes/LigandsList/style";
import LigandsArray from "@routes/LigandsList/ligandsArray";
import InputText from "@components/InputText";
import {
  AtomIcon,
  InlineCircleExclamationIcon,
  LogoutIcon,
} from "@components/icons";
import { useState } from "react";
import typography from "@styles/typography";
import { router } from "expo-router";
import Modal from "@components/Modal";
import Loader from "@components/Loader";
import ligandParser from "@utils/ligandParser";
import { useAppContext } from "src/lib/AppContext";

export default function LigandsList() {
  const { top } = useSafeAreaInsets();
  const { setLigandData } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);

  const filteredLigands = searchQuery
    ? LigandsArray.filter((ligand) =>
        ligand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : LigandsArray;

  function handleInputChange(text: string) {
    setSearchQuery(text);
  }

  function onPress(ligand: string) {
    setIsLoading(true);
    ligandParser(ligand)
      .then((value) => {
        if (!value) {
          alert("Error has occurred while looking for the ligand");
          setIsLoading(false);
          return;
        }
        setLigandData(value);
        router.push("/ligand");
        setIsLoading(false);
      })
      .catch((error) => {
        alert("Error has occurred while looking for the ligand");
        setIsLoading(false);
      });
  }

  return (
    <SafeAreaView style={styles.flex1} edges={{ top: "off" }}>
      <View style={[styles.contentContainer, { paddingTop: top }]}>
        <View style={styles.rowContainer}>
          <InputText
            containerStyle={styles.inputConatiner}
            placeholder="Search ..."
            onChangeText={(text) => handleInputChange(text)}
          />
          <TouchableOpacity
            style={styles.logout}
            onPress={() => setIsWarningModalVisible(true)}
          >
            <LogoutIcon />
          </TouchableOpacity>
        </View>

        {isLoading && <Loader isVisible={isLoading} />}
        {filteredLigands.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={[typography.heading1Regular, styles.grayText]}>
              No ligands found
            </Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={true}
            contentContainerStyle={[
              styles.fullWidth,
              styles.ligandsListContainer,
            ]}
            data={filteredLigands}
            renderItem={(item) => {
              return (
                <TouchableOpacity onPress={() => onPress(item.item)}>
                  <View style={styles.ligandContainer}>
                    <AtomIcon />
                    <Text style={styles.ligandText}>{item.item}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>

      <Modal
        title="Warning"
        subtitle="Are you sure you want to logout ?"
        confirmButtonTitle="Yes"
        icon={<InlineCircleExclamationIcon />}
        onClose={() => setIsWarningModalVisible(false)}
        visible={isWarningModalVisible}
        onConfirm={() => {
          setIsWarningModalVisible(false);
          const _timeoutId = setTimeout(() => {
            router.replace("sign-in");
          }, 0);
          setIsWarningModalVisible(false);
          return () => clearTimeout(_timeoutId);
        }}
        closeIconVisibile={true}
      />
      <Loader isVisible={isLoading} />
    </SafeAreaView>
  );
}
