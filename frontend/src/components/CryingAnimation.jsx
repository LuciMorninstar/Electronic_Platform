import React from 'react'
import Lottie from "lottie-react";
import cryingAnimationData from "../assets/Crying emoji.json"

const CryingAnimation = () => {
  return (
      <div className="w-64 h-64">
      <Lottie animationData={cryingAnimationData} loop={true} />
    </div>
  )
}

export default CryingAnimation