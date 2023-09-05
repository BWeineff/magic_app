// schemas/inputs/DecklistInput.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { Card, ScryfallCard } from '../../types';

interface DecklistInputProps {
  value: string;
  onChange: (newValue: string) => void;
}

export function DecklistInput({ value, onChange }: DecklistInputProps) {
  const [decklist, setDecklist] = useState(value);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDecklistChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setDecklist(newValue);
    onChange(newValue);
  };

  const handleFetchCards = async () => {
    setErrorMessage(null);

    const lines = decklist.split('\n');
    const cards: Card[] = [];

    for (const line of lines) {
      const parts = line.trim().split(' ', 2);
      if (parts.length !== 2 || !/^\d+$/.test(parts[0])) {
        setErrorMessage('Error: Invalid line format');
        return;
      }

      const quantity = parseInt(parts[0]);
      const cardName = parts[1];
      cards.push({ quantity, cardName });
    }

    const scryfallCards: ScryfallCard[] = [];

    for (const card of cards) {
      try {
        const response = await axios.get('https://api.scryfall.com/cards/named', {
          params: {
            fuzzy: card.cardName,
          },
        });

        scryfallCards.push(response.data as ScryfallCard);
      } catch (error) {
        setErrorMessage(`Error: Unable to fetch card: ${card.cardName}`);
        return;
      }
    }

    console.log('Scryfall Cards:', scryfallCards);
  };

  return (
    <div>
      <textarea value={decklist} onChange={handleDecklistChange} />
      <button onClick={handleFetchCards}>Fetch Cards</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}
