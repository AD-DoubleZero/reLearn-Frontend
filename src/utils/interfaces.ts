export interface IUser {
  id: number
  username: string
  lastSelectedLanguage: number | null
  isFullAccess: boolean
  addedCount: number
  repeatCount: number
  updatedAt: string
  createdAt: string
}

export interface ILanguage {
  id: number
  title: string
  createdAt?: string
  updatedAt?: string
}

export interface ICollocation {
  id: number
  body: string
  createdAt: string
  updatedAt: string
  UserId: number
  LanguageId: number
  meaning?: string
  transcription?: string
  examples?: Array<string>
  association?: string
  tags?: Array<number>
  lastRepeat?: string
}

export interface ITag {
  id: number
  title: string
  UserId: number
  createdAt: string
  updatedAt: string
}

export interface ITagCheckbox extends ITag {
  checked: boolean
}

export type TSorting = "DATE_ASC" | "BODY_ASC" | "DATE_DESC" | "BODY_DESC"

export type TTypeOfTraining = "onlyBody" | "onlyMeaning" | "both"

export interface ICluster {
  id: number,
  level: number,
  collocations: number[],
  isReadyForMerge: boolean,
  isSaved: boolean,
  repeatCount: number,
}

export interface IClusterPutOptions extends Omit<ICluster, "id"> {
  repeatedCollocationsId: number[]
  collocationsToRecreateId: number[]
}

export interface ILearnedCollocation extends Pick<ICollocation, "id" | "body" | "meaning" | "transcription" | "association"> {
  // Inverted means that the user will see the meaning instead of the body
  isInverted: boolean
  // Failed means that the user has forgotten this collocation and pressed "Forgot" btn
  isFailed: boolean

  startOfLearning: number
  endOfLearning: number
}