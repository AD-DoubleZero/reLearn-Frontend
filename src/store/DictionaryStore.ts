import { makeAutoObservable } from "mobx"
import { TSorting, ICollocation, ITag, ITagCheckbox } from "../utils/interfaces"

export default class DictionaryStore {
  constructor(
    private _page: number = 1,
    private _count: number = 0,

    private _isProcessed: boolean = false,
    private _isReady: boolean = false,
    private _isPropsHaveBeenChanged: boolean = false,
    private _input: string = "",
    private _sorting: TSorting = "BODY_ASC",
    private _result: ICollocation[] = [],
    private _tags: ITagCheckbox[] = [],
  ) {
    makeAutoObservable(this)
  }

  setPage(page: number) {
    this._page = page
  }
  get page() {
    return this._page
  }

  setCount(count: number) {
    this._count = count
  }
  get count() {
    return this._count
  }

  setIsProcessed(boolean: boolean) {
    this._isProcessed = boolean
  }
  get isProcessed() {
    return this._isProcessed
  }

  setIsReady(boolean: boolean) {
    this._isReady = boolean
  }
  get isReady() {
    return this._isReady
  }

  setIsPropsHaveBeenChanged(boolean: boolean) {
    this._isPropsHaveBeenChanged = boolean
  }
  get isPropsHaveBeenChanged() {
    return this._isPropsHaveBeenChanged
  }

  setInput(string: string) {
    this._input = string
  }
  get input() {
    return this._input
  }

  setSorting(string: TSorting) {
    this._sorting = string
  }
  get sorting() {
    return this._sorting
  }

  setResult(array: ICollocation[]) {
    this._result = array
  }
  editCollocation(id: number, changes: {
    meaning?: string
    transcription?: string
    association?: string
    tags?: number[]
    lastRepeat?: string
  }) {
    const idx = this._result.findIndex(c => c.id === id)
    this._result[idx] = {...this._result[idx], ...changes}
  }
  get result() {
    return this._result
  }

  setTags(array: ITag[]) {
    const tagCheckBoxes: ITagCheckbox[] = array.map(t => {return {...t, checked: true}})
    this._tags = tagCheckBoxes
  }
  get tags() {
    return this._tags
  }
  changeTagChecked(id: number, checked: boolean) {
    const index = this._tags.findIndex(t => t.id === id)
    this._tags[index].checked = checked
  }
  removeTag(id: number) {
    this._tags = this._tags.filter(t => t.id !== id)
  }
}