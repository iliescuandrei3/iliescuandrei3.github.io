import { useEffect, useState } from "react";

interface UsernameProps {
  username: string;
}


export default function Username({ username }: UsernameProps) {
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const [typingRun, setTypingRun] = useState(0);

  useEffect(() => {
    setVisibleCharacters(0);

    const minDelay = 80;
    const maxDelay = 220;
    let currentCharacter = 0;
    let typingTimeout: number;

    const typeNextCharacter = () => {
      if (currentCharacter >= username.length) return;

      currentCharacter += 1;
      setVisibleCharacters(currentCharacter);

      if (currentCharacter < username.length) {
        const delay = minDelay + Math.random() * (maxDelay - minDelay);
        typingTimeout = window.setTimeout(typeNextCharacter, delay);
      }
    };

    const initialDelay = minDelay + Math.random() * (maxDelay - minDelay);
    typingTimeout = window.setTimeout(typeNextCharacter, initialDelay);

    return () => window.clearTimeout(typingTimeout);
  }, [username, typingRun]);

  return (
    <div className="typeset typeset-article text-4xl pb-4">
      <h1
        className="username-heading"
        onMouseEnter={() => {
          setVisibleCharacters(0);
          setTypingRun((current) => current + 1);
        }}
      >
        {username.slice(0, visibleCharacters)}
        <span className="typing-cursor">_</span>
      </h1>
    </div>
  );
}
