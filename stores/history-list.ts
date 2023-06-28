import { StateStorage, createJSONStorage, persist } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";
import { create } from "zustand";

const mmkv = new MMKV();

const historyStorage: StateStorage = {
  getItem: (name) => {
    const value = mmkv.getString(name);
    return value ?? null;
  },
  setItem: (name, value) => {
    return mmkv.set(name, value);
  },
  removeItem: (name) => {
    return mmkv.delete(name);
  },
};

type HistoryListStore = {
  historyList: string[];
  addHistory: (history: string) => void;
  deleteHistory: (history: string) => void;
};

export const useHistoryListStore = create<HistoryListStore>()(
  persist(
    (set, get) => ({
      historyList: [],
      addHistory: (history: string) => {
        const { historyList } = get();
        if (historyList.includes(history)) {
          set({
            historyList: [
              history,
              ...historyList.filter((item) => item !== history),
            ],
          });
          return;
        }
        if (historyList.length >= 10) {
          set({
            historyList: [history, ...historyList.slice(0, 9)],
          });
          return;
        }
        set({ historyList: [history, ...historyList] });
      },
      deleteHistory: (history: string) => {
        const { historyList } = get();
        set({
          historyList: historyList.filter((item) => item !== history),
        });
      },
    }),
    {
      name: "history-list",
      storage: createJSONStorage(() => historyStorage),
    }
  )
);
