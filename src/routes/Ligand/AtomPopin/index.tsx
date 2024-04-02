import Button from "@components/Button";
import typography from "@styles/typography";
import React from "react";
import { Text, View } from "react-native";
import Popover from "react-native-popover-view";

import styles from "./style";

interface IAtomPopinProps {
  visible: boolean;
  atom: {
    name: string;
    element: string;
    phase: string;
    discoveredBy: string;
  };
  onClose: () => void;
}

export default function IAtomPopin(props: IAtomPopinProps) {
  const { onClose, visible, atom } = props;

  return (
    <Popover
      popoverStyle={styles.container}
      backgroundStyle={styles.bgTransparentBlack}
      isVisible={visible}
      onRequestClose={onClose}
    >
      <Text style={[typography.subheadingRegular, styles.title]}>
        ATOM DATA
      </Text>
      <View style={styles.rowContainer}>
        <Text>Name: </Text>
        <Text>
          {atom.name} ({atom.element})
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <Text>Phase: </Text>
        <Text>{atom.phase}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text>Discovered by: </Text>
        <Text>{atom.discoveredBy}</Text>
      </View>
      <Button title="Close" onPress={onClose} containerStyle={styles.button} />
    </Popover>
  );
}
