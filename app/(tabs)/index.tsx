import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useGlobalStore } from "@/components/store";
import { useEffect } from "react";

export default function TabOneScreen() {
  const setApiData = useGlobalStore((store) => store.setApiData);

  useEffect(() => {
    fetch(process.env.EXPO_PUBLIC_API_URL as string)
      .then((res) => res.json())
      .then((data) => setApiData(data));
    // .then((data) => console.log("data : ", data));
  }, []);
  return (
    <View style={styles.container}>
      <Text className="text-rose-400 text-2xl">Custom text</Text>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
