import { create } from "zustand";

type SearchTextStore = {
  searchText: string;
  setSearchText: (searchText: string) => void;
};
export const useSearchTextStore = create<SearchTextStore>((set) => ({
  searchText: "",
  setSearchText: (searchText: string) => set({ searchText }),
}));
