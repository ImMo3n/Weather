import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { ELang } from "../Common/GeneralInfo";

export const Toggler = ({
  isOpen,
  title,
  clickHandler,
  language,
}: {
  isOpen?: boolean;
  title: string;
  clickHandler?: () => void;
  language: string;
}) => (
  <div
    aria-hidden
    className={`w-10 ${language === ELang.EN ? "pl-3" : "pr-3"}`}
  >
    {clickHandler && (
      <button>
        {(isOpen && <RxCaretUp />) || (!isOpen && <RxCaretDown />)}
        <span className="sr-only">
          {isOpen === true ? "collapse" : "expand"} weather for {title}
        </span>
      </button>
    )}
  </div>
);
