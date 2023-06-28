import { StateStorage, createJSONStorage, persist } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";
import { create } from "zustand";

const mmkv = new MMKV();

type FavoriteSetStore = {
  favorite: Set<string>;
  addFavorite: (favorite: string) => void;
  deleteFavorite: (favorite: string) => void;
};

export const useFavoriteSetStore = create<FavoriteSetStore>()(
  persist(
    (set, get) => ({
      favorite: new Set(),
      addFavorite: (favorite: string) => {
        const { favorite: favoriteSet } = get();
        favoriteSet.add(favorite);
        set({ favorite: favoriteSet });
      },
      deleteFavorite: (favorite: string) => {
        const { favorite: favoriteSet } = get();
        favoriteSet.delete(favorite);
        set({ favorite: favoriteSet });
      },
    }),
    {
      name: "favorite-set",
      storage: {
        getItem: (name) => {
          const value = mmkv.getString(name) ?? "";
          return {
            state: {
              ...JSON.parse(value).state,
              favorite: new Set<string>(JSON.parse(value).state.favorite),
            },
          };
        },
        setItem: (name, value) => {
          const str = JSON.stringify({
            state: {
              ...value.state,
              favorite: Array.from(value.state.favorite.values()),
            },
          });
          mmkv.set(name, str);
        },
        removeItem: (name) => {
          return mmkv.delete(name);
        },
      },
    }
  )
);
