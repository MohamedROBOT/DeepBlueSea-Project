import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import gamesharkpng from "../../assets/images/sharkgame/gameshark.png";
export default function StudentMode() {
  return (
    <div className="h-screen flex flex-col items-center   text-white px-4">
             <Button
          as={Link}
          to="/"
          className="self-start mb-7 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl py-3 transition-all duration-300"
        >
          Go to Dashboard
        </Button>
      {/* Card Container */}
      <div className="bg-slate-800 shadow-2xl rounded-2xl p-8 max-w-md w-full text-center border border-slate-700">
        
        {/* Title */}
        <h1 className="text-3xl font-extrabold mb-4 text-teal-400">
          Student Mode
        </h1>
        <p className="text-slate-300 mb-6">
          You are currently in <span className="font-semibold">Student Mode</span>.  
          Learn about sharks and test your knowledge with interactive quizzes!
        </p>

        {/* Image */}
        <img
          className="w-48 mx-auto mb-6 drop-shadow-lg animate-bounce"
          src={gamesharkpng}
          alt="gameshark"
        />

        {/* Action Button */}
        <Button
          as={Link}
          to="studentmode/sharkquiz"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl py-3 transition-all duration-300"
        >
          🦈 Take the Shark Quiz
        </Button>
      </div>
    </div>
  );
}
