import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const initialState = {
  isOpen: false,
};

const useProfileEitorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
      },
    })),
    { name: "ProfileEditorModalStore" },
  ),
);

export const useOpenProfileEditorModal = () => {
  const open = useProfileEitorModalStore((store) => store.actions.open);
  return open;
};

export const useProfileEditorModal = () => {
  const store = useProfileEitorModalStore();
  return store;
};
