import { useContext, useEffect, useRef } from "react";

import { FiSettings } from "react-icons/fi";

import { Modal } from "../Common/Modal";

import { CountrySelection } from "./CountrySelection";
import {
  LanguageContext,
  TempContext,
  DarkModeContext,
  CountryContext,
} from "../WeatherApp";
import { ELang, ETempMode, EColorMode } from "../Common/GeneralInfo";
import { updateDocumentTitle } from "../Common/commonFunctions";
import { Switch } from "./Switch";

export const Settings = () => {
  const [language, setLanguage] = useContext(LanguageContext);
  const [tempMode, setTempMode] = useContext(TempContext);
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  const [country] = useContext(CountryContext);

  const modalRef = useRef<HTMLDialogElement>(null);

  const toggleLanguage = () => {
    setLanguage((currentLanguage) =>
      currentLanguage === ELang.EN ? ELang.FA : ELang.EN
    );
  };

  const toggleTempMode = () => {
    setTempMode((tempMode) =>
      tempMode === ETempMode.C ? ETempMode.F : ETempMode.C
    );
  };

  const toggleDarkMode = () => {
    setDarkMode((mode) =>
      mode === EColorMode.DARK ? EColorMode.LIGHT : EColorMode.DARK
    );
  };

  const openModal = () => {
    if (modalRef.current) modalRef.current.showModal();
  };

  useEffect(() => {
    if (country?.countryCode) {
      updateDocumentTitle(country?.countryCode, language);
    }
  }, [language, country?.countryCode]);

  return (
    <div>
      <div className="max-w-5xl m-auto px-2 pt-2 flex justify-end">
        <button
          className="text-3xl"
          onClick={() => {
            openModal();
          }}
        >
          <FiSettings />
          <span className="sr-only">Settings</span>
        </button>
      </div>

      <Modal modalRef={modalRef}>
        <div className="flex flex-col justify-center items-center gap-10 py-4 w-full">
          <CountrySelection />
          <Switch
            checked={language === ELang.FA}
            srOnlyText={"Language Persian"}
            onChange={toggleLanguage}
            uncheckedText="English"
            checkedText="فارسی"
          />
          <Switch
            checked={tempMode === ETempMode.F}
            srOnlyText={`Enable ${
              tempMode === ETempMode.F ? "centigrade" : "fahrenheit"
            } mode`}
            onChange={toggleTempMode}
            uncheckedText="C"
            checkedText="F"
          />
          <Switch
            checked={darkMode === EColorMode.LIGHT}
            srOnlyText={`Enable ${darkMode === "dark" ? "light" : "dark"} mode`}
            onChange={toggleDarkMode}
            uncheckedText="Dark"
            checkedText="Light"
          />
        </div>
      </Modal>
    </div>
  );
};
