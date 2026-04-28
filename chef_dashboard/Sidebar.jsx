import { ChefHat, LayoutDashboard, BookOpen, ShoppingCart, Search, CalendarDays, X } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'dashboard',    label: 'Dashboard',      icon: LayoutDashboard },
  { id: 'recipes',      label: 'Recipes',        icon: BookOpen },
  { id: 'fridgeSearch', label: 'Fridge Search',   icon: Search },
  { id: 'mealPlan',     label: 'Meal Plan',       icon: CalendarDays },
  { id: 'shoppingList', label: 'Shopping List',   icon: ShoppingCart },
]

export default function Sidebar({ activeView, onNavigate, isOpen, onToggle }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white border-r border-sage-200
          shadow-lg transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:shadow-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand header */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-sage-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl"
                 style={{ background: 'linear-gradient(135deg, #3A6140 0%, #5C8A5C 50%, #7BA37B 100%)' }}>
              <ChefHat className="h-5 w-5 text-white" strokeWidth={1.75} />
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Chef's
              </h1>
              <p className="text-xs text-sage-500 leading-none -mt-0.5">Dashboard</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-sage-50 hover:text-slate-600 transition-colors lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  onNavigate(item.id)
                  if (window.innerWidth < 1024) onToggle?.()
                }}
                className={`
                  flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium
                  transition-all duration-200 ease-in-out group
                  ${isActive
                    ? 'bg-sage-100 text-sage-700 shadow-sm'
                    : 'text-slate-500 hover:bg-sage-50 hover:text-slate-700'
                  }
                `}
              >
                <Icon
                  className={`h-[18px] w-[18px] transition-colors ${
                    isActive ? 'text-sage-600' : 'text-slate-400 group-hover:text-sage-400'
                  }`}
                  strokeWidth={1.75}
                />
                {item.label}
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sage-500 animate-scale-in" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sage-100 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-200 text-sage-700 text-xs font-semibold"
                 style={{ fontFamily: 'var(--font-heading)' }}>
              CR
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Chef Rohin</p>
              <p className="text-xs text-slate-400">Home Kitchen</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
