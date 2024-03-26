import Button from "@components/Button";
import React, { ReactNode, useMemo } from "react";
import {
  Text,
  View,
  Animated,
  StyleProp,
  TouchableOpacity,
  Modal as RNModal,
  TextStyle,
  ViewStyle,
} from "react-native";

import styles from "./style.modal";
import typography from "@styles/typography";
import { CrossIcon } from "@components/icons";

type IModalProps = {
  visible: boolean;
  icon: ReactNode;
  title: string;
  subtitle: string | ReactNode | ReactNode[];
  confirmButtonTitle: string;
  modalContainerStyle?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  buttonTitleStyle?: StyleProp<TextStyle>;
  closeIconVisibile?: boolean;
  onClose?: () => void;
  onConfirm: () => void;
};

function Modal(props: IModalProps) {
  const {
    onClose,
    visible,
    modalContainerStyle,
    overlayStyle,
    icon,
    title,
    subtitle,
    onConfirm,
    confirmButtonTitle,
    subtitleStyle,
    titleStyle,
    buttonTitleStyle,
    closeIconVisibile = false,
  } = props;
  const slideAnimation = useMemo(() => new Animated.Value(0), []);

  function slideUp() {
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }

  function slideDown() {
    if (!onClose) {
      return;
    }

    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 80,
      useNativeDriver: true,
    }).start(onClose);
  }

  const translateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  return (
    <RNModal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={slideDown}
      onShow={slideUp}
    >
      <View style={[styles.overlay, overlayStyle]}>
        <TouchableOpacity onPress={onClose && slideDown} style={styles.flex1} />
        <Animated.View
          style={[
            styles.modalContainer,
            modalContainerStyle,
            { transform: [{ translateY }] },
          ]}
        >
          <View style={styles.crossIconStyle}>
            {closeIconVisibile ? (
              <TouchableOpacity onPress={slideDown}>
                <CrossIcon />
              </TouchableOpacity>
            ) : (
              <View style={styles.closeIconPlaceholder} />
            )}
          </View>
          <View style={styles.modalContent}>
            <View style={styles.alignCenter}>
              <View style={styles.mb25}>{icon}</View>
              <Text
                style={[
                  styles.modalTitle,
                  styles.mb30,
                  titleStyle,
                  typography.heading1Regular,
                ]}
              >
                {title}
              </Text>
              <Text
                style={[
                  styles.modalSubtitle,
                  subtitleStyle,
                  typography.subheadingRegular,
                ]}
              >
                {subtitle}
              </Text>
            </View>
            <Button
              type="solid"
              onPress={onConfirm}
              title={confirmButtonTitle}
              containerStyle={styles.buttonContainter}
              titleStyle={buttonTitleStyle}
            />
          </View>
        </Animated.View>
      </View>
    </RNModal>
  );
}

export default Modal;
