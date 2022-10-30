import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { Context } from "."
import AppRouter from "./components/AppRouter"
import Spinner from "./components/universal/Spinner"
import UserAPI from "./http/UserAPI"
import telegram from "./utils/telegram"

const App = observer(() => {
  const {user, language} = useContext(Context)
  const [loading, setLoading] = useState(true)

  const { setUser, data } = user

  const { setSelectedLanguageId } = language

  const { ready } = telegram()

  useEffect(() => {
    if (!data) {
      UserAPI.get().then(res => {
        setUser(res)
        res.lastSelectedLanguage && setSelectedLanguageId(res.lastSelectedLanguage)

        ready()
        setLoading(false)
      })
        .catch(err => alert(err))
    }
  }, [data, setUser, ready, setSelectedLanguageId])

  if (loading) {
    return (
      <Spinner />
    )
  }

  return (
    <main className="content">
      <AppRouter />
    </main>
  )
})

export default App