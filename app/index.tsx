import EmptyState from "@/components/EmptyState";
import * as FileSystem from "expo-file-system";
import { Link, useFocusEffect } from "expo-router";
import { Camera } from "lucide-react-native";
import { useCallback, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ResizeMode, Video } from "expo-av";

import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getMediaType, MediaType } from "@/utils/media";

interface File {
  name: string;
  type: MediaType;
}

export default function HomeScreen() {
  const [files, setFiles] = useState<File[]>([]);

  const memoisedLoadFiles = useCallback(() => {
    loadFiles();
  }, []);

  useFocusEffect(() => {
    memoisedLoadFiles();
  });

  const loadFiles = async () => {
    if (!FileSystem.documentDirectory) {
      return;
    }

    const res = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory,
    );

    setFiles(
      res
        .filter((item) => item.endsWith(".jpg") || item.endsWith(".mov"))
        .map((item) => ({ name: item, type: getMediaType(item) })),
    );
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {files.length > 0 ? (
        <FlatList
          data={files}
          style={{ width: "100%", marginBottom: "auto" }}
          numColumns={2}
          contentContainerStyle={{ gap: 2 }}
          columnWrapperStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <Link href={`/${item.name}`} asChild>
              <Pressable>
                {item.type === "image" ? (
                  <Image
                    style={{ width: 200, height: 200, borderRadius: 5 }}
                    source={{
                      uri: (FileSystem.documentDirectory as string) + item.name,
                    }}
                  />
                ) : (
                  <Video
                    style={{ width: 200, height: 200, borderRadius: 5 }}
                    source={{
                      uri: (FileSystem.documentDirectory as string) + item.name,
                    }}
                    resizeMode={ResizeMode.COVER}
                    shouldPlay
                    isLooping
                  />
                )}
              </Pressable>
            </Link>
          )}
        />
      ) : (
        <EmptyState />
      )}

      <View
        style={{
          height: 100,
          width: 100,
          borderRadius: "100%",
          overflow: "hidden",
        }}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={["#2A7B9B", "transparent"]}
          style={{ height: "100%", width: "100%" }}
        />
      </View>

      <Link href="/camera" asChild>
        <Pressable style={styles.floatingCameraButton}>
          <Camera color="black" size={30} />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingCameraButton: {
    padding: 10,
    borderRadius: "50%",
    backgroundColor: "#8ecae6",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
});
