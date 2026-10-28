/**
 * cartReducer.js - Pure Reducer for Cart State Transitions
 *
 * Implements:
 * - "add": Appends a dish to the items array
 * - "remove": Removes a dish by its id or specific instance
 * - "clear": Resets the items array to []
 * - Pure function: no side effects, returns new state references
 * - Can be tested and executed directly outside React with plain objects
 */

export const initialCartState = {
  items: [],
};

/**
 * Pure reducer function for shopping cart transitions
 *
 * @param {{ items: Array }} state - Current cart state
 * @param {{ type: string, dish?: object, id?: number, index?: number }} action - Action object
 * @returns {{ items: Array }} Next immutable cart state
 */
export function cartReducer(state = initialCartState, action) {
  if (!action || !action.type) {
    return state;
  }

  switch (action.type) {
    case "add": {
      if (!action.dish) return state;
      // Assign an instance id if multiple identical dishes are added
      const itemWithInstance = {
        ...action.dish,
        _instanceId: action.dish._instanceId || `${action.dish.id}-${Date.now()}-${Math.random()}`,
      };
      return {
        ...state,
        items: [...state.items, itemWithInstance],
      };
    }

    case "remove": {
      // If a specific _instanceId is provided, remove only that item
      if (action.instanceId) {
        return {
          ...state,
          items: state.items.filter((item) => item._instanceId !== action.instanceId),
        };
      }
      // If index is provided, remove at that index
      if (action.index !== undefined) {
        return {
          ...state,
          items: state.items.filter((_, idx) => idx !== action.index),
        };
      }
      // Otherwise remove the first matching item with action.id
      const targetIndex = state.items.findIndex((item) => item.id === action.id);
      if (targetIndex === -1) return state;
      return {
        ...state,
        items: state.items.filter((_, idx) => idx !== targetIndex),
      };
    }

    case "clear": {
      return {
        ...state,
        items: [],
      };
    }

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export default cartReducer;
