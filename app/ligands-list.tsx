import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import styles from "@routes/LigandsList/style";
import LigandsArray from "@routes/LigandsList/ligandsArray";
import InputText from "@components/InputText";
import { AtomIcon, LogoutIcon } from "@components/icons";
import { useState } from "react";
import typography from "@styles/typography";

export default function LigandsList() {
  const { top } = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState("");

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
          <TouchableOpacity style={styles.logout}>
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
    </SafeAreaView>
  );
}
