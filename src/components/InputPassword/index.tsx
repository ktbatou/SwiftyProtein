import Input from "@components/InputText";
import { Input as RNEInput, InputProps } from "@rneui/base";
import React, { useState, forwardRef } from "react";
import { Pressable } from "react-native";

import styles from "./style";
import { UninvisibleEyeIcon, VisibleEyeIcon } from "@icons";

const InputPassword = forwardRef<RNEInput, InputProps>((props, ref) => {
  const [visible, setVisibility] = useState(false);

  return (
    <Input
      {...props}
      ref={ref}
      secureTextEntry={!visible}
      inputContainerStyle={[props.inputContainerStyle, styles.pr13]}
      rightIcon={
        <Pressable onPress={() => setVisibility(!visible)} style={styles.p5}>
          {visible ? <UninvisibleEyeIcon /> : <VisibleEyeIcon />}
        </Pressable>
      }
    />
  );
});

export default InputPassword;
