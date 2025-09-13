import { PaletteIcon } from 'lucide-react'
import React from 'react'
import { THEMES} from "../constants"
import { useThemeStore } from '../store/useThemeStore'

export default function ThemeSelector() {
    const {theme, setTheme} = useThemeStore()
    console.log("Current theme:", theme)
    return (
    <div className='dropdown dropdown-end'>
      {/* Dropdown Trigger */}
      <button tabIndex={0} className='btn btn-ghost btn-circle'>
        <PaletteIcon className='size-5'/>
      </button>

      <div tabIndex={0} className='dropdown-content menu p-2 shadow-2xl bg-base-200 
      backdrop-blur-lg rounded-2xl w-56 mt-4 border border-base-content/10 z-50' >
        <span className='font-bold text-lg mb-2'>Select Theme</span>
        {THEMES.map(themeOption => (
            <button key={themeOption.name} className={`w-full px-4 py-2 rounded-xl flex items-center gap-3 transition-colors
            ${themeOption.name === theme ? "bg-primary/20 text-primary border border-primary" : "hover:bg-primary/10"}
            `} onClick={() => setTheme(themeOption.name)}>
                <PaletteIcon className={`size-5 ${themeOption.name === theme ? "text-primary" : "text-base-content"}`}/>
                <span className='text-sm font-medium'>{themeOption.label}</span>
                    {/*Theme Preview Colors */}
                    <div className='ml-auto flex gap-1'>
                        {themeOption.colors.map((color, index) => (
                            <span key={index} className={`size-2 rounded-full`} style={{backgroundColor: color}}></span>
                        ))}
                    </div>
            </button>
        ))}
        </div>
    </div>
  )
}
