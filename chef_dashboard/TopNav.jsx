import { Menu, Bell, Search } from 'lucide-react'

const VIEW_TITLES = {
  dashboard: 'Dashboard',
  recipes: 'Recipes',
  fridgeSearch: "What's in my Fridge?",
  mealPlan: 'Meal Plan',
  shoppingList: 'Shopping List',
}

export default function TopNav({ onMenuToggle, activeView }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-sage-100 bg-white/80 backdrop-blur-md px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-sage-50 hover:text-slate-700 transition-colors lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <h2 className="text-lg font-semibold text-slate-800" style={{ fontFamily: 'var(--font-heading)' }}>
          {VIEW_TITLES[activeView] || 'Dashboard'}
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-sage-50 hover:text-sage-600 transition-colors"
          aria-label="Search"
        >
          <Search className="h-4.5 w-4.5" strokeWidth={1.75} />
        </button>
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-sage-50 hover:text-sage-600 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4.5 w-4.5" strokeWidth={1.75} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger ring-2 ring-white" />
        </button>
      </div>
    </header>
  )
}
