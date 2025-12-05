import * as React from "react";

// The imports below were types and have been removed, assuming the components are available.
// The structure of the ToasterToast object must be understood implicitly.

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

// ToasterToast structure is implicitly defined by its usage
/* type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};
*/

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
};

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

/* // Type definitions for Action and State are removed
type ActionType = typeof actionTypes;
type Action = ...;
interface State { toasts: ToasterToast[]; }
*/

const toastTimeouts = new Map(); // Map<string, ReturnType<typeof setTimeout>> becomes just Map()

const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: actionTypes.REMOVE_TOAST, // Changed string to use actionTypes constant
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

// State and Action types are removed from the function signature
export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOAST: // Changed string to use actionTypes constant
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case actionTypes.UPDATE_TOAST: // Changed string to use actionTypes constant
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case actionTypes.DISMISS_TOAST: { // Changed string to use actionTypes constant
      const { toastId } = action;

      // ! Side effects !
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }
    case actionTypes.REMOVE_TOAST: // Changed string to use actionTypes constant
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    default:
        return state; // Added default case for safe reducer
  }
};

const listeners = []; // Array<(state: State) => void> becomes just Array

let memoryState = { toasts: [] }; // Initial State is now just a JS object

function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

// Type definition for Toast is removed
/* type Toast = Omit<ToasterToast, "id">; */

function toast({ ...props }) {
  const id = genId();

  const update = (props) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST, // Changed string to use actionTypes constant
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id }); // Changed string to use actionTypes constant

  dispatch({
    type: actionTypes.ADD_TOAST, // Changed string to use actionTypes constant
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  // Type annotation for useState is removed
  const [state, setState] = React.useState(memoryState); 

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []); // Dependency array changed to '[]' as 'state' is not used inside useEffect

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }), // Changed string to use actionTypes constant
  };
}

export { useToast, toast };