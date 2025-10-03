import { Button } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sharkgifgame from "../../assets/images/sharkgame/sharkgif.gif"
const questions = [
  { q: "What do sharks primarily eat?", answers: ["Fish","Chocolate","Pizza","Bread"], correct: 0 },
  { q: "How many shark species exist worldwide?", answers: ["About 50","Over 500","Around 120","Less than 10"], correct: 1 },
  { q: "What is the largest shark species?", answers: ["Great White Shark","Whale Shark","Tiger Shark","Hammerhead Shark"], correct: 1 },
  { q: "Which sense is strongest in sharks?", answers: ["Smell","Sight","Hearing","Taste"], correct: 0 },
  { q: "Sharks are what type of animal?", answers: ["Mammals","Fish","Reptiles","Amphibians"], correct: 1 },
  { q: "What is a baby shark called?", answers: ["Pup","Cub","Fry","Chick"], correct: 0 },
  { q: "Which shark is known for its hammer-shaped head?", answers: ["Great White","Hammerhead","Tiger Shark","Whale Shark"], correct: 1 },
  { q: "How long can some sharks live?", answers: ["20 years","50 years","100+ years","5 years"], correct: 2 },
  { q: "Which ocean has the most sharks?", answers: ["Atlantic","Pacific","Indian","Arctic"], correct: 1 },
  { q: "Sharks' skeletons are made of?", answers: ["Bone","Cartilage","Metal","Wood"], correct: 1 },
  { q: "Do sharks have eyelids?", answers: ["Yes","No"], correct: 0 },
  { q: "What organ helps sharks detect electricity?", answers: ["Ampullae of Lorenzini","Fins","Liver","Stomach"], correct: 0 },
  { q: "Which shark is the fastest swimmer?", answers: ["Mako Shark","Great White","Tiger Shark","Whale Shark"], correct: 0 },
  { q: "How many rows of teeth can sharks have?", answers: ["1","2","Up to 15","None"], correct: 2 },
  { q: "Which shark can live in both salt and freshwater?", answers: ["Bull Shark","Hammerhead","Great White","Nurse Shark"], correct: 0 },
  { q: "What do whale sharks eat?", answers: ["Plankton","Seals","Dolphins","Squid"], correct: 0 },
  { q: "Which shark is called the 'garbage can of the sea'?", answers: ["Tiger Shark","Bull Shark","Hammerhead","Blue Shark"], correct: 0 },
  { q: "What is the smallest shark species?", answers: ["Dwarf Lanternshark","Dogfish","Bamboo Shark","Goblin Shark"], correct: 0 },
  { q: "How often can sharks replace lost teeth?", answers: ["Every few weeks","Once a year","Never","Every 10 years"], correct: 0 },
  { q: "What type of shark was featured in the movie Jaws?", answers: ["Great White Shark","Hammerhead","Bull Shark","Whale Shark"], correct: 0 },
  { q: "Do sharks lay eggs?", answers: ["Some do","All do","None do","Only Whale Sharks do"], correct: 0 },
  { q: "Which shark is known as the most aggressive towards humans?", answers: ["Bull Shark","Great White","Tiger Shark","Mako Shark"], correct: 0 },
  { q: "What helps sharks stay buoyant?", answers: ["Large oily liver","Swim bladder","Air pockets","Hollow bones"], correct: 0 },
  { q: "Which shark has a long saw-like snout?", answers: ["Sawshark","Goblin Shark","Hammerhead","Nurse Shark"], correct: 0 },
  { q: "What is the rare deep-sea shark with a long protruding nose?", answers: ["Goblin Shark","Mako Shark","Dogfish","Frilled Shark"], correct: 0 },
];

function SharkQuiz() {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showEnd, setShowEnd] = useState(false);
  const [selected, setSelected] = useState(null);
  const [bubble, setBubble] = useState("");

  const maxScore = shuffledQuestions.length * 10;

  useEffect(() => {
    restartGame();
  }, []);

  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  const restartGame = () => {
    const selectedQuestions = shuffle([...questions]).slice(0, 10);
    setShuffledQuestions(selectedQuestions);
    setCurrent(0);
    setScore(0);
    setShowEnd(false);
    setSelected(null);
    setBubble("");
  };

  const handleAnswer = (index) => {
    const q = shuffledQuestions[current];
    setSelected(index);

    if (index === q.correct) {
      setScore((prev) => prev + 10);
      setBubble("✔️ Correct!");
    } else {
      setScore((prev) => (prev - 10 < 0 ? 0 : prev - 10));
      setBubble(`❌ Wrong! Correct: ${q.answers[q.correct]}`);
    }

    setTimeout(() => {
      setBubble("");
      setSelected(null);
      if (current + 1 >= shuffledQuestions.length) {
        setShowEnd(true);
      } else {
        setCurrent((prev) => prev + 1);
      }
    }, 1800);
  };

  const percent = (score / maxScore) * 100;
  const ticks = Array.from({ length: maxScore / 10 + 1 }, (_, i) => i * 10);

  return (
    <div className="relative flex flex-col p-4 items-center justify-start min-h-screen text-white bg-slate-900 overflow-hidden px-4 sm:px-6 lg:px-8">
      <Button
                as={Link}
                to="/studentmode"
                className="self-start bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl py-3 transition-all duration-300"
              >
                Go back to student home page
              </Button>
      <style>
        {`
          .bubble-pop {
            animation: pop 0.5s ease-out;
          }
          @keyframes pop {
            0% { transform: scale(0.5) translateY(10px); opacity: 0; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
          }
        `}
      </style>

      {/* Quiz Container */}
      <div className="w-full max-w-lg md:max-w-2xl p-6 text-center relative z-10">
        {!showEnd ? (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Shark Quiz 🦈</h1>
            <p className="text-lg sm:text-xl mb-6">{shuffledQuestions[current]?.q}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {shuffledQuestions[current]?.answers.map((ans, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={`p-4 rounded-lg border-2 transition text-sm sm:text-base
                    ${
                      selected !== null
                        ? i === shuffledQuestions[current].correct
                          ? "bg-green-500 border-green-700 text-black"
                          : i === selected
                          ? "bg-red-500 border-red-700 text-black"
                          : "bg-slate-800 border-slate-600"
                        : "bg-slate-900 border-cyan-400 hover:bg-cyan-400 hover:text-black"
                    }`}
                  disabled={selected !== null}
                >
                  {ans}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Game Over 🎉</h1>
            <p className="text-lg sm:text-2xl mb-6">
              Your final score: {score} / {maxScore}
            </p>
            <button
              onClick={restartGame}
              className="bg-cyan-400 text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-cyan-300"
            >
              Play Again
            </button>
          </>
        )}
      </div>

      {/* Progress Bar + Shark */}
      <div className="absolute bottom-24 w-full max-w-4xl px-2 z-10">
        <div className="relative h-14 sm:h-16 bg-white/20 border-2 border-cyan-400 rounded-xl overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-700 ease-out"
            style={{ width: `${percent}%` }}
          ></div>

          <img
            src={sharkgifgame}
            alt="shark"
            className="absolute  top-0 h-14 sm:h-16 transition-all duration-700 ease-out"
            style={{ left: `${percent}%`, transform: "translateX(-50%)" }}
          />

          {bubble && (
            <div
              className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 bg-white text-black text-xs sm:text-sm px-3 py-2 rounded-lg shadow bubble-pop"
              style={{ transform: `translateX(${percent - 50}%)` }}
            >
              {bubble}
            </div>
          )}

          <div className="absolute inset-0 flex justify-between items-center px-2 text-[10px] sm:text-xs font-bold">
            {ticks.map((t, i) => (
              <span key={i} className="text-white drop-shadow">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SharkQuiz;
