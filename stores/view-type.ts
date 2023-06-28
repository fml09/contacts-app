import { create } from "zustand";
import { ViewType } from "../types";

type ViewTypeStore = {
  viewType: ViewType;
  setViewType: (viewType: ViewType) => void;
};

export const useViewTypeStore = create<ViewTypeStore>((set) => ({
  viewType: ViewType.Default,
  setViewType: (viewType: ViewType) => set({ viewType }),
}));
