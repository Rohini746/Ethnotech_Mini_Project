import { useState, useEffect, useRef, useMemo } from 'react'
import { Search, X, SlidersHorizontal, Loader2 } from 'lucide-react'

/**
 * "What's in my Fridge?" multi-select ingredient search bar.
 * 
 * Implements the component spec from DESIGN.md §4.3:
 * - Multi-select tags with fadeIn/fadeOut animations
 * - Dropdown suggestions grouped by category
 * - Debounced filtering, keyboard navigation
 * - Smart Filter trigger button
 */
export default function FridgeSearch({ ingredients, onFilter, isLoading }) {
  const [inputValue, setInputValue] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  // Debounced input for filtering
  const [debouncedValue, setDebouncedValue] = useState('')
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(inputValue), 200)
    return () => clearTimeout(timer)
  }, [inputValue])

  // Filter suggestions
  const filteredSuggestions = useMemo(() => {
    const selectedNames = new Set(selectedTags.map((t) => t.toLowerCase()))
    return ingredients
      .filter((ing) => {
        const name = typeof ing === 'string' ? ing : ing.name
        return (
          !selectedNames.has(name.toLowerCase()) &&
          name.toLowerCase().includes(debouncedValue.toLowerCase())
        )
      })
      .slice(0, 20)
  }, [ingredients, selectedTags, debouncedValue])

  // Group by category
  const groupedSuggestions = useMemo(() => {
    const groups = {}
    filteredSuggestions.forEach((ing) => {
      const category = (typeof ing === 'object' ? ing.category : 'Other') || 'Other'
      if (!groups[category]) groups[category] = []
      groups[category].push(typeof ing === 'string' ? ing : ing.name)
    })
    return groups
  }, [filteredSuggestions])

  // Flat list for keyboard navigation
  const flatList = useMemo(
    () => Object.values(groupedSuggestions).flat(),
    [groupedSuggestions]
  )

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const addTag = (name) => {
    if (!selectedTags.includes(name)) {
      setSelectedTags([...selectedTags, name])
    }
    setInputValue('')
    setHighlightIndex(-1)
    inputRef.current?.focus()
  }

  const removeTag = (name) => {
    setSelectedTags(selectedTags.filter((t) => t !== name))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && inputValue === '' && selectedTags.length > 0) {
      removeTag(selectedTags[selectedTags.length - 1])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIndex((i) => Math.min(i + 1, flatList.length - 1))
      setIsDropdownOpen(true)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && highlightIndex >= 0 && flatList[highlightIndex]) {
      e.preventDefault()
      addTag(flatList[highlightIndex])
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false)
    }
  }

  const handleSmartFilter = () => {
    if (selectedTags.length > 0 && onFilter) {
      onFilter(selectedTags)
    }
  }

  return (
    <div ref={dropdownRef} className="relative w-full" id="fridge-search">
      {/* Search container */}
      <div
        className={`
          flex flex-wrap items-center gap-2 min-h-[56px] px-4 py-2.5 bg-white rounded-3xl
          border-2 transition-all duration-200
          ${isDropdownOpen ? 'border-sage-400 shadow-lg ring-4 ring-sage-100' : 'border-sage-200 shadow-md hover:shadow-lg hover:border-sage-300'}
        `}
      >
        <Search className="h-5 w-5 text-sage-400 shrink-0" strokeWidth={1.75} />

        {/* Selected tags */}
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 bg-sage-100 text-sage-700 text-sm font-medium
                       px-3 py-1 rounded-full animate-fade-in select-none"
          >
            {tag}
            <button
              onClick={(e) => { e.stopPropagation(); removeTag(tag) }}
              className="flex items-center justify-center h-4 w-4 rounded-full hover:bg-sage-200 transition-colors"
              aria-label={`Remove ${tag}`}
            >
              <X className="h-3 w-3 text-sage-500" />
            </button>
          </span>
        ))}

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            setIsDropdownOpen(true)
            setHighlightIndex(-1)
          }}
          onFocus={() => setIsDropdownOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={selectedTags.length === 0 ? 'Type ingredients you have...' : 'Add more...'}
          className="flex-1 min-w-[120px] bg-transparent text-sm text-slate-700 placeholder:text-slate-300
                     outline-none"
          aria-label="Search ingredients"
        />

        {/* Smart Filter Button */}
        <button
          id="smart-filter-btn"
          onClick={handleSmartFilter}
          disabled={selectedTags.length < 1 || isLoading}
          className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
            transition-all duration-200 shrink-0
            ${selectedTags.length >= 1
              ? 'bg-sage-600 text-white hover:bg-sage-700 shadow-sm hover:shadow-md active:scale-95'
              : 'bg-sage-100 text-sage-300 cursor-not-allowed'}
          `}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.75} />
          )}
          Smart Filter
        </button>
      </div>

      {/* Tag count hint */}
      {selectedTags.length > 0 && selectedTags.length < 3 && (
        <p className="text-xs text-slate-400 mt-2 ml-4 animate-fade-in">
          Add {3 - selectedTags.length} more ingredient{3 - selectedTags.length > 1 ? 's' : ''} for best results
        </p>
      )}

      {/* Dropdown suggestions */}
      {isDropdownOpen && Object.keys(groupedSuggestions).length > 0 && (
        <div className="absolute z-40 left-0 right-0 mt-2 bg-white rounded-2xl border border-sage-200 shadow-xl max-h-60 overflow-y-auto animate-scale-in">
          {Object.entries(groupedSuggestions).map(([category, items]) => (
            <div key={category}>
              <div className="sticky top-0 bg-sage-50/90 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-sage-100">
                {category}
              </div>
              {items.map((name, idx) => {
                const globalIdx = flatList.indexOf(name)
                const isHighlighted = globalIdx === highlightIndex
                return (
                  <button
                    key={name}
                    onClick={() => addTag(name)}
                    className={`
                      w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2
                      ${isHighlighted ? 'bg-sage-50 text-sage-700' : 'text-slate-600 hover:bg-sage-50'}
                    `}
                  >
                    <HighlightedName name={name} query={debouncedValue} />
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/** Highlights the matching substring in sage-600 bold */
function HighlightedName({ name, query }) {
  if (!query) return <span>{name}</span>
  const idx = name.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <span>{name}</span>
  return (
    <span>
      {name.slice(0, idx)}
      <span className="font-semibold text-sage-600">{name.slice(idx, idx + query.length)}</span>
      {name.slice(idx + query.length)}
    </span>
  )
}
