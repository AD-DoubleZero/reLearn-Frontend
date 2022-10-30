import { makeAutoObservable } from "mobx"
import { TTypeOfTraining, ICluster, ILearnedCollocation, ICollocation } from "../utils/interfaces";

function shuffle(...array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

export default class LearnStore {
  constructor(
    private _allowToStart: boolean = false,
    private _gameIsStarted: boolean = false,
    private _typeOfTraining: TTypeOfTraining = "both",
    private _acceptableLevels: number[] = [],
    private _cluster: ICluster | {} = {},
    private _collocations: ICollocation[] = [],

    private _slidersCount: number = 0,
    private _activeIdx: number = 0,

    private _learnedCollocations: ILearnedCollocation[] = [],

    private _removeFailedCollocations: boolean = true,

    private _startOfLearning: number = 0,
    private _endOfLearning: number = 0,

  ) {
    makeAutoObservable(this)
  }
  setAllowToStart(boolean: boolean) {
    this._allowToStart = boolean
  }
  get allowToStart() {
    return this._allowToStart
  }

  setGameIsStarted(boolean: boolean) {
    this._gameIsStarted = boolean
  }
  get gameIsStarted() {
    return this._gameIsStarted
  }

  setTypeOfTraining(type: TTypeOfTraining) {
    this._typeOfTraining = type
  }
  get typeOfTraining() {
    return this._typeOfTraining
  }

  pushAcceptableLevel(item: number) {
    this._acceptableLevels = [...this._acceptableLevels, item]
  }
  removeAcceptableLevel(item: number) {
    this._acceptableLevels = this._acceptableLevels.filter(l => l !== item)
  }
  get acceptableLevels() {
    return this._acceptableLevels
  }

  setCluster(cluster: ICluster) {
    this._cluster = cluster
  }
  changeIsReadyForMerge(boolean: boolean) {
    (this._cluster as ICluster).isReadyForMerge = boolean
  }
  get cluster() {
    return this._cluster
  }

  setCollocations(collocations: ICollocation[]) {
    this._collocations = collocations
  }
  editCollocation(idx: number, changes: {
    meaning?: string,
    association?: string,
    transcription?: string
  }) {
    if (changes.meaning) {
      this._collocations[idx].meaning = changes.meaning
    }

    if (changes.association) {
      this._collocations[idx].association = changes.association
    }

    if (changes.transcription) {
      this._collocations[idx].transcription = changes.transcription
    }
  }
  get collocations() {
    return this._collocations
  }

  setSlidersCount(count: number) {
    this._slidersCount = count
    this._activeIdx = 0
  }
  get slidersCount() {
    return this._slidersCount
  }

  incActiveIdx = () => {
    if (this._activeIdx !== this._slidersCount - 1) {
      this._activeIdx = +this.activeIdx + 1
    }
  }
  decActiveIdx = () => {
    if (this._activeIdx !== 0) {
      this._activeIdx = +this.activeIdx - 1
    }
  }
  get activeIdx() {
    return this._activeIdx
  }

  setLearnedCollocations = (collocations: ICollocation[]) => {
    switch (this._typeOfTraining) {
      case "onlyBody":
        this._learnedCollocations = shuffle(
          ...collocations.map(c => {
            return {
              id: c.id,
              body: c.body,
              meaning: c.meaning as string,
              association: c.association || "",
              transcription: c.transcription || "-",
              isInverted: false,
              isFailed: false,
              startOfLearning: 0,
              endOfLearning: 0,
            }
          })
        )
        break;

      case "onlyMeaning":
        this._learnedCollocations = shuffle(
          ...collocations.map(c => {
            return {
              id: c.id,
              body: c.body,
              meaning: c.meaning as string,
              association: c.association || "",
              transcription: c.transcription || "-",
              isInverted: true,
              isFailed: false,
              startOfLearning: 0,
              endOfLearning: 0,
            }
          })
        )
        break;

      case "both":
        this._learnedCollocations = shuffle(
          ...collocations.map(c => {
            return {
              id: c.id,
              body: c.body,
              meaning: c.meaning as string,
              association: c.association || "",
              transcription: c.transcription || "-",
              isInverted: true,
              isFailed: false,
              startOfLearning: 0,
              endOfLearning: 0,
            }
          }),
          ...collocations.map(c => {
            return {
              id: c.id,
              body: c.body,
              meaning: c.meaning as string,
              association: c.association || "",
              transcription: c.transcription || "-",
              isInverted: false,
              isFailed: false,
              startOfLearning: 0,
              endOfLearning: 0,
            }
          })
        )
        break;

      default:
        break;
    }
  }
  failLearningCollocation = (idx: number) => {
    this._learnedCollocations[idx].isFailed = true
  }
  startLearningCollocation = (idx: number) => {
    this._learnedCollocations[idx].startOfLearning = new Date().valueOf()
  }
  endLearningCollocation = (idx: number) => {
    this._learnedCollocations[idx].endOfLearning = new Date().valueOf()
  }
  reverseIsFailedOfLearningCollocation = (idx: number) => {
    this._learnedCollocations[idx].isFailed = !this._learnedCollocations[idx].isFailed
  }
  get learnedCollocations() {
    return this._learnedCollocations
  }

  setRemoveFailedCollocations(boolean: boolean) {
    this._removeFailedCollocations = boolean
  }
  get removeFailedCollocations() {
    return this._removeFailedCollocations
  }

  startLearning = () => {
    this._startOfLearning = new Date().valueOf()
  }
  get startOfLearning() {
    return this._startOfLearning
  }

  endLearning = () => {
    this._endOfLearning = new Date().valueOf()
  }
  get endOfLearning() {
    return this._endOfLearning
  }

  reset = () => {
    this._allowToStart = false
    this._gameIsStarted = false
    this._typeOfTraining = "both"
    this._acceptableLevels = []
    this._cluster = {}
    this._collocations = []

    this._slidersCount = 0
    this._activeIdx = 0

    this._learnedCollocations = []

    this._removeFailedCollocations = true

    this._startOfLearning = 0
    this._endOfLearning = 0
  }
}