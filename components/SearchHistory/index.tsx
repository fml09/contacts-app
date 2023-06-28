import { X } from "@tamagui/lucide-icons";
import { ListItem, Separator } from "tamagui";
import { useSearchTextStore } from "../../stores/search-text";
import { useHistoryListStore, useViewTypeStore } from "../../stores";
import { ViewType } from "../../types";

type SearchHistoryProps = {
  history: string;
};

export function SearchHistory({ history }: SearchHistoryProps) {
  const setSearchText = useSearchTextStore((state) => state.setSearchText);
  const setViewType = useViewTypeStore((state) => state.setViewType);
  const [addHistory, deleteHistory] = useHistoryListStore((state) => [
    state.addHistory,
    state.deleteHistory,
  ]);

  return (
    <>
      <ListItem
        pressTheme
        size="$3"
        mb="$2"
        iconAfter={
          <X
            size="$1.5"
            onPress={() => {
              deleteHistory(history);
            }}
          />
        }
        onPress={() => {
          setSearchText(history);
          addHistory(history);
          setViewType(ViewType.Search);
        }}
      >
        {history}
      </ListItem>
      <Separator borderColor="$borderColor" marginHorizontal="$2" />
    </>
  );
}
