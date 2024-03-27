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

export default function LigandsList() {
  const { top } = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);

  const filteredLigands = searchQuery
    ? LigandsArray.filter((ligand) =>
        ligand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : LigandsArray;

  function handleInputChange(text: string) {
    setSearchQuery(text);
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
                <TouchableOpacity onPress={() => {}}>
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
