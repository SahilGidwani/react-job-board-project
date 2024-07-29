import {
  defer,
  useLoaderData,
  Await as AwaitReactRouter,
} from "react-router-dom";

export function deferredLoader(dataFunc) {
  return (args) => {
    return defer(dataFunc(args));
  };
}

export function useDeferredLoaderData() {
  return useLoaderData();
}

export function Await(props) {
  return <AwaitReactRouter {...props} />;
}
