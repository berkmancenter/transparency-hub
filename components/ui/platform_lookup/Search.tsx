'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDebouncedCallback<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): T {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return ((...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  }) as T;
}

export default function Search({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [filter1, setFilter1] = useState<boolean>(false);
  const [filter2, setFilter2] = useState<boolean>(false);
  const [filter3, setFilter3] = useState<boolean>(false);
  const [filter4, setFilter4] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const filters = params.get('filters')?.split(',') || [];
    setFilter1(filters.includes('Privacy Policy'));
    setFilter2(filters.includes('Terms of Service'));
    setFilter3(filters.includes('Community Guidelines'));
    setFilter4(filters.includes('Other'));
  }, []);

  // const clearFilters = () => {
  //   setFilter1(false);
  //   setFilter2(false);
  //   setFilter3(false);
  //   setFilter4(false);
  //   const params = new URLSearchParams(searchParams);
  //   params.delete('filters');
  //   router.push(`${pathname}?${params.toString()}`, { scroll: false });
  // };

  const handleFilterChange = (button: string) => {
    const params = new URLSearchParams(searchParams);
    const currentFilters = params.get('filters')?.split(',') || [];

    let filter = '';
    switch (button) {
      case 'button1':
        filter = 'Privacy Policy';
        setFilter1(!filter1);
        break;
      case 'button2':
        filter = 'Terms of Service';
        setFilter2(!filter2);
        break;
      case 'button3':
        filter = 'Community Guidelines';
        setFilter3(!filter3);
        break;
      case 'button4':
        filter = 'Other';
        setFilter4(!filter4);
        break;
      default:
        break;
    }

    if (filter && currentFilters.includes(filter)) {
      if (currentFilters.length === 1) {
        params.delete('filters');
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
        return;
      } else {
        currentFilters.splice(currentFilters.indexOf(filter), 1);
        params.set('filters', currentFilters.join(','));
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }
    } else {
      currentFilters.push(filter);
      params.set('filters', currentFilters.join(','));
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  return (
    <div className="w-full flex xl:flex-row flex-col lg:justify-between justify-center items-center gap-2">
      <div className="xl:w-[270px] w-[580px] max-w-[60vw]">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="border-2 border-primary-blue ASML_Text !text-[16px] !text-[#000000] p-2 w-full rounded-xl bg-white focus:outline-none"
          placeholder={placeholder}
          type='search'
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
      </div>
      <div className="flex md:flex-row flex-col gap-1 md:items-stretch items-center">
        <div className="flex flex-col ASML_Text !text-[14px]/[20px] uppercase items-end">
          FILTERS
          <img className="w-[16px] md:block hidden" width={16} src="/policy_index/filter.svg" alt="" />
        </div>
        <button className={`flex flex-row items-center border-2 p-2 border-white cursor-pointer rounded-[8px] gap-1 hover:bg-[#00000080] ASML_Text Navigation !text-[14px]/[20px] ${filter1 ? 'bg-white !text-orchid-600' : ''}`}
          onClick={() => handleFilterChange('button1')}
        >
          <img className={filter1 ? 'orchid-filter' : ''} width={16} src="/policy_index/eye_bold.svg" alt="" />
          PRIVACY POLICY
        </button>
        <button className={`flex flex-row items-center border-2 p-2 border-white cursor-pointer rounded-[8px] gap-1 hover:bg-[#00000080] ASML_Text Navigation !text-[14px]/[20px] ${filter2 ? 'bg-white !text-orchid-600' : ''}`}
          onClick={() => handleFilterChange('button2')}
        >
          <img className={filter2 ? 'orchid-filter' : ''} width={16} src="/policy_index/file-text_bold.svg" alt="" />
          TERMS OF SERVICE
        </button>
        <button className={`flex flex-row items-center border-2 p-2 border-white cursor-pointer rounded-[8px] gap-1 hover:bg-[#00000080] ASML_Text Navigation !text-[14px]/[20px] ${filter3 ? 'bg-white !text-orchid-600' : ''}`}
          onClick={() => handleFilterChange('button3')}
        >
          <img className={filter3 ? 'orchid-filter' : ''} width={16} src="/policy_index/users_bold.svg" alt="" />
          COMMUNITY STANDARDS
        </button>
        <button className={`flex flex-row items-center border-2 p-2 border-white cursor-pointer rounded-[8px] gap-1 hover:bg-[#00000080] ASML_Text Navigation !text-[14px]/[20px] ${filter4 ? 'bg-white !text-orchid-600' : ''}`}
          onClick={() => handleFilterChange('button4')}
        >
          <img className={filter4 ? 'orchid-filter' : ''} width={16} src="/policy_index/other_bold.svg" alt="" />
          OTHER
        </button>
      </div>
    </div>
  );
}

