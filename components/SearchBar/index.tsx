import { Input, Spacer, XStack, YStack } from "tamagui";
import { Keyboard } from "react-native";
import {
  useHistoryListStore,
  useSearchTextStore,
  useViewTypeStore,
} from "../../stores";
import { ViewType } from "../../types";

type SearchBarProps = {};

export function SearchBar({}: SearchBarProps) {
  const [searchText, setSearchText] = useSearchTextStore((state) => [
    state.searchText,
    state.setSearchText,
  ]);
  const setViewType = useViewTypeStore((state) => state.setViewType);
  const addHistory = useHistoryListStore((state) => state.addHistory);

  return (
    <YStack jc="center" m="$1" onPress={Keyboard.dismiss}>
      <XStack f={1} ai="center">
        <Input
          f={1}
          size="$4"
          bw="$1"
          bg="$gray4"
          placeholder="검색"
          returnKeyType="search"
          value={searchText}
          onChangeText={(text) => {
            if (!text) setViewType(ViewType.Default);
            else setViewType(ViewType.Search);
            setSearchText(text);
          }}
          onSubmitEditing={({ nativeEvent }) => {
            if (!nativeEvent.text) return;
            setSearchText(nativeEvent.text);
            addHistory(nativeEvent.text);
            setViewType(ViewType.Search);
          }}
          onBlur={({ nativeEvent }) => {
            if (nativeEvent.text) addHistory(nativeEvent.text);
          }}
        ></Input>
        <Spacer size="$2" />
      </XStack>
    </YStack>
  );
}
