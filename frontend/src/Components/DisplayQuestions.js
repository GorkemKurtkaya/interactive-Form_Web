import React from 'react';

export default function DisplayQuestions({ questions }) {
  return (
    <div>
      <h2>Eklenen Sorular</h2>
      <ul>
        {questions.map((q, index) => (
          <li key={index}>
            <b>Soru:</b> {q.question}
            <br />
            <b>Yıldız Değeri:</b> {q.stars}
          </li>
        ))}
      </ul>
    </div>
  );
}
