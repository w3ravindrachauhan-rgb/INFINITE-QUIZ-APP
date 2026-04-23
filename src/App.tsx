import { useEffect, useState} from 'react'
import QuestionCard from './components/QuestionCard'
import type { UserDetails, Question } from './types/types';
import Registration from './components/Registration';
import { mockQuestion } from './data/questions';

function App() {
  // Logic State
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(
    Array(questions.length).fill(null)
  );
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [user, setUser] = useState<UserDetails | null>(null);
  const [gameState, setGameState] = useState<'START' | 'QUIZ' | 'END'>('START');
  //const videoRef = useRef<HTMLVideoElement>(null);
  //const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Questions/React`);
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data: Question[] = await response.json();
        setQuestions(data);
        setSelectedAnswers(Array(data.length).fill(null));
      } catch (error) {
        console.error('Error fetching questions:', error);
        // Fallback to mock data
        setQuestions(mockQuestion);
        setSelectedAnswers(Array(mockQuestion.length).fill(null));
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const startQuiz = (details: UserDetails) => {
    setUser(details);
    //setGameOver(false);
    setSelectedAnswers(Array(questions.length).fill(null));
    setSecondsLeft(300);
    setCurrentQuestion(0);
    setGameState('QUIZ');
  }

  const previousQuestion = () => {
    const prevQ = currentQuestion - 1;
  
    if (prevQ < 0) {
      setGameState('END');
    } else {
      setCurrentQuestion(prevQ);
    }
  };

  const nextQuestion = () => {
    const nextQ = currentQuestion + 1;
  
    if (nextQ === questions.length) {
      setGameState('END');
    } else {
      setCurrentQuestion(nextQ);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (gameState !== 'QUIZ') return;
    const selected = e.currentTarget.value;
    setSelectedAnswers((prev) => {
      const next = [...prev];
      next[currentQuestion] = selected;
      return next;
    });
  };

  useEffect(() => {
    if (gameState !== 'QUIZ') return;

    const timerId = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setGameState('END');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'QUIZ') return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setGameState('END');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [gameState]);

  // useEffect(() => {
  //   if (gameState !== 'QUIZ') {
  //     if (streamRef.current) {
  //       streamRef.current.getTracks().forEach(track => track.stop());
  //       streamRef.current = null;
  //     }
  //     return;
  //   }

  //   const startWebcam = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  //       streamRef.current = stream;
  //       if (videoRef.current) {
  //         videoRef.current.srcObject = stream;
  //       }
  //     } catch (error) {
  //       console.error('Error accessing webcam:', error);
  //       alert('Unable to access webcam. Please ensure you have granted camera permissions.');
  //     }
  //   };

  //   startWebcam();

  //   return () => {
  //     if (streamRef.current) {
  //       streamRef.current.getTracks().forEach(track => track.stop());
  //       streamRef.current = null;
  //     }
  //   };
  // }, [gameState]);

  const score = selectedAnswers.reduce(
    (acc, answer, idx) =>
      answer === questions[idx].correctAnswer ? acc + 1 : acc,
    0
  );

  const attempted = selectedAnswers.filter(answer => answer !== null).length;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-black text-white mb-10 tracking-tight">
        <span className="text-blue-500">INFINITE</span> TECH <span className="text-blue-500">QUIZ</span>
      </h1>

      {loading ? (
        <div className="text-white text-center">
          <p>Loading questions...</p>
        </div>
      ) : (
        <>
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

          {/* Webcam Feed - Only visible during QUIZ */}
          {/* {gameState === 'QUIZ' && (
            <div className="mb-6 rounded-xl overflow-hidden border-2 border-blue-500">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-64 h-48 bg-black"
              />
            </div>
          )} */}

          {/* 2. Page Content based on Game State */}
          {gameState === 'START' && <Registration onStart={startQuiz} />}

          {gameState === 'QUIZ' && (
            <>
              {/* Progress Bar Container */}
              <div className="w-full max-w-md bg-slate-700 h-2 rounded-full mb-6 overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-end mb-4 w-full max-w-md text-white">
            {/*<p>Score: {score}</p>*/}
            <p className="font-mono text-blue-300">
              Time left: {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
            </p>
          </div>
          <QuestionCard
            questionNr={currentQuestion + 1}
            totalQuestions={questions.length}
            question={questions[currentQuestion].question}
            answers={questions[currentQuestion].answers}
            userAnswer={selectedAnswers[currentQuestion]}
            callback={checkAnswer}
          />

          {/* Navigation buttons */}
          <div className="flex mt-6">
            {currentQuestion > 0 && (
              <button
                className="text-blue-400 hover:text-blue-300 font-bold"
                onClick={previousQuestion}
              >
                ← Previous Question
              </button>
            )}
            <button
              className="text-blue-400 hover:text-blue-300 font-bold ml-4"
              onClick={nextQuestion}
            >
              Next Question →
            </button>
          </div>
        </>
      )}

      {gameState === 'END' && (
        <div className="text-white text-center">
          <h2 className="text-3xl font-bold">Quiz Complete!</h2>
          <p className="mt-4">Score: {score} / {attempted}</p>
          <button onClick={() => setGameState('START')} className="mt-6 bg-blue-500 p-2 rounded">
            Try Again
          </button>
        </div>
      )}
        </>
      )}
    </div>
  )
}

export default App