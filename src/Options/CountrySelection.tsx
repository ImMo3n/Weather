import {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { debounce } from "lodash";
import { GrClose } from "react-icons/gr";

import { COUNTRIES, EVars, ELang } from "../Common/GeneralInfo";

import { RecommendedSearches } from "./RecommendedSearches";
import { CountryContext } from "../WeatherApp";
import {
  getCountryName,
  getLocalCountry,
  getCurrentCountry,
} from "../Common/commonFunctions";
import { Modal } from "../Common/Modal";

export const CountrySelection = () => {
  const [country, setCountry] = useContext(CountryContext);

  const [countryCode, setCountryCode] = useState<string>(EVars.CURRENT);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const countrySelect = useRef<HTMLDialogElement>(null);

  const searchInput = useRef<HTMLInputElement>(null);

  const countryMemoized = useMemo(async () => {
    if (countryCode === EVars.CURRENT) {
      const country = await getCurrentCountry();
      return country;
    } else {
      const countryInfo = COUNTRIES[countryCode as keyof typeof COUNTRIES];
      const { GeoPt } = countryInfo;
      const [lat, long] = GeoPt;
      return { countryInfo, lat, long, countryCode };
    }
  }, [countryCode]);

  useEffect(() => {
    let isCancelled = false;

    const cachedCountry = getLocalCountry();
    if (countryCode === EVars.CURRENT && cachedCountry) {
      setCountry(cachedCountry);
    }
    countryMemoized.then((result) => {
      if (
        getCountryName(result, ELang.EN) ===
        getCountryName(cachedCountry, ELang.EN)
      )
        return;
      setCountry(result);
    });

    return () => {
      isCancelled = true;
    };
  }, [countryMemoized]);

  const handleSearchTerm = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    setSearchTerm(element.value);
  };

  const clearSearch = () => {
    if (searchInput.current) searchInput.current.value = "";
    setSearchTerm("");
  };

  const onCountrySelect = (countryCode: string) => {
    setCountryCode(countryCode);
    clearSearch();
    closeModal();
  };

  const openModal = () => {
    if (countrySelect.current) countrySelect.current.showModal();
  };

  const closeModal = () => {
    if (countrySelect.current) countrySelect.current.close();
  };

  const debouncedSearchTerm = debounce(handleSearchTerm, 300);

  return (
    <div>
      <button
        onClick={() => {
          openModal();
        }}
        className={`fflag fflag-${country?.countryCode} ff-lg p-2`}
      >
        <span className="sr-only">
          {`Select Country, Current Country: ${getCountryName(
            country?.countryCode,
            ELang.EN
          )}, Change Country`}
        </span>
      </button>

      <Modal modalRef={countrySelect}>
        <span className="relative flex w-auto gap-2 m-2">
          <input
            className="w-full sticky top-2 outline-none border-b-2 p-1 bg-transparent dark:text-white"
            type="text"
            onChange={debouncedSearchTerm}
            ref={searchInput}
            aria-label="Search for countries"
          />
          <button onClick={clearSearch} className="dark:text-white">
            <GrClose />
            <span className="sr-only">Clear Search</span>
          </button>
        </span>
        <RecommendedSearches
          searchTerm={searchTerm}
          onCountrySelect={onCountrySelect}
        />
      </Modal>
    </div>
  );
};
