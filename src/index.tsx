import React, { createContext } from "react"
import ReactDOM from "react-dom/client"
import "./css/index.css"
import App from "./App"

import UserStore from "./store/UserStore"
import LanguageStore from "./store/LanguageStore"
import DictionaryStore from "./store/DictionaryStore"
import LearnStore from "./store/LearnStore"
import { BrowserRouter } from "react-router-dom"

export const Context = createContext({
  user: {} as UserStore,
  language: {} as LanguageStore,
  dictionary: {} as DictionaryStore,
  learn: {} as LearnStore,
})

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <BrowserRouter>
    <Context.Provider
      value={{
        user: new UserStore(),
        language: new LanguageStore(),
        dictionary: new DictionaryStore(),
        learn: new LearnStore(),
      }}
    >
      <App />
    </Context.Provider>
  </BrowserRouter>
)