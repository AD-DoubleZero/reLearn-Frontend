import { makeAutoObservable } from "mobx"
import { IUser } from "../utils/interfaces"


export default class UserStore {
  constructor(
    private _data: IUser | undefined = undefined
  ) {
    makeAutoObservable(this)
  }
  setUser(user: IUser) {
    this._data = user
  }
  get data() {
    if (!this._data) {
      alert("authentication error")
      throw new Error()
    }
    return this._data as IUser
  }
}