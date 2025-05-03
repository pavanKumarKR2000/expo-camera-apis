import { Slot, Stack, Tabs } from "expo-router";
import { Text, View } from "react-native";

// export default function RootLayout() {
//   return (
//     <View style={{ flex: 1 }}>
//       <Text>header</Text>
//       <Stack />
//       <Slot />
//       *<Tabs />
//       <Text>footer</Text>
//     </View>
//   );
// }

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="camera"
        options={{ title: "camera", headerShown: false }}
      />
    </Stack>
  );
}
