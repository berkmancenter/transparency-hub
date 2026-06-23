'use client';
import { Platform } from '@/components/src/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

interface SearchableDropdownProps {
  className?: string;
  fetchOptions: (query: string) => Promise<Platform[]>;
  displayValue: (item: Platform) => string;
  renderOption?: (item: Platform, query: string) => React.ReactNode;
  sendURL: string;
  placeholder?: string;
  minQueryLength?: number;
  override?: string;
}

const SearchableDropdown = React.forwardRef<
  HTMLInputElement,
  SearchableDropdownProps
>(({ className, fetchOptions, displayValue, renderOption, sendURL, placeholder = 'Search...', minQueryLength = 1, override }, ref) => {
  const [query, setQuery] = useState(override || '');
  const [options, setOptions] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [hasFocus, setHasFocus] = useState(false);
  const router = useRouter(); const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.trim().length < minQueryLength) {
      setOptions([]);
      setShowDropdown(false);
      setFocusedIndex(-1);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await fetchOptions(debouncedQuery.trim());
        setOptions(results || []);
        // Only show Dropdown from this call if this component has focus
        if (hasFocus) {
          setShowDropdown(true);
        }
      } catch (err: unknown) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Failed to load options');
        setOptions([]);
      } finally {
        setLoading(false);
        setFocusedIndex(-1);
      }
    };

    fetchData();
  }, [debouncedQuery, fetchOptions, minQueryLength]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (item: Platform) => {
      setQuery(displayValue(item));
      setShowDropdown(false);
      setOptions([]);
      setFocusedIndex(-1);
    },
    [displayValue]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const controlkeys = ['ArrowDown', 'ArrowUp', 'Escape', 'Backspace', 'Enter', 'Delete', 'Tab', 'Home', 'End'];

    if (controlkeys.includes(e.key) || e.ctrlKey || e.metaKey || e.altKey) {
      if (!showDropdown || sortedOptions.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => (prev + 1) % sortedOptions.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => (prev - 1 + sortedOptions.length) % sortedOptions.length);
          break;
        case 'Escape':
          setShowDropdown(false);
          setFocusedIndex(-1);
          break;
        case 'Enter':
          // If there's one dropdown item, select it
          if (focusedIndex === -1 && sortedOptions.length === 1) {
            e.preventDefault();
            const selectedOption = sortedOptions[0];
            if (selectedOption) {
              handleSelect(selectedOption);
              router.push(`${sendURL}${encodeURIComponent(selectedOption.name)}`);
            }
          }
          // Dropdown item is selected, navigate to that specific platform
          if (focusedIndex !== -1) {
            e.preventDefault();
            const selectedOption = sortedOptions[focusedIndex];
            if (selectedOption) {
              handleSelect(selectedOption);
              router.push(`${sendURL}${encodeURIComponent(selectedOption.name)}`);
            }
          }
          break;
        case 'Home':
          setFocusedIndex(0);
          break;
        case 'End':
          setFocusedIndex(sortedOptions.length - 1);
          break;
        default:
          break;
      }
    } else {
      // Prevent unwanted key presses
      if (!/[a-zA-Z0-9//+\s]/.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue.replace(/[^a-zA-Z0-9//+\s]/g, ''));
  };

  const sortedOptions = useMemo(() => {
    if (!Array.isArray(options)) return [];

    return [...options].sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const searchQuery = query.toLowerCase();

      // Priority 1: Exact match
      const aExact = aName === searchQuery;
      const bExact = bName === searchQuery;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      // Priority 2: Starts with query
      const aStartsWith = aName.startsWith(searchQuery);
      const bStartsWith = bName.startsWith(searchQuery);
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;

      // Priority 3: Contains query (already filtered by API, so all remaining items)
      // Priority 4: Alphabetical order
      return aName.localeCompare(bName);
    });
  }, [options, query]);

  const renderedOptions = useMemo(() => {
    if (loading)
      return <li className='p-1 text-gray-500 italic'>Loading...</li>;
    if (error) return <li className='px-2 py-1 text-red-500'>{error}</li>;

    if (!Array.isArray(sortedOptions)) {
      return <li className='px-2 py-1 text-gray-500'>No options available</li>;
    }

    if (!loading && sortedOptions.length === 0 && query.length >= minQueryLength)
      return <li className='px-2 py-1 text-gray-500'>No results found</li>;

    return sortedOptions.map((option, index) => {
      const isSelected = index === focusedIndex;
      const renderedOption = renderOption ? renderOption(option, query) : displayValue(option);

      return (
        <Link
          key={option.id || index}
          href={`${sendURL}${encodeURIComponent(option.name)}`}
          role='option'
          aria-selected={isSelected}
          onClick={() => handleSelect(option)}
          onMouseEnter={() => setFocusedIndex(index)}
          className={`px-2 cursor-pointer ${isSelected ? 'bg-[#00000020]' : ''
            } ${index < options.length - 1 ? '' : ''}`}
          scroll={false}
        >
          {renderedOption}
        </Link>
      );
    });
  }, [loading, error, sortedOptions, focusedIndex, query, renderOption, displayValue, handleSelect, minQueryLength]);

  useEffect(() => {
    setFocusedIndex(-1);
    setShowDropdown(false);
    if (override) {
      setQuery(override);
    } else {
      setQuery('');
    }
  }, [override]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef} translate="no">
      <input
        ref={ref}
        type='search'
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onFocus={() => {
          setHasFocus(true);
          if (query.length >= minQueryLength && options.length > 0)
            setShowDropdown(true);
        }}
        onBlur={() => {
          setHasFocus(false);
        }}
        onKeyDown={handleKeyDown}
        aria-autocomplete='list'
        aria-expanded={showDropdown}
        aria-controls='dropdown-listbox'
        className='w-full focus:outline-none'
        autoComplete='off'
        name="query"
      />

      {showDropdown && (
        <ul
          id='dropdown-listbox'
          role='listbox'
          aria-label='Search results'
          className='absolute top-11 left-0 right-0 bg-[#ffffff] rounded-[8px] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-h-[200px] flex flex-col overflow-y-auto z-40 custom-scrollbar'
        >
          {renderedOptions}
        </ul>
      )}
    </div>
  );
});

export default SearchableDropdown;