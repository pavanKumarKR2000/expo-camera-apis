import * as FileSystem from "expo-file-system";
import { router, useLocalSearchParams } from "expo-router";
import { Trash2, Save } from "lucide-react-native";
import { Image, Pressable, View, StyleSheet } from "react-native";
import { Video } from "expo-av";
import { getMediaType } from "@/utils/media";
import * as MediaLibrary from "expo-media-library";

export default function ImageScreen() {
  const { fileName } = useLocalSearchParams<{ fileName: string }>();
  const fullUri = (FileSystem.documentDirectory || "") + (fileName || "");
  const fileType = getMediaType(fileName);
  const [permissionResponse, requestPermissions] =
    MediaLibrary.usePermissions();

  const onDelete = async () => {
    await FileSystem.deleteAsync(fullUri);
    router.back();
  };

  const onSave = async () => {
    if (permissionResponse?.status !== "granted") {
      await requestPermissions();
    }

    const asset = await MediaLibrary.createAssetAsync(fullUri);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {fileType === "image" ? (
        <Image
          source={{ uri: fullUri }}
          style={{ height: "100%", width: "100%" }}
        />
      ) : (
        <Video
          source={{ uri: fullUri }}
          style={{ height: "100%", width: "100%" }}
          positionMillis={100}
          shouldPlay
          isLooping
          useNativeControls
        />
      )}
      <Pressable style={styles.floatingDeleteButton} onPress={onDelete}>
        <Trash2 color="black" size={30} />
      </Pressable>
      <Pressable style={styles.floatingSaveButton} onPress={onSave}>
        <Save color="black" size={30} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingDeleteButton: {
    padding: 10,
    borderRadius: "50%",
    backgroundColor: "#ff6467",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  floatingSaveButton: {
    padding: 10,
    borderRadius: "50%",
    backgroundColor: "#8ecae6",
    position: "absolute",
    bottom: 10,
    left: 10,
  },
});
