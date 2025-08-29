import  {create} from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';


interface ILanguageStore {
  language: "uk" | "en";
  setLanguage: (language: "uk" | "en") => void;
}

export const useLanguageStore = create<ILanguageStore>()(
  devtools(
    immer((set) => ({
      language: "uk",
      setLanguage: (language: "uk" | "en") => {
        set((state) => {
          state.language = language;
        });
      },
    }))
  )
);