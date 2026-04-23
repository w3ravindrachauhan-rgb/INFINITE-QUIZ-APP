// src/data/questions.ts

import type { Question } from '../types/types';

// Mock data for now (we will fetch from an API in the next step!)
export const mockQuestion: Question[] = 
[
          {
            question: "Which hook is used for side effects in React?",
            answers: ["useState", "useEffect", "useContext", "useReducer"],
            correctAnswer: "useEffect"
          },
          {
            question: "What is the correct command to create a new Vite project?",
            answers: ["npm create vite@latest", "npx create-react-app", "npm install vite", "vite new"],
            correctAnswer: "npm create vite@latest"
          },
          {
            question: "Which of the following is used to pass data to a child component?",
            answers: ["State", "Props", "Hooks", "Refs"],
            correctAnswer: "Props"
          },
          {
          question: "What is the purpose of 'key' prop in React lists?",
          answers: [
            "To style the elements",
            "To help React identify which items have changed, been added, or removed",
            "To link to a database record",
            "To define the index of the element"
          ],
          correctAnswer: "To help React identify which items have changed, been added, or removed"
        },
        {
          question: "Which of the following is used to manage a global state that can be accessed by many components?",
          answers: ["useState", "useMemo", "useContext", "useRef"],
          correctAnswer: "useContext"
        },
        {
          question: "What is the 'Virtual DOM' in React?",
          answers: [
            "A direct copy of the browser's DOM",
            "A lightweight representation of the real DOM in memory",
            "A tool for testing React components",
            "A library for managing CSS"
          ],
          correctAnswer: "A lightweight representation of the real DOM in memory"
        },
        {
          question: "In React, what is the default behavior when a component's state updates?",
          answers: [
            "Only the changed part of the DOM updates",
            "The component and all its children re-render",
            "The entire page refreshes",
            "React throws an error if not handled manually"
          ],
          correctAnswer: "The component and all its children re-render"
        },
        {
          question: "Which hook would you use to persist a value between renders without causing a re-render?",
          answers: ["useState", "useEffect", "useRef", "useCallback"],
          correctAnswer: "useRef"
        },
        {
          question: "What does JSX stand for?",
          answers: [
            "JavaScript XML",
            "JSON Syntax Extension",
            "Java Serialized X-script",
            "JavaScript Xerography"
          ],
          correctAnswer: "JavaScript XML"
        },
        {
          question: "Which function is used to change the state in a functional component using the useState hook?",
          answers: [
            "this.setState()",
            "The second element returned by the useState array",
            "updateState()",
            "The first element returned by the useState array"
          ],
          correctAnswer: "The second element returned by the useState array"
        },
        {
          question: "What is a 'Higher-Order Component' (HOC)?",
          answers: [
            "A component that has many children",
            "A function that takes a component and returns a new component",
            "A component that sits at the top of the app tree",
            "A hook that manages complex logic"
          ],
          correctAnswer: "A function that takes a component and returns a new component"
        },
        {
          question: "How do you handle events in React?",
          answers: [
            "Using lowercase (onclick)",
            "Using camelCase (onClick)",
            "Using kebab-case (on-click)",
            "Using snake_case (on_click)"
          ],
          correctAnswer: "Using camelCase (onClick)"
        },
        {
          question: "Which hook is used to memoize expensive calculations so they don't run on every render?",
          answers: ["useEffect", "useCallback", "useMemo", "useReducer"],
          correctAnswer: "useMemo"
        }
  ];