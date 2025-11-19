"use client"

import Game from "@/components/pages/furto-no-museu/Game"
import Introduction from "@/components/pages/Home"
import { useState } from "react"


export default function Page() {

  const [introductionScreen, setIntroductionScreen] = useState(true)
  const [hardMode, setHardMode] = useState(false)

  function onSubmit(hardModeChosen:boolean) {
    setHardMode(hardModeChosen)
    setIntroductionScreen(false)
  }

  return (
    <div className="w-screen flex flex-col items-center justify-center bg-transparent">

      {!introductionScreen && (
        <Game hardMode={hardMode}></Game>
      )}

      {introductionScreen && (
        <Introduction onSubmit={onSubmit}></Introduction>
      )}


    </div>
  )
}