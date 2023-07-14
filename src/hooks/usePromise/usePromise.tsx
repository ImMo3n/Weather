import { useCallback, useEffect, useReducer } from "react";

type ILoadState = {
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  result: any;
  error: string;
};

type reducerActions =
  | { type: "Success"; payload: any }
  | { type: "Error"; payload: string }
  | { type: "Loading" };

function resultReducer(state: ILoadState, action: reducerActions) {
  const { type } = action;
  switch (type) {
    case "Success":
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        result: action.payload,
      };
    case "Error":
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    case "Loading":
      return { ...state, isLoading: true };
    default:
      throw new Error("undefined action");
  }
}

export const usePromise = (
  promise: Promise<any>,
  dependencies: Array<string | number | Function | Promise<any>> = []
): ILoadState => {
  const [{ isSuccess, isLoading, isError, result, error }, dispatchReducer] =
    useReducer(resultReducer, {
      isSuccess: false,
      isLoading: false,
      isError: false,
      result: null,
      error: "",
    });

  useEffect(() => {
    dispatchReducer({ type: "Loading" });
    let isCancelled = false;
    promise
      .then((result) => {
        if (isCancelled === false) {
          dispatchReducer({ type: "Success", payload: result });
        }
      })
      .catch((error) => {
        if (isCancelled === false) {
          dispatchReducer({ type: "Error", payload: error });
        }
      });
    return () => {
      isCancelled = true;
    };
  }, [...dependencies]);
  return { isSuccess, isLoading, isError, result, error };
};
