import React from "react";
import { usePromise } from "./usePromise";

interface IUsePromise {
  promise: () => Promise<any>;
  SuccessElement: React.ElementType;
  LoadingElement: React.ElementType;
  ErrorElement: React.ElementType;
}

export const PromiseElement = ({
  promise,
  SuccessElement,
  LoadingElement,
  ErrorElement,
}: IUsePromise): JSX.Element => {
  const { isSuccess, isLoading, isError, result, error } = usePromise(
    promise(),
    [promise]
  );
  if (isError === true) return <ErrorElement error={error} />;
  else if (isLoading === true) return <LoadingElement />;
  else if (isSuccess === true) return <SuccessElement result={result} />;
  else return <>shouldn't be printed</>;
};
