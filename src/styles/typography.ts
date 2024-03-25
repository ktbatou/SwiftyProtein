import { StyleSheet } from "react-native";

const fontSize={
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
}

const fontFamily = {
  sorts:{
    regular: "sorts-regular",
    italic: "sorts-italic",
  }
}

const sortsTypography = StyleSheet.create({ 
  heading1Regular: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.sorts.regular,
  },
  heading2Regular: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.sorts.regular,
  },
  subheadingRegular: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.sorts.regular,
  },
  bodyText1Regular: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.sorts.regular,
  },
  bodyText2Regular: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.sorts.regular,
  },

})

const typography = sortsTypography;

export { fontSize, fontFamily };

export default typography;