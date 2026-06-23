'use client';
import Form from 'next/form';
import { useRef } from 'react';
import SearchableDropdown from '../lib/SearchableDropdown';
import { Platform } from '../src/types';
import dropdownRender from './dropdownRender';

export default function HomeSearch() {
  const fetchPlatforms = async (query: string): Promise<Platform[]> => {
    const res = await fetch(`/api/list-companies?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.companies;
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full flex flex-col gap-6 items-center justify-center bg-orchid-700 border-1 border-orchid-500/50 p-6">
      <h3 className="ASML_Text !text-[32px]/[43px] !font-[900]">
        Compare policies over time
      </h3>
      <Form className="" action="/policy_index/#search">
        <label className="ASML_Text !text-[20px]">
          Search by platform name
        </label>
        <div className="flex flex-row justify-between items-center w-[580px] max-w-[70vw]">
          <SearchableDropdown className="border-1 border-primary-blue bg-[#ffffff] rounded-l-[8px] ASML_Text focus:outline-none !text-[16px]/[42px] !text-[#000000] px-2 w-full"
            sendURL="/policy_index/"
            ref={inputRef}
            fetchOptions={fetchPlatforms}
            displayValue={(platform: Platform) => platform.name}
            renderOption={dropdownRender}
            placeholder=""
          />
          <button className="border-1 border-primary-blue ASML_Text Paragraph Bold bg-primary-blue min-w-[100px] rounded-r-[8px] flex flex-row gap-1 justify-center items-center py-[9px]" type="submit">
            <img className="w-[16px] h-[16px]" title="Search icon" src="/Search_icon.svg" alt="Search" />
            Search
          </button>
        </div>
      </Form>
    </div>
  )
}