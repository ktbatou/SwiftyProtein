import InputPassword from "@components/InputPassword";
import { InputProps } from "@rneui/base";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

import styles from "./style";
import typography from "@styles/typography";

interface IFormInputPasswordControllerProps<TFormFields extends FieldValues> {
  control: Control<TFormFields>;
  placeholder?: string;
  name: Path<TFormFields>;
  containerStyle?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<TextStyle>;

  inputProps?: Partial<
    Omit<InputProps, "placeholder" | "value" | "onChange" | "onBlur" | "ref">
  >;
}

export default function FormInputPasswordController<
  TFormFields extends FieldValues,
>(props: IFormInputPasswordControllerProps<TFormFields>) {
  const { control, name, placeholder, containerStyle, errorStyle, inputProps } =
    props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <View style={[styles.container, containerStyle]}>
            <InputPassword
              {...inputProps}
              inputContainerStyle={[
                inputProps?.inputContainerStyle,
                fieldState.error ? styles.inputError : null,
              ]}
              ref={field.ref}
              placeholder={placeholder}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
            />
            {fieldState.error ? (
              <View style={styles.errorContainer}>
                <Text
                  style={[
                    styles.errorText,
                    errorStyle,
                    typography.bodyText1Regular,
                  ]}
                >
                  {fieldState.error.message}
                </Text>
              </View>
            ) : null}
          </View>
        );
      }}
    />
  );
}
