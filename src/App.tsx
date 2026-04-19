import { useState } from 'react'
import QuestionCard from './components/QuestionCard'
import type { UserDetails } from './types/types';
import Registration from './components/Registration';
import { mockQuestion } from './data/questions';

function App() {
  // Logic State
  //const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  //const [gameOver, setGameOver] = useState(true);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [user, setUser] = useState<UserDetails | null>(null);
  const [gameState, setGameState] = useState<'START' | 'QUIZ' | 'END'>('START');

  const startQuiz = (details: UserDetails) => {
    setUser(details);
    //setGameOver(false);
    setScore(0);
    setCurrentQuestion(0);
    setGameState('QUIZ');
  }

  const nextQuestion = () => {
    const nextQ = currentQuestion + 1;
  
    if (nextQ === mockQuestion.length) {
      setGameState('END');
    } else {
      setCurrentQuestion(nextQ);
      setUserAnswer(null); // IMPORTANT: Clear the previous answer!
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (gameState !== 'QUIZ') return;
      // 1. Get the value from the button click
      const selected = e.currentTarget.value;
      
      // 2. Check against the correct answer in our array
      const isCorrect = mockQuestion[currentQuestion].correctAnswer === selected;
      
      // 3. Increment score if correct
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
      
      // 4. Save the answer to state to "lock" the card and show visual feedback
      setUserAnswer(selected);
    }
 

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-black text-white mb-10 tracking-tight">
      <span className="text-blue-500">INFINITE</span> TECH <span className="text-blue-500">QUIZ</span>
      </h1>

      {/* 1. Header with User Details - Only visible during QUIZ */}
      {gameState === 'QUIZ' && user && (
        <div className="w-full max-w-4xl bg-slate-800 p-4 rounded-xl mb-8 flex justify-between items-center border border-slate-700">
          <div className="text-white">
            <p className="text-xs text-slate-400 uppercase font-bold">Candidate</p>
            <p className="font-semibold">{user.name}</p>
          </div>
          <div className="text-white text-right">
            <p className="text-xs text-slate-400 uppercase font-bold">Token ID</p>
            <p className="font-mono text-blue-400">{user.token}</p>
          </div>
        </div>
      )}
      {/* 2. Page Content based on Game State */}
      {gameState === 'START' && (
        <Registration onStart={startQuiz} />
      )}

      {gameState === 'QUIZ' &&(
        <>
          {/* Progress Bar Container */}
          <div className="w-full max-w-md bg-slate-700 h-2 rounded-full mb-6 overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestion + 1) / mockQuestion.length) * 100}%` }}
            />
          </div>

          <p className="text-white mb-4">Score: {score}</p>
          <QuestionCard 
                  questionNr={currentQuestion + 1}
                  totalQuestions={mockQuestion.length}
                  question={mockQuestion[currentQuestion].question}
                  answers={mockQuestion[currentQuestion].answers}
                  userAnswer={userAnswer} // Now passing the real state instead of 'null'
                  callback={checkAnswer}                        
            />

          {/* A "Next" button that only shows if we haven't reached the end */}
            <button 
              className="mt-6 text-blue-400 hover:text-blue-300 font-bold"
              onClick={nextQuestion}
            >
              Next Question →
            </button>
        </>
      )}

      {gameState === 'END' && (
        <div className="text-white text-center">
          <h2 className="text-3xl font-bold">Quiz Complete!</h2>
          <p className="mt-4">Score: {score} / {mockQuestion.length}</p>
          <button onClick={() => setGameState('START')} className="mt-6 bg-blue-500 p-2 rounded">Try Again</button>
        </div>
      )}
    </div>
  )
 };
export default App