import { TextInput as DefaultTextInput, StyleSheet } from "react-native";

type TextInputProps = React.ComponentProps<typeof DefaultTextInput> 

export const TextInput = (props: TextInputProps) => {
  const { style, ...otherProps } = props;

  return (
    <DefaultTextInput
      style={[styles.textInput, style]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
