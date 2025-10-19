import Colors from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet } from "react-native";

interface MessageProps {
  text: string;
  isVisible: boolean;
  type?: "info" | "warning" | "error" | "success";
}

export const Message = ({ text, isVisible, type }: MessageProps) => {
  let color;
  switch (type) {
    case "warning":
      color = "#FFA12E";
      break;
    case "error":
      color = "#FF2E54";
      break;
    case "success":
      color = "#3CB371";
      break;
    case "info":
      color = "#6495ED";
      break;
  }

  if (!isVisible) return null;

  return (
    <div style={styles.messageContainer}>
      <FontAwesome
        name="info-circle"
        size={25}
        color={color}
        style={styles.messageIcon}
      />

      <p style={{...styles.messageText}}>{text}</p>
    </div>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "fixed",
    bottom: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderBottomWidth: 5,
    borderStyle: "solid",
    borderColor: Colors.base300,
    backgroundColor: Colors.base100,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
    paddingBottom: 2,
    zIndex: 1000,
  },

  messageText: {
    fontWeight: "bold",
    marginBottom: 0,
    marginTop: 0,
    marginLeft: 10,
  },

  messageIcon: {
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    marginRight: 10,
  },
});
