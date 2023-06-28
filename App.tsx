import { StatusBar } from "expo-status-bar";
import { SafeAreaView, useColorScheme } from "react-native";
import { Heading, Spacer, TamaguiProvider, Theme, YStack } from "tamagui";
import config from "./tamagui.config";
import { useFonts } from "expo-font";

import { SearchBar } from "./components/SearchBar";
import { DefaultView } from "./views/Default";
import { SearchView } from "./views/Search";
import { useViewTypeStore } from "./stores";
import { ViewType } from "./types";
import { ContactListProvider } from "./stores/contact-list";

export default function App() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Pretendard: require("./assets/Pretendard-Medium.otf"),
    "Pretendard-Bold": require("./assets/Pretendard-Bold.otf"),
  });

  const viewType = useViewTypeStore((state) => state.viewType);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        <SafeAreaView style={{ flex: 1 }}>
          <YStack
            f={1}
            backgroundColor="$backgroundSoft"
            paddingHorizontal="$4"
          >
            <Heading
              fontFamily="$heading"
              color="$color"
              jc="center"
              fontSize="$4"
            >
              연락처
            </Heading>
            <Spacer size="$6" />
            <SearchBar />
            <Spacer size="$6" />

            <ContactListProvider>
              {viewType === ViewType.Default && <DefaultView />}
              {viewType === ViewType.Search && <SearchView />}
            </ContactListProvider>

            <StatusBar style="auto" />
          </YStack>
        </SafeAreaView>
      </Theme>
    </TamaguiProvider>
  );
}
