import {
  CameraCapturedPicture,
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import { ArrowLeft, SwitchCamera } from "lucide-react-native";
import path from "path";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Video } from "expo-av";
import * as FileSystem from "expo-file-system";
import CameraFlipIcon from "@/components/CameraFlipIcon";
import BackIcon from "@/components/BackIcon";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const camera = useRef<CameraView>(null);
  const [picture, setPicture] = useState<CameraCapturedPicture | undefined>(
    undefined,
  );
  const [video, setVideo] = useState<string | undefined>(undefined);
  const [isRecording, setIsRecording] = useState(false);
  const [mode, setMode] = useState<CameraMode>("picture");

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  useEffect(() => {
    if (video) {
      Alert.alert("video uri generated");
    }
  }, [video]);

  const toggleCameraFacing = () => {
    setFacing(facing === "front" ? "back" : "front");
  };

  const onPress = async () => {
    if (isRecording) {
      Alert.alert("stopped recording");
      camera.current?.stopRecording();
    } else {
      const picture = await camera.current?.takePictureAsync();
      setPicture(picture);
    }
  };

  const startRecording = async () => {
    Alert.alert("recording");
    setIsRecording(true);
    const res = await camera.current?.recordAsync();
    setVideo(res?.uri);
    Alert.alert("recording completed");
    setIsRecording(false);
  };

  const saveFile = async (uri: string) => {
    const fileName = path.parse(uri).base;

    await FileSystem.copyAsync({
      from: uri,
      to: FileSystem.documentDirectory + fileName,
    });

    setPicture(undefined);
    setVideo(undefined);

    router.back();
  };

  if (!permission?.granted) {
    return <ActivityIndicator />;
  }

  if (picture || video) {
    return (
      <View>
        <ArrowLeft
          size={30}
          color="white"
          onPress={() => router.back()}
          style={styles.back}
        />
        {picture && (
          <Image
            source={{ uri: picture.uri }}
            style={{ height: "100%", width: "100%" }}
          />
        )}
        {video && (
          <Video
            source={{ uri: video as string }}
            style={{ height: "100%", width: "100%" }}
            positionMillis={100}
            shouldPlay
            isLooping
          />
        )}

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            padding: 10,
          }}
          onPress={() => {
            picture ? saveFile(picture.uri) : saveFile(video as string);
          }}
        >
          <Text
            style={{ backgroundColor: "#8ecae6", padding: 10, borderRadius: 5 }}
          >
            Save Picture
          </Text>
        </Pressable>
        <Pressable
          style={styles.floatingBackButton}
          onPress={() => {
            setPicture(undefined);
            setVideo(undefined);
            router.back();
          }}
        >
          <BackIcon
            height={20}
            width={20}
            onPress={() => router.back()}
            fill="black"
          />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={camera}
        style={{ width: "100%", height: "100%" }}
        facing={facing}
        mode={mode}
      >
        <View style={styles.footer}>
          <BackIcon
            height={20}
            width={20}
            onPress={() => router.back()}
            fill="white"
          />
          <Pressable
            style={[
              styles.recordButton,
              { backgroundColor: isRecording ? "red" : "white" },
            ]}
            onPress={onPress}
            onLongPress={() => {
              setMode("video");
              startRecording();
            }}
          />
          <CameraFlipIcon height={40} width={40} onPress={toggleCameraFacing} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#00000099",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  floatingBackButton: {
    padding: 10,
    borderRadius: "50%",
    backgroundColor: "#8ecae6",
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  recordButton: {
    height: 50,
    width: 50,
    borderRadius: "50%",
    backgroundColor: "white",
  },
  back: {
    position: "absolute",
    left: 50,
    bottom: 50,
  },
});
