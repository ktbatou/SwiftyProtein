import colors from "@styles/colors";
import typography from "@styles/typography";
import React, { ReactNode } from "react";
import {
  Text,
  TextStyle,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  TouchableNativeFeedback,
  View,
} from "react-native";

import styles from "./style";

export interface IButtonProps {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  type?: "solid" | "outline" | "clear";
  disabled?: boolean;
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  onPress: (e: GestureResponderEvent) => void;
}

function Button(props: IButtonProps) {
  const { type = "solid", ...rest } = props;

  if (Platform.OS == "ios") {
    return <IOSButton type={type} {...rest} />;
  }

  return <AndroidButton type={type} {...rest} />;
}

export default Button;

function IOSButton(props: IButtonProps) {
  const {
    onPress,
    title,
    containerStyle,
    disabled,
    loading,
    titleStyle,
    type,
  } = props;

  const loaderColor = type == "solid" ? colors.mainWhite : colors.lightPink;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        type == "outline" && !disabled && styles.outline,
        type == "solid" && styles.bgOrange,
        disabled && styles.bgGray,
        containerStyle,
      ]}
      disabled={disabled || loading}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator size="small" color={loaderColor} />
      ) : (
        <Text
          style={[typography.subheadingRegular, styles.textWhite, titleStyle]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

function AndroidButton(props: IButtonProps) {
  const {
    onPress,
    title,
    containerStyle,
    disabled,
    loading,
    titleStyle,
    type,
    contentContainerStyle,
  } = props;

  const loaderColor = type == "solid" ? colors.mainWhite : colors.lightPink;

  return (
    <TouchableNativeFeedback onPress={onPress} disabled={disabled || loading}>
      <View
        style={[
          styles.button,
          type == "outline" && !disabled && styles.outline,
          type == "solid" && styles.bgOrange,
          disabled && styles.bgGray,
          containerStyle,
        ]}
      >
        {loading ? (
          <ActivityIndicator size="small" color={loaderColor} />
        ) : (
          <View style={[styles.contentContainer, contentContainerStyle]}>
            <Text
              style={[
                typography.subheadingRegular,
                styles.textWhite,
                titleStyle,
              ]}
            >
              {title}
            </Text>
          </View>
        )}
      </View>
    </TouchableNativeFeedback>
  );
}
