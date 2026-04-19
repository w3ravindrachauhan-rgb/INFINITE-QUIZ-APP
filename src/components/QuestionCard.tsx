import React from 'react';

// This interface tells TypeScript exactly what "props" this component needs
interface Props {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: string | null;
  questionNr: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full animate-in fade-in zoom-in duration-300">
    <p className="text-sm font-bold text-blue-500 mb-2">
      Question: {questionNr} / {totalQuestions}
    </p>
    
    {/* We use dangerouslySetInnerHTML because many Quiz APIs return encoded HTML characters */}
    <h3 className="text-xl font-semibold text-slate-800 mb-6" 
        dangerouslySetInnerHTML={{ __html: question }} />

    <div className="space-y-3">
      {answers.map((answer) => (
        <button
          key={answer}
          value={answer}
          onClick={callback}
          className={`w-full p-3 text-left rounded-lg border-2 transition-all
            ${userAnswer === answer ? 'border-blue-600 bg-blue-100' : 'border-slate-200 hover:border-blue-400 hover:bg-blue-50'}
          `}
        >
          <span dangerouslySetInnerHTML={{ __html: answer }} />
        </button>
      ))}
    </div>
  </div>
);

export default QuestionCard;