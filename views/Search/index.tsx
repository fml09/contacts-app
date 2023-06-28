import { FlashList } from "@shopify/flash-list";
import { ContactItem } from "../../components/ContactItem";
import { useContactList } from "../../stores/contact-list";
import { useDeferredValue, useMemo } from "react";
import { useSearchTextStore } from "../../stores";
import uFuzzy from "@leeoniya/ufuzzy";

const uf = new uFuzzy({}); // TODO : CJK support

export function SearchView() {
  const searchText = useSearchTextStore((state) => state.searchText);
  const deferredSearchText = useDeferredValue(searchText);
  const contactList = useContactList();

  const contactsBySearchText = useMemo(() => {
    if (
      deferredSearchText.search(
        /[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF]/g
      ) >= 0
    ) {
      return contactList.filter((contact: any) =>
        contact.name.includes(deferredSearchText)
      );
    }

    const indices = uf.filter(
      contactList.map(
        (
          contact: any // TODO : fix this
        ) => `${contact.name}#${contact.phoneNumber}#${contact.digits}`
      ),
      deferredSearchText
    );

    if (!indices || indices.length === 0) return [];
    let i = 0;
    return contactList.filter((_, index) => {
      if (index === indices[i]) {
        i++;
        return true;
      }
      return false;
    });
  }, [contactList, deferredSearchText]);

  return (
    <FlashList
      renderItem={(
        { item }: any // TODO: fix this
      ) => (
        <ContactItem
          id={item.id}
          name={item.name}
          phoneNumber={item.phoneNumber}
          digits={item.digits}
          showFavorite
        />
      )}
      data={contactsBySearchText}
      estimatedItemSize={45}
    />
  );
}
