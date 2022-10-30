import React from "react"
import Dictionary from "../pages/Dictionary"
import Learn from "../pages/Learn"

import {
  DICTIONARY_ROUTE,
  LEARN_ROUTE,

} from "../utils/consts"

export const routes = [
  {
    path: DICTIONARY_ROUTE,
    element: <Dictionary />,
  },
  {
    path: LEARN_ROUTE,
    element: <Learn />,
  },
  
]
