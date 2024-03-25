import { Input as RNEInput, InputProps } from "@rneui/base";
import colors from "@styles/colors";
import typography from "@styles/typography";
import React, { forwardRef } from "react";

import styles from "./style";

const InputText = forwardRef<RNEInput, InputProps>((props, ref) => {
  const {
    editable = true,
    inputContainerStyle,
    leftIcon,
    leftIconContainerStyle,
    inputStyle,
    containerStyle,
    placeholderTextColor = colors.lightGray,
  } = props;

  return (
    <RNEInput
      {...(props as any)}
      ref={ref}
      disabled={!editable}
      editable={editable}
      cursorColor={colors.lightPink}
      placeholderTextColor={placeholderTextColor}
      containerStyle={[styles.container, containerStyle]}
      inputContainerStyle={[styles.inputContainer, inputContainerStyle]}
      inputStyle={[
        typography.subheadingRegular,
        styles.textBlackGray,
        styles.ml20,
        inputStyle,
      ]}
      leftIcon={leftIcon}
      leftIconContainerStyle={[styles.mr6, leftIconContainerStyle]}
    />
  );
});

export default InputText;
