"use client"

import Game from "@/components/Game"
import Introduction from "@/components/Introduction"
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