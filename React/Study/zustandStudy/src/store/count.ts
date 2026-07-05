import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { subscribeWithSelector } from "zustand/middleware";

type Store = {
  count: number;
  actions: { increase: () => void; decrease: () => void };
};

const useCountStore = create(
  subscribeWithSelector(
    immer(
      combine({ count: 0, doubledCount: 0 }, (set) => ({
        actions: {
          increase: () => {
            set((state) => {
              state.count = state.count + 1;
            });
          },
          decrease: () => {
            set((state) => {
              state.count = state.count - 1;
            });
          },
        },
      }))
    )
  )
);
export const useCount = () => {
  const count = useCountStore((state) => state.count);
  return count;
};

export const useIncrease = () => {
  const increase = useCountStore((state) => state.actions.increase);
  return increase;
};

export const useDecrease = () => {
  const decrease = useCountStore((state) => state.actions.decrease);
  return decrease;
};
