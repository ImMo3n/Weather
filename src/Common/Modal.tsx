import { useContext } from "react";
import { createPortal } from "react-dom";

import { ELang, langPlaceholder } from "./GeneralInfo";
import { LanguageContext } from "../WeatherApp";

export const Modal = ({
  modalRef,
  children,
}: {
  modalRef: React.RefObject<HTMLDialogElement>;
  children: React.ReactNode;
}) => {
  const [language] = useContext(LanguageContext);

  const modalContainer = document.getElementById("Modal")!;

  const closeModal = () => {
    modalRef?.current?.close?.();
  };

  const closeLabel = langPlaceholder[language as ELang].modalCloseLabel;

  return createPortal(
    <dialog
      className="rounded-md dark:bg-slate-800"
      style={{ width: "clamp(50%, 800px, 95%)", height: "90%" }}
      ref={modalRef}
      onClick={(event) => {
        const rect = modalRef?.current?.getBoundingClientRect();
        if (!rect) return;
        const { clientX, clientY } = event;
        const { left, right, top, bottom } = rect;
        if (
          left > clientX ||
          right < clientX ||
          top > clientY ||
          bottom < clientY
        ) {
          closeModal();
        }
      }}
    >
      <button onClick={closeModal} className="text-xl flex justify-end m-2">
        <span className="sr-only">Close</span>
        <span
          aria-hidden
          className="border border-slate-950 dark:border-gray-300 dark:text-white p-2 rounded-md mb-2"
        >
          {closeLabel}
        </span>
      </button>
      {children}
    </dialog>,
    modalContainer
  );
};
