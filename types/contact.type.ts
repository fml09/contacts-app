export const enum ContactListType {
  Title,
  ContactItem,
  History,
}

export type ContactData =
  | {
      type: ContactListType.Title;
      title: string;
    }
  | {
      type: ContactListType.ContactItem;
      id: string;
      name: string;
      phoneNumber: string;
      digits: string;
    }
  | {
      type: ContactListType.History;
      history: string;
    };
