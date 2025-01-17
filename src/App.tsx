import { useState, ChangeEvent } from 'react';
import './App.css';
import { unusedLettersSet, animate } from './rw-int';

function App() {
  const [unusedLettersStr, setUnusedLettersStr] = useState('');
  const [animateArray, setAnimateArray] = useState('');

  function updateUnusedLetters(event: ChangeEvent<HTMLInputElement>) {
    console.log(unusedLettersSet(event.target.value));
    setUnusedLettersStr(unusedLettersSet(event.target.value));
  }

  function updateAnimate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem(
      'animate-input'
    ) as HTMLInputElement;
    const speed = parseInt(
      (
        event.currentTarget.elements.namedItem(
          'num-input'
        ) as HTMLInputElement
      ).value
    );
    setAnimateArray(JSON.stringify(animate(input.value, speed)));
  }

  return (
    <>
      <div>
        <input
          type="text"
          id="unused-input"
          onChange={updateUnusedLetters}
        />
        <p>Unused letters: {unusedLettersStr}</p>
      </div>
      <div>
        <form onSubmit={updateAnimate}>
          <input type="text" id="animate-input" />
          <input type="number" id="num-input" />
          <button type="submit">Animate</button>
          <p>Animate: {animateArray}</p>
        </form>
      </div>
    </>
  );
}

export default App;
