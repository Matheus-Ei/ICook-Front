import { useColorScheme } from "@/hooks/useColorScheme.web";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface MessageProps {
  text: string;
  isVisible: boolean;
  type?: "info" | "warning" | "error" | "success";
}

export const Message = ({ text, isVisible, type }: MessageProps) => {
  if (!isVisible) return null;

  const colorScheme = useColorScheme();

  let color;
  switch (type) {
    case "warning":
      color = colorScheme === "dark" ? "#FF8C00" : "#FFA12E";
      break;
    case "error":
      color = colorScheme === "dark" ? "#FF4C61" : "#FF2E54";
      break;
    case "success":
      color = colorScheme === "dark" ? "#32CD32" : "#3CB371";
      break;
    case "info":
      color = colorScheme === "dark" ? "#1E90FF" : "#6495ED";
      break;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "fixed",
        bottom: "60px",
        padding: "10px 10px 5px 10px",
        borderRadius: 5,
        backgroundColor: color,
        transition: "opacity 0.5s ease-in-out",
        opacity: isVisible ? 1 : 0,
        zIndex: 1000,
      }}
    >
      <FontAwesome
        name="info-circle"
        size={25}
        color="white"
        style={{ marginRight: 10 }}
      />

      <p style={{ color: "white", fontWeight: "bold", margin: 0 }}>{text}</p>
    </div>
  );
};
