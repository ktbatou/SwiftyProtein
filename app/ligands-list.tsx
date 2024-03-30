import { ScrollView, View, Text, TouchableOpacity } from "react-native";
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
        <ScrollView
          style={styles.flex1}
          contentContainerStyle={[styles.flexGrow1]}
          bounces={false}
          showsVerticalScrollIndicator={true}
        >
          {isLoading && <Loader isVisible={isLoading} />}
          {filteredLigands.length === 0 ? (
            <View style={styles.centerContainer}>
              <Text style={[typography.heading1Regular, styles.grayText]}>
                No ligands found
              </Text>
            </View>
          ) : (
            <View style={[styles.fullWidth, styles.ligandsListContainer]}>
              {filteredLigands.map((ligand, index) => {
                return (
                  <TouchableOpacity onPress={() => onPress(ligand)} key={index}>
                    <View style={styles.ligandContainer}>
                      <AtomIcon />
                      <Text style={styles.ligandText}>{ligand}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </ScrollView>
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
          setIsLoading(true);
          const timeoutId = setTimeout(() => {
            setIsLoading(false);
            router.replace("choose-auth");
          }, 1);
          setIsWarningModalVisible(false);
          return () => clearTimeout(timeoutId);
        }}
        closeIconVisibile={true}
      />
      <Loader isVisible={isLoading} />
    </SafeAreaView>
  );
}
