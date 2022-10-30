import { observer } from "mobx-react-lite"
import React from "react"
import { Routes, Route, Navigate, } from "react-router-dom"
import { routes } from "../routes/routes"
import { ADDRESS_TG_BOT } from "../utils/consts"

const AppRouter = observer(() => {
  return (
    <Routes>
      {
        routes.map((route) => (
          <Route key={route.path} {...route} />
        ))
      }

      <Route path="*" element={<Navigate to={ADDRESS_TG_BOT} />} />
    </Routes>
  )
})

export default AppRouter