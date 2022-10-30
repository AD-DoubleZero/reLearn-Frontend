import { makeAutoObservable } from "mobx"
import { ILanguage } from "../utils/interfaces"

export default class CollocationStore {
  constructor(
    private _languages: ILanguage[] = [],
    private _selectedLanguageId: number = 1,
  ) {
    makeAutoObservable(this)
  }
  setLanguages(array: ILanguage[]) {
    this._languages = array
  }
  get languages() {
    return this._languages
  }

  setSelectedLanguageId(number: number) {
    this._selectedLanguageId = number
  }
  get selectedLanguageId() {
    return this._selectedLanguageId
  }
}