import { TextInput as DefaultTextInput } from "react-native";

type TextInputProps = React.ComponentProps<typeof DefaultTextInput> 

export function TextInput(props: TextInputProps) {
  const { style, ...otherProps } = props;

  return (
    <DefaultTextInput
      style={[
        {
          borderRadius: 4,
          outline: "none",
          borderWidth: 1,
          paddingHorizontal: 10,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
