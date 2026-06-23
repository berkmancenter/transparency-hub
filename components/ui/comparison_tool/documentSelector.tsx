'use client'
import SearchableDropdown from "@/components/lib/SearchableDropdown";
import Dropdown from "@/components/lib/BasicDropdown";
import { Platform } from "@/components/src/types";
import { useRef, useState, useEffect, useCallback } from "react";
import dropdownRender from "../dropdownRender";
import { createPortal } from "react-dom";

export default function DocumentSelector({
  platform,
  docType,
  baseRev,
  secondaryRev,
  docOptions,
  dates
}: {
  platform: string;
  docType: string;
  baseRev: string;
  secondaryRev: string;
  docOptions: string[];
  dates: string[];
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  
  const fetchPlatforms = useCallback(async (query: string): Promise<Platform[]> => {
    const res = await fetch(`/api/list-companies?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.companies;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
}, []);

  return (
    <>
      <div className="flex flex-col gap-9 items-baseline w-full">
        <p className="ASML_Text Paragraph">Track how a platform’s policies have changed over time by selecting a platform, a specific policy, and dates to compare</p>
        <div className="w-full flex flex-col items-center justify-center pt-6 gap-4 border-1 border-primary-blue rounded-[4px] bg-[#00000080]">
          <div className="items-baseline flex flex-col gap-4 w-max">
            <label className="ASML_Text !text-[20px]">PLATFORM</label>
            <SearchableDropdown className="border-1 border-primary-blue bg-[#ffffff] rounded-[8px] ASML_Text focus:outline-none !text-[14px]/[42px] !text-[#000000] px-2 min-w-[215px] z-30 "
              ref={inputRef}
              sendURL="?platform="
              fetchOptions={fetchPlatforms} displayValue={(platform: Platform) => platform.name} renderOption={dropdownRender}
              override={platform}
              placeholder="Search platforms..."
            />
          </div>
          <div className="items-baseline flex flex-col gap-4 w-max">
            <label className="ASML_Text !text-[20px]">POLICY</label>
            <Dropdown className="border-1 border-primary-blue bg-[#ffffff] rounded-[8px] ASML_Text focus:outline-none !text-[14px]/[42px] !text-[#000000] px-2  min-w-[215px] z-20  w-max"
              options={docOptions.filter((doc) => doc !== docType)}
              param="docType"
              subparams={["baseRev", "secondaryRev"]}
              override={docType}
              placeholder={platform ? "Select a policy" : "Select a platform first"}
            />
          </div>
          <div ref={sentinelRef} />
          {docType ?
            <div className="w-full items-center flex flex-col">
              {/* This is wrong... But it renders correctly */}
              <svg className="translate-y-[10px]" xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
                <path d="M4.76367 1.75C5.72595 0.0834033 8.13151 0.0833564 9.09375 1.75L12.5576 7.75L12.9912 8.5H0.866211L1.2998 7.75L4.76367 1.75Z" fill="#311632" stroke="#4D7A8B" />
              </svg>
              <svg className="translate-y-[2px]" xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
                <path d="M4.76367 1.75C5.72595 0.0834033 8.13151 0.0833564 9.09375 1.75L12.5576 7.75L12.9912 8.5H0.866211L1.2998 7.75L4.76367 1.75Z" fill="#311632" />
              </svg>
              <div className="w-full flex flex-row items-center justify-center p-6 border-t-1 border-primary-blue rounded-b-[4px] bg-orchid-700">
                { dates.length > 0 ?
                  <div className="flex w-[20vw] min-w-[260px] justify-center">
                    <div className="flex flex-row gap-4">
                      <div className="w-full">
                        <label className="ASML_Text !text-[12px]">First Date</label>
                        <Dropdown className="border-1 border-primary-blue bg-[#ffffff] rounded-[8px] ASML_Text focus:outline-none !text-[14px]/[42px] !text-[#000000] px-2 z-10 w-max"
                          options={dates.filter((date) => date !== secondaryRev && date !== baseRev)}
                          param="baseRev"
                          override={baseRev}
                          placeholder="Select a date"
                        />
                      </div>
                      <div className="w-full">
                        <label className="ASML_Text !text-[12px]">Second Date</label>
                        <Dropdown className="border-1 border-primary-blue bg-[#ffffff] rounded-[8px] ASML_Text focus:outline-none !text-[14px]/[42px] !text-[#000000] px-2 z-10 w-max"
                          options={dates.filter((date) => date !== baseRev && date !== secondaryRev)}
                          param="secondaryRev"
                          override={secondaryRev}
                          placeholder="Select a date"
                        />
                      </div>
                    </div>
                  </div>
                : 
                  <div className="ASML_Text !font-bold text-[20px]/[24px]">
                    No comparisons are available
                  </div>
                }
              </div>
            </div>
            : <div></div>
          }
        </div>
      </div>
      { scrolled && createPortal(
        <div className="fixed top-0 left-0 w-screen z-50 bg-gradient-to-r from-ASML-blue via-ASML-purple to-ASML-red border-b border-primary-blue flex flex-col items-center">
          <div className="w-full h-full bg-[#0000008A]">
            <div className="flex flex-row gap-6 w-full justify-center items-center px-6 pt-4">
              <SearchableDropdown className="border-1 border-primary-blue bg-[#ffffff] rounded-[8px] ASML_Text focus:outline-none !text-[14px]/[42px] !text-[#000000] px-2 z-30 w-[175px]"
                ref={inputRef}
                sendURL="?platform="
                fetchOptions={fetchPlatforms} displayValue={(platform: Platform) => platform.name} renderOption={dropdownRender}
                override={platform}
                placeholder="Search platforms..."
              />
              <Dropdown className="border-1 border-primary-blue bg-[#ffffff] rounded-[8px] ASML_Text focus:outline-none !text-[14px]/[42px] !text-[#000000] px-2 w-[175px] z-20 whitespace-nowrap overflow-ellipsis"
                options={docOptions.filter((doc) => doc !== docType)}
                param="docType"
                subparams={["baseRev", "secondaryRev"]}
                override={docType}
                placeholder={platform ? "Select a policy" : "Select a platform first"}
              />
            </div>
            {docType && (
              <div className="flex flex-col w-full items-center">
                <svg className="translate-y-[10px]" xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
                  <path d="M4.76367 1.75C5.72595 0.0834033 8.13151 0.0833564 9.09375 1.75L12.5576 7.75L12.9912 8.5H0.866211L1.2998 7.75L4.76367 1.75Z" fill="#311632" stroke="#4D7A8B" />
                </svg>
                <svg className="translate-y-[2px]" xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
                  <path d="M4.76367 1.75C5.72595 0.0834033 8.13151 0.0833564 9.09375 1.75L12.5576 7.75L12.9912 8.5H0.866211L1.2998 7.75L4.76367 1.75Z" fill="#311632" />
                </svg>
                <div className="w-full flex flex-row items-center justify-center border-t-1 border-primary-blue rounded-b-[4px] bg-orchid-700">
                  { dates.length > 0 ?
                    <div className="flex w-[20vw] min-w-[260px] justify-center pt-1 pb-4 px-4">
                      <div className="flex flex-row gap-6">
                        <div className="w-full">
                          <label className="ASML_Text !text-[12px]">First Date</label>
                          <Dropdown className="border-1 border-primary-blue bg-[#ffffff] rounded-[8px] ASML_Text focus:outline-none !text-[14px]/[42px] !text-[#000000] px-2 z-10 w-max"
                            options={dates.filter((date) => date !== baseRev && date !== secondaryRev)}
                            param="baseRev"
                            override={baseRev}
                            placeholder="Select a date"
                          />
                        </div>
                        <div className="w-full">
                          <label className="ASML_Text !text-[12px]">Second Date</label>
                          <Dropdown className="border-1 border-primary-blue bg-[#ffffff] rounded-[8px] ASML_Text focus:outline-none !text-[14px]/[42px] !text-[#000000] px-2 z-10 w-max"
                            options={dates.filter((date) => date !== baseRev && date !== secondaryRev)}
                            param="secondaryRev"
                            override={secondaryRev}
                            placeholder="Select a date"
                          />
                        </div>
                      </div>
                    </div>
                    :
                      <div className="ASML_Text !font-bold text-[20px]/[24px] py-4">
                        No comparisons are available
                      </div>
                    }
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}