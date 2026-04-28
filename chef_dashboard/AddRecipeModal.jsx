import { useState, useEffect, useRef } from 'react'
import { X, Plus, Trash2, ChefHat, Clock, Users, Loader2, Search, Check } from 'lucide-react'
import { fetchIngredients } from '../services/api.js'

const CUISINES = ['Italian', 'American', 'Asian', 'Thai', 'Mexican', 'Indian', 'French', 'Japanese', 'Other']
const DIFFICULTIES = [
  { value: 'EASY', label: 'Easy', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'MEDIUM', label: 'Medium', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { value: 'HARD', label: 'Hard', color: 'bg-red-100 text-red-700 border-red-200' },
]
const UNITS = ['g', 'kg', 'ml', 'L', 'tsp', 'tbsp', 'cup', 'pcs', 'cloves', 'leaves', 'slices', 'pinch']

const EMPTY_INGREDIENT = { name: '', quantity: '', unit: 'g', isNew: false }

export default function AddRecipeModal({ onClose, onSave }) {
  // ── Recipe fields ──────────────────────────────────
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [cuisine, setCuisine] = useState('Italian')
  const [difficulty, setDifficulty] = useState('EASY')
  const [prepTime, setPrepTime] = useState('')
  const [cookTime, setCookTime] = useState('')
  const [servings, setServings] = useState('')
  const [ingredients, setIngredients] = useState([
    { ...EMPTY_INGREDIENT },
    { ...EMPTY_INGREDIENT },
    { ...EMPTY_INGREDIENT },
  ])

  // ── Autocomplete state ─────────────────────────────
  const [allIngredients, setAllIngredients] = useState([])
  const [activeDropdown, setActiveDropdown] = useState(-1)
  const [dropdownFilter, setDropdownFilter] = useState('')
  const ingredientRefs = useRef([])

  // ── Form state ─────────────────────────────────────
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    fetchIngredients().then(setAllIngredients)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('.ingredient-row')) setActiveDropdown(-1)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // ── Ingredient handlers ────────────────────────────
  const updateIngredient = (index, field, value) => {
    setIngredients((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
    if (field === 'name') {
      setDropdownFilter(value)
      setActiveDropdown(index)
    }
  }

  const selectIngredient = (index, name) => {
    updateIngredient(index, 'name', name)
    setActiveDropdown(-1)
  }

  const addIngredientRow = () => {
    setIngredients((prev) => [...prev, { ...EMPTY_INGREDIENT }])
    // Focus the new row after render
    setTimeout(() => {
      const lastRef = ingredientRefs.current[ingredients.length]
      if (lastRef) lastRef.focus()
    }, 50)
  }

  const removeIngredientRow = (index) => {
    if (ingredients.length <= 1) return
    setIngredients((prev) => prev.filter((_, i) => i !== index))
  }

  // ── Validation ─────────────────────────────────────
  const validate = () => {
    const errs = {}
    if (!title.trim()) errs.title = 'Recipe name is required'
    if (!description.trim()) errs.description = 'Description is required'
    if (!prepTime || Number(prepTime) <= 0) errs.prepTime = 'Required'
    if (!cookTime || Number(cookTime) <= 0) errs.cookTime = 'Required'
    if (!servings || Number(servings) <= 0) errs.servings = 'Required'

    const validIngredients = ingredients.filter((i) => i.name.trim())
    if (validIngredients.length < 1) errs.ingredients = 'Add at least 1 ingredient'
    validIngredients.forEach((ing, idx) => {
      if (!ing.quantity || Number(ing.quantity) <= 0) {
        errs[`ing_qty_${idx}`] = 'Qty required'
      }
    })

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  // ── Submit ─────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSaving(true)
    const recipeData = {
      title: title.trim(),
      description: description.trim(),
      cuisine,
      difficulty,
      prepTimeMinutes: Number(prepTime),
      cookTimeMinutes: Number(cookTime),
      totalTimeMinutes: Number(prepTime) + Number(cookTime),
      servings: Number(servings),
      ingredients: ingredients
        .filter((i) => i.name.trim())
        .map((i) => ({
          name: i.name.trim(),
          quantity: String(i.quantity),
          unit: i.unit,
        })),
    }

    try {
      await onSave(recipeData)
      onClose()
    } catch (err) {
      setErrors({ submit: 'Failed to save recipe. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  // Filtered suggestions for active dropdown
  const getFilteredSuggestions = (index) => {
    const current = ingredients[index]?.name?.toLowerCase() || ''
    const usedNames = new Set(ingredients.map((i) => i.name.toLowerCase()).filter(Boolean))
    return allIngredients
      .filter((ing) => {
        const name = typeof ing === 'string' ? ing : ing.name
        return (
          name.toLowerCase().includes(current) &&
          !usedNames.has(name.toLowerCase())
        )
      })
      .slice(0, 8)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[5vh] overflow-y-auto" onClick={onClose}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl animate-scale-in mb-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-sage-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: 'linear-gradient(135deg, #3A6140 0%, #5C8A5C 50%, #7BA37B 100%)' }}>
              <ChefHat className="h-5 w-5 text-white" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: 'var(--font-heading)' }}>
                Add New Recipe
              </h2>
              <p className="text-xs text-slate-400">Fill in the details and add ingredients</p>
            </div>
          </div>
          <button onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-50 text-slate-400 hover:bg-sage-100 hover:text-slate-600 transition-colors"
            aria-label="Close">
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Error banner */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 animate-fade-in">
              {errors.submit}
            </div>
          )}

          {/* ── Recipe Name ─────────────────────────── */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="recipe-title">
              Recipe Name *
            </label>
            <input
              id="recipe-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Classic Tomato Pasta"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-700 placeholder:text-slate-300
                         focus:outline-none focus:ring-4 transition-all duration-200
                         ${errors.title
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                  : 'border-sage-200 focus:border-sage-400 focus:ring-sage-100'}`}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          {/* ── Description ─────────────────────────── */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="recipe-desc">
              Description *
            </label>
            <textarea
              id="recipe-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief description of your recipe..."
              rows={2}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-700 placeholder:text-slate-300
                         focus:outline-none focus:ring-4 transition-all duration-200 resize-none
                         ${errors.description
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                  : 'border-sage-200 focus:border-sage-400 focus:ring-sage-100'}`}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>

          {/* ── Cuisine + Difficulty Row ─────────────── */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Cuisine</label>
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-sage-200 text-sm text-slate-700 bg-white
                           focus:outline-none focus:border-sage-400 focus:ring-4 focus:ring-sage-100 transition-all"
              >
                {CUISINES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Difficulty</label>
              <div className="flex gap-2">
                {DIFFICULTIES.map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => setDifficulty(d.value)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all duration-200
                      ${difficulty === d.value
                        ? `${d.color} border shadow-sm`
                        : 'bg-white text-slate-400 border-sage-200 hover:bg-sage-50'}`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Timing + Servings Row ────────────────── */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                <Clock className="inline h-3.5 w-3.5 mr-1 -mt-0.5 text-sage-500" />
                Prep (min) *
              </label>
              <input
                type="number" min="1" value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                placeholder="15"
                className={`w-full px-3 py-2.5 rounded-xl border text-sm text-slate-700 placeholder:text-slate-300
                           focus:outline-none focus:ring-4 transition-all
                           ${errors.prepTime ? 'border-red-300 focus:ring-red-100' : 'border-sage-200 focus:ring-sage-100'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                <Clock className="inline h-3.5 w-3.5 mr-1 -mt-0.5 text-sage-500" />
                Cook (min) *
              </label>
              <input
                type="number" min="1" value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                placeholder="30"
                className={`w-full px-3 py-2.5 rounded-xl border text-sm text-slate-700 placeholder:text-slate-300
                           focus:outline-none focus:ring-4 transition-all
                           ${errors.cookTime ? 'border-red-300 focus:ring-red-100' : 'border-sage-200 focus:ring-sage-100'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                <Users className="inline h-3.5 w-3.5 mr-1 -mt-0.5 text-sage-500" />
                Servings *
              </label>
              <input
                type="number" min="1" value={servings}
                onChange={(e) => setServings(e.target.value)}
                placeholder="4"
                className={`w-full px-3 py-2.5 rounded-xl border text-sm text-slate-700 placeholder:text-slate-300
                           focus:outline-none focus:ring-4 transition-all
                           ${errors.servings ? 'border-red-300 focus:ring-red-100' : 'border-sage-200 focus:ring-sage-100'}`}
              />
            </div>
          </div>

          {/* ── Ingredients Section ───────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700">
                Ingredients *
              </label>
              <span className="text-xs text-slate-400">
                {ingredients.filter((i) => i.name.trim()).length} added
              </span>
            </div>
            {errors.ingredients && <p className="text-xs text-red-500 mb-2">{errors.ingredients}</p>}

            {/* Column headers */}
            <div className="grid grid-cols-[1fr_80px_90px_32px] gap-2 mb-1.5 px-1">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Name</span>
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Qty</span>
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Unit</span>
              <span />
            </div>

            {/* Ingredient rows */}
            <div className="space-y-2">
              {ingredients.map((ing, idx) => {
                const suggestions = activeDropdown === idx ? getFilteredSuggestions(idx) : []
                return (
                  <div key={idx} className="ingredient-row relative grid grid-cols-[1fr_80px_90px_32px] gap-2 animate-fade-in">
                    {/* Name with autocomplete */}
                    <div className="relative">
                      <input
                        ref={(el) => (ingredientRefs.current[idx] = el)}
                        type="text"
                        value={ing.name}
                        onChange={(e) => updateIngredient(idx, 'name', e.target.value)}
                        onFocus={() => { setActiveDropdown(idx); setDropdownFilter(ing.name) }}
                        placeholder="Search ingredient..."
                        className="w-full px-3 py-2 rounded-lg border border-sage-200 text-sm text-slate-700
                                   placeholder:text-slate-300 focus:outline-none focus:border-sage-400 focus:ring-3 focus:ring-sage-100
                                   transition-all"
                      />
                      {/* Autocomplete dropdown */}
                      {activeDropdown === idx && suggestions.length > 0 && (
                        <div className="absolute z-30 left-0 right-0 top-full mt-1 bg-white rounded-xl border border-sage-200
                                        shadow-lg max-h-40 overflow-y-auto animate-scale-in">
                          {suggestions.map((s) => {
                            const name = typeof s === 'string' ? s : s.name
                            const cat = typeof s === 'object' ? s.category : ''
                            return (
                              <button
                                key={name}
                                type="button"
                                onClick={() => selectIngredient(idx, name)}
                                className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-sage-50
                                           flex items-center justify-between transition-colors"
                              >
                                <span>{name}</span>
                                {cat && <span className="text-[10px] text-slate-300">{cat}</span>}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>

                    {/* Quantity */}
                    <input
                      type="number" min="0" step="0.1"
                      value={ing.quantity}
                      onChange={(e) => updateIngredient(idx, 'quantity', e.target.value)}
                      placeholder="500"
                      className={`px-2 py-2 rounded-lg border text-sm text-slate-700 text-center placeholder:text-slate-300
                                 focus:outline-none focus:ring-3 transition-all
                                 ${errors[`ing_qty_${idx}`] ? 'border-red-300 focus:ring-red-100' : 'border-sage-200 focus:ring-sage-100'}`}
                      style={{ fontFamily: 'var(--font-mono)' }}
                    />

                    {/* Unit */}
                    <select
                      value={ing.unit}
                      onChange={(e) => updateIngredient(idx, 'unit', e.target.value)}
                      className="px-2 py-2 rounded-lg border border-sage-200 text-sm text-slate-700 bg-white
                                 focus:outline-none focus:border-sage-400 focus:ring-3 focus:ring-sage-100 transition-all"
                    >
                      {UNITS.map((u) => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeIngredientRow(idx)}
                      disabled={ingredients.length <= 1}
                      className={`flex items-center justify-center rounded-lg transition-colors
                        ${ingredients.length <= 1
                          ? 'text-sage-200 cursor-not-allowed'
                          : 'text-slate-300 hover:bg-red-50 hover:text-red-500'}`}
                      aria-label="Remove ingredient"
                    >
                      <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Add ingredient button */}
            <button
              type="button"
              onClick={addIngredientRow}
              className="mt-3 flex items-center gap-2 text-sm font-medium text-sage-600 hover:text-sage-700
                         px-3 py-2 rounded-xl hover:bg-sage-50 transition-colors w-full justify-center
                         border border-dashed border-sage-200 hover:border-sage-300"
            >
              <Plus className="h-4 w-4" strokeWidth={2} />
              Add Ingredient
            </button>
          </div>

          {/* ── Actions ──────────────────────────────── */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-sage-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-sage-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold
                         bg-sage-600 text-white hover:bg-sage-700 shadow-sm hover:shadow-md
                         transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" strokeWidth={2} />
              )}
              {saving ? 'Saving...' : 'Save Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
