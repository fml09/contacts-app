import {
  createContext,
  useContext,
  type PropsWithChildren,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { ContactData, ContactListType } from "../types";
import * as Contacts from "expo-contacts";
import { LoadingView } from "../views/Loading";
import { AppState } from "react-native";

export const ContactListContext = createContext<ContactData[]>([]);

export function ContactListProvider({ children }: PropsWithChildren<{}>) {
  const [contactList, setContactList] = useState<ContactData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const appState = useRef(AppState.currentState);
  const updateContactList = useCallback(async () => {
    const contacts = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.PhoneNumbers,
        Contacts.Fields.Name,
        Contacts.Fields.ID,
      ],
    });
    console.log(contacts.data);
    setContactList(
      contacts.data
        .filter((contact) => Boolean(contact.phoneNumbers?.[0]))
        .map((contact) => {
          if (!contact.phoneNumbers?.[0]) return;
          const { digits, number } = contact.phoneNumbers[0];
          const name = contact.name;
          const id = contact.id;
          return {
            type: ContactListType.ContactItem,
            id,
            name,
            phoneNumber: number,
            digits,
          };
        }) as ContactData[]
    );
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    updateContactList();
  }, [updateContactList]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextState === "active"
      ) {
        updateContactList();
      }
      appState.current = nextState;

      return () => {
        subscription.remove();
      };
    });
  }, [updateContactList]);

  return (
    <ContactListContext.Provider value={contactList}>
      {isLoaded ? children : <LoadingView />}
    </ContactListContext.Provider>
  );
}

export function useContactList() {
  if (ContactListContext === undefined)
    throw new Error("useContactList must be used within a ContactListProvider");
  return useContext(ContactListContext);
}
