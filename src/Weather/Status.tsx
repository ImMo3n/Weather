import { getFirstWordCapitalized } from "../Common/commonFunctions";

export const Status = ({ weatherStatus }: { weatherStatus: string }) => (
  <div>
    <span className="flex items-center justify-between">
      <span className="sr-only">Weather Status: </span>
      {getFirstWordCapitalized(weatherStatus)}
    </span>
  </div>
);
