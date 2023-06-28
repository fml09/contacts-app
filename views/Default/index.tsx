import { FlashList } from "@shopify/flash-list";
import { type ContactData, ContactListType } from "../../types";
import { ListTitle } from "../../components/ListTitle";
import { ContactItem } from "../../components/ContactItem";
import { SearchHistory } from "../../components/SearchHistory";
import { useHistoryListStore } from "../../stores/history-list";
import { useMemo } from "react";
import { useContactList } from "../../stores/contact-list";
import { useFavoriteSetStore } from "../../stores";

export function DefaultView() {
  const favorites = useFavoriteSetStore((state) => state.favorite);
  const historyList = useHistoryListStore((state) => state.historyList);
  const contactList = useContactList();

  const contactListWithFavorite = useMemo(() => {
    return contactList.filter((contact) => {
      if (contact.type !== ContactListType.ContactItem) return false; // TODO: fix this
      if (favorites.has(contact.id)) return true;
      return false;
    });
  }, [contactList, favorites]);

  const DATA: ContactData[] = useMemo(
    () => [
      {
        type: ContactListType.Title,
        title: "즐겨찾기",
      },
      ...contactListWithFavorite,
      {
        type: ContactListType.Title,
        title: "검색기록",
      },
      ...historyList.map(
        (history) =>
          ({
            type: ContactListType.History,
            history,
          } as ContactData)
      ),
    ],
    [historyList, contactList]
  );
  return (
    <FlashList
      renderItem={({ item }) => {
        switch (item.type) {
          case ContactListType.Title:
            return <ListTitle title={item.title} />;
          case ContactListType.ContactItem:
            return (
              <ContactItem
                id={item.id}
                name={item.name}
                phoneNumber={item.phoneNumber}
                digits={item.digits}
              />
            );
          case ContactListType.History:
            return <SearchHistory history={item.history} />;
        }
      }}
      getItemType={(item) => item.type}
      data={DATA}
      estimatedItemSize={45}
    />
  );
}
