import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useGlobalStore } from "@/components/store";
import { useEffect, useState } from "react";
import FirstUi from "@/components/tabs/menu/First-ui";
import ScreenWrapper from "@/components/utils/screenWrapper/screen-wrapper";
import DeleteUi from "@/components/tabs/menu/Delete-ui";

export default function TabOneScreen() {
  const setApiData = useGlobalStore((store) => store.setApiData);
  const apiData = useGlobalStore((store) => store.apiData);
  const [data, setData] = useState([1, 2, 3]);
  const [showUi, setShowUI] = useState("");
  const [currentUIData, setCurrentUIData] = useState({ title: "", item: "" });

  const handleCancel = () => {
    setShowUI("");
  };

  const renderContent = () => {
    switch (showUi) {
      case "createMenu":
        // return <CreateMenu handleCancel={handleCancel} />;
        return <Text>Create Menu</Text>;
      case "addMenu":
      case "updateMenu":
        // return (
        //   <CommonMenuForm
        //     handleCancel={handleCancel}
        //     currentUIData={currentUIData}
        //   />
        // );
        return <Text>Update Menu</Text>;
      case "deleteMenu":
        // return (
        //   <DeleteUI handleCancel={handleCancel} currentUIData={currentUIData} />
        // );
        return (
          <DeleteUi handleCancel={handleCancel} currentUIData={currentUIData} />
        );
      default:
        return (
          <FirstUi
            setShowUI={setShowUI}
            handleCancel={handleCancel}
            setCurrentUIData={setCurrentUIData}
          />
        );
    }
  };

  useEffect(() => {
    if (apiData.length === 0) {
      fetch(process.env.EXPO_PUBLIC_API_URL as string)
        .then((res) => res.json())
        .then((data) => {
          if (data?.content?.a) {
            delete data.content.a;
            delete data?.content?.n;
            const result = [];
            for (const m in data.content) {
              const item = {
                name: m.split("_").join(" ").split("-").join(" "),
                data: data.content[m],
              };
              result.push(item);
            }
            // console.log("result : ", result);
            setApiData(result);
          }
        });
    }
  }, []);
  return (
    <ScreenWrapper>
      <View>{renderContent()}</View>
    </ScreenWrapper>
  );
}
