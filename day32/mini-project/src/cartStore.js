import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * cartStore.js - Zustand Cart Store with Persistence
 *
 * Implements:
 * - Direct Zustand store using `create`
 * - Automatic localStorage persistence via `persist` middleware (key: "addis-eats-cart")
 * - Actions: addItem, remove, clear
 * - Derived selector helpers for narrow subscribing without re-rendering unnecessary components
 */
export const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      // Add a dish item to the cart
      addItem: (dish) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              ...dish,
              _instanceId: dish._instanceId || `${dish.id}-${Date.now()}-${Math.random()}`,
            },
          ],
        })),

      // Remove a dish item by id or instanceId
      remove: (id, instanceId) =>
        set((state) => {
          if (instanceId) {
            return { items: state.items.filter((item) => item._instanceId !== instanceId) };
          }
          const targetIndex = state.items.findIndex((item) => item.id === id);
          if (targetIndex === -1) return state;
          return { items: state.items.filter((_, idx) => idx !== targetIndex) };
        }),

      // Clear the entire cart
      clear: () => set({ items: [] }),
    }),
    {
      name: "addis-eats-cart", // localStorage key
    }
  )
);

export default useCartStore;
