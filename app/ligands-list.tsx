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

export default function LigandsList() {
  const { top } = useSafeAreaInsets();

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
                  <TouchableOpacity onPress={() => {}} key={index}>
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
          setTimeout(() => router.replace("choose-auth"), 0);
          setIsWarningModalVisible(false);
        }}
        closeIconVisibile={true}
      />
    </SafeAreaView>
  );
}
