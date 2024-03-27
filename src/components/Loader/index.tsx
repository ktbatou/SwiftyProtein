import colors from "@styles/colors";
import { View, Modal, ActivityIndicator } from "react-native";
import styles from "./styles";

interface ILoader {
  isVisible: boolean;
}

export default function Loader(props: ILoader) {
  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={props.isVisible}
      style={{ zIndex: 1100 }}
      onRequestClose={() => {}}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator color={colors.lightPink} size={"large"} />
        </View>
      </View>
    </Modal>
  );
}
