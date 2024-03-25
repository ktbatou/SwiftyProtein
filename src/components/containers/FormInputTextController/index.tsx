import InputText from "@components/InputText";
import { InputProps } from "@rneui/base";
import typography from "@styles/typography";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { View, Text, StyleProp, ViewStyle, TextStyle } from "react-native";

import styles from "./style";

interface IFormInputTextControllerProps<TFormFields extends FieldValues> {
  control: Control<TFormFields>;
  placeholder: string;
  name: Path<TFormFields>;
  containerStyle?: StyleProp<ViewStyle>;
  errorTextStyle?: StyleProp<TextStyle>;

  inputProps?: Partial<
    Omit<InputProps, "placeholder" | "value" | "onChange" | "onBlur" | "ref">
  >;
}

export default function FormInputTextController<
  TFormFields extends FieldValues,
>(props: IFormInputTextControllerProps<TFormFields>) {
  const {
    control,
    name,
    placeholder,
    errorTextStyle,
    containerStyle,
    inputProps,
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <View style={[containerStyle]}>
            <InputText
              {...inputProps}
              ref={field.ref}
              inputContainerStyle={[
                inputProps?.inputContainerStyle,
                fieldState.invalid ? styles.inputError : null,
              ]}
              placeholder={placeholder}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
            />
            {fieldState.error &&
              fieldState.error.message &&
              fieldState.error.message.length > 0 && (
                <View style={styles.errorContainer}>
                  <Text
                    style={[
                      typography.bodyText1Regular,
                      styles.errorText,
                      errorTextStyle,
                    ]}
                  >
                    {fieldState.error.message}
                  </Text>
                </View>
              )}
          </View>
        );
      }}
    />
  );
}
