'use client';

import React, { useState, useEffect } from 'react';
import data from '../public/data.json';

interface Question {
  Question: string;
  Example: string;
  'Study Description': string;
  Methodology1: string;
  Methodology2: string;
  Results1: string;
  Results2: string;
  'Level of Explanation': string;
}

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [reasoning, setReasoning] = useState<string>('');
  const questions: Question[] = data;

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setReasoning('');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setReasoning('');
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    // Delay scroll to allow DOM to update with reasoning box
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const isCorrectAnswer = (answer: string) => {
    return answer === currentQuestion['Level of Explanation'];
  };

  const getBackgroundColor = (answer: string) => {
    if (selectedAnswer === answer) {
      return isCorrectAnswer(answer) ? '#e6ffe6' : '#ffe6e6';
    }
    return '#f9f9f9';
  };

  if (questions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        No questions available.
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div style={{ padding: '20px', width: '80%', margin: '0 auto', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        {currentQuestion.Example}
      </h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>Study Description</h2>
        <div style={{ display: 'flex', border: '1px solid #ccc', padding: '10px', backgroundColor: 'white' }}>
          <p style={{ textAlign: 'left', lineHeight: '1.6', margin: '0', flex: '1', width: '100%', textWrap: 'wrap' }}>{currentQuestion['Study Description']}</p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Methodology</h2>
        <div style={{ display: 'flex', border: '1px solid #ccc', padding: '10px', flexDirection: 'column', backgroundColor: 'white' }}>
          <p style={{ textAlign: 'left', lineHeight: '1.6', margin: '0 0 10px 0', flex: '1', width: '100%', textWrap: 'wrap' }}>{currentQuestion.Methodology1}</p>
          <p style={{ textAlign: 'left', lineHeight: '1.6', margin: '0', flex: '1', width: '100%', textWrap: 'wrap' }}>{currentQuestion.Methodology2}</p>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Results</h2>
        <div style={{ display: 'flex', border: '1px solid #ccc', padding: '10px', flexDirection: 'column', backgroundColor: 'white' }}>
          <p style={{ textAlign: 'left', lineHeight: '1.6', margin: '0 0 10px 0', flex: '1', width: '100%', textWrap: 'wrap' }}>{currentQuestion.Results1}</p>
          <p style={{ textAlign: 'left', lineHeight: '1.6', margin: '0', flex: '1', width: '100%', textWrap: 'wrap' }}>{currentQuestion.Results2}</p>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', border: '1px solid #ccc', padding: '15px', flexDirection: 'column', backgroundColor: 'white' }}>
          <h3 style={{ margin: '0 0 15px 0', textAlign: 'center' }}>Select the level of explanation that best describes this study:</h3>
          
          <div 
            style={{ 
              display: 'flex', 
              border: '1px solid #ddd', 
              padding: '10px', 
              marginBottom: '10px', 
              cursor: 'pointer',
              backgroundColor: getBackgroundColor('Correlational'),
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (selectedAnswer !== 'Correlational') {
                e.currentTarget.style.backgroundColor = '#e0e0e0';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedAnswer !== 'Correlational') {
                e.currentTarget.style.backgroundColor = getBackgroundColor('Correlational');
              }
            }}
            onClick={() => handleAnswerSelect('Correlational')}
          >
            <p style={{ textAlign: 'left', lineHeight: '1.6', margin: '0', flex: '1', width: '100%', textWrap: 'wrap' }}>
              <strong>Correlational</strong> - The study shows a statistical association between two variables but cannot establish causation or prediction.
            </p>
          </div>

          <div 
            style={{ 
              display: 'flex', 
              border: '1px solid #ddd', 
              padding: '10px', 
              marginBottom: '10px', 
              cursor: 'pointer',
              backgroundColor: getBackgroundColor('Predictive'),
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (selectedAnswer !== 'Predictive') {
                e.currentTarget.style.backgroundColor = '#e0e0e0';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedAnswer !== 'Predictive') {
                e.currentTarget.style.backgroundColor = getBackgroundColor('Predictive');
              }
            }}
            onClick={() => handleAnswerSelect('Predictive')}
          >
            <p style={{ textAlign: 'left', lineHeight: '1.6', margin: '0', flex: '1', width: '100%', textWrap: 'wrap' }}>
              <strong>Predictive</strong> - The study demonstrates that one variable can be used to forecast or predict levels of another variable.
            </p>
          </div>

          <div 
            style={{ 
              display: 'flex', 
              border: '1px solid #ddd', 
              padding: '10px', 
              marginBottom: '10px', 
              cursor: 'pointer',
              backgroundColor: getBackgroundColor('Causal'),
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (selectedAnswer !== 'Causal') {
                e.currentTarget.style.backgroundColor = '#e0e0e0';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedAnswer !== 'Causal') {
                e.currentTarget.style.backgroundColor = getBackgroundColor('Causal');
              }
            }}
            onClick={() => handleAnswerSelect('Causal')}
          >
            <p style={{ textAlign: 'left', lineHeight: '1.6', margin: '0', flex: '1', width: '100%', textWrap: 'wrap' }}>
              <strong>Causal</strong> - The study establishes that changes in one variable directly cause changes to another variable.
            </p>
          </div>

          <div 
            style={{ 
              display: 'flex', 
              border: '1px solid #ddd', 
              padding: '10px', 
              cursor: 'pointer',
              backgroundColor: getBackgroundColor('Mechanistic'),
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (selectedAnswer !== 'Mechanistic') {
                e.currentTarget.style.backgroundColor = '#e0e0e0';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedAnswer !== 'Mechanistic') {
                e.currentTarget.style.backgroundColor = getBackgroundColor('Mechanistic');
              }
            }}
            onClick={() => handleAnswerSelect('Mechanistic')}
          >
            <p style={{ textAlign: 'left', lineHeight: '1.6', margin: '0', flex: '1', width: '100%', textWrap: 'wrap' }}>
              <strong>Mechanistic</strong> - The study demonstrates causation and characterizes the type of relationship between variables (linear, curvilinear, etc.).
            </p>
          </div>

          {selectedAnswer && isCorrectAnswer(selectedAnswer) && (
            <div style={{ 
              display: 'flex', 
              border: '1px solid #ddd', 
              padding: '15px', 
              marginTop: '15px', 
              flexDirection: 'column', 
              backgroundColor: '#f9f9f9' 
            }}>
              <h4 style={{ margin: '0 0 10px 0', textAlign: 'left' }}>Explain your reasoning:</h4>
              <textarea
                value={reasoning}
                onChange={(e) => setReasoning(e.target.value)}
                placeholder="Please explain why you selected this answer (minimum 10 characters)..."
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px',
                  lineHeight: '1.4',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
        {currentQuestionIndex > 0 && (
          <button 
            className="button"
            onClick={handleBack}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            BACK
          </button>
        )}

        {currentQuestionIndex < questions.length - 1 ? (
          <button 
            className="button"
            onClick={handleNext}
            disabled={!selectedAnswer || !isCorrectAnswer(selectedAnswer) || reasoning.length < 10}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '5px',
              cursor: selectedAnswer && isCorrectAnswer(selectedAnswer) && reasoning.length >= 10 ? 'pointer' : 'not-allowed',
              opacity: selectedAnswer && isCorrectAnswer(selectedAnswer) && reasoning.length >= 10 ? 1 : 0.5
            }}
          >
            NEXT
          </button>
        ) : (
          <p>You have completed all questions!</p>
        )}
      </div>
    </div>
  );
}