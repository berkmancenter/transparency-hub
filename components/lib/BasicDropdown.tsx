'use client';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface DropdownProps {
  className?: string;
  options: string[];
  param?: string;
  subparams?: string[];
  override?: string;
  placeholder?: string;
  onChange?: (option: string) => void;
}

const Dropdown = (
  {
    className,
    options,
    param,
    subparams,
    override,
    placeholder,
    onChange,
  }: DropdownProps
) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(override || '');
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
    setFocusedIndex(-1);

    if (onChange) {
      onChange(option);
      return;
    }

    if (param) {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set(param, option);
      if (subparams) {
        for (const subparam of subparams) {
          params.delete(subparam);
        }
      }
      const query = params.toString();
      router.push(`${pathname}?${query}`, { scroll: false });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev + 1) % options.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev - 1 + options.length) % options.length);
        break;
      case 'Escape':
        setShowDropdown(false);
        setFocusedIndex(-1);
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex !== -1) {
          const selectedOption = options[focusedIndex];
          if (selectedOption) {
            handleSelect(selectedOption);
          }
        } else {
          // Do nothing if no dropdown item is selected
        }
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(options.length - 1);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setShowDropdown(false);
    setFocusedIndex(-1);
    if (override) {
      setSelectedOption(override);
    } else {
      setSelectedOption('');
    }
  }, [override]);

  const renderedOptions = useMemo(() => {
    return options.map((option, index) => {
      const isSelected = focusedIndex === index;
      return (
        <li
          key={option}
          role='option'
          aria-selected={isSelected}
          onMouseEnter={() => setFocusedIndex(index)}
          onClick={() => handleSelect(option)}
          className={`rounded-[8px] hover:bg-[#00000020] cursor-pointer overflow-hidden overflow-ellipsis px-2 ${isSelected ? 'bg-[#00000020]' : 'bg-[#ffffff]'}`}
        >
          {option}
        </li>
      );
    });
    
  }, [override, selectedOption, focusedIndex, options, handleSelect]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef} onKeyDown={handleKeyDown}>
      <button
        className="w-full focus:outline-none flex flex-row justify-between items-center"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="text-left overflow-ellipsis overflow-hidden">
          {selectedOption || placeholder || 'Select an option'}
        </div>
        <img className="w-[16px] h-[16px] ml-1" src="/chevron-down.svg" alt="" />
      </button>
      {showDropdown && (
        <ul
          className="absolute left-0 right-0 rounded-[8px] bg-[#ffffff] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] overflow-y-auto max-h-[200px] custom-scrollbar overflow-x-hidden"
          id="dropdown-listbox"
          role="listbox"
          aria-label="Select an option"
          aria-expanded={showDropdown}
        >
          {renderedOptions}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;