"use client;"
import React, { useState } from 'react';
import axios from 'axios';
import { TextInputProps, set, unset } from 'sanity';
import { Card, ScryfallCard } from '../../types';
import { checkCardExistence, saveCardToSanity } from '../sanityUtils';

export function DecklistInput({ value, onChange }: TextInputProps) {
  const [decklist, setDecklist] = useState(value);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fetchedCards, setFetchedCards] = useState<ScryfallCard[]>([]);

  const handleDecklistChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setDecklist(newValue);
    onChange(newValue ? set(newValue) : unset());
  };

  const handleFetchCards = async () => {
    setErrorMessage(null);
    const lines = decklist?.split('\n') || [];
    const cards: Card[] = [];

    for (const line of lines) {
      const parts = line.trim().split(' ');
      if (parts.length < 2 || !/^\d+$/.test(parts[0])) {
        setErrorMessage('Error: Invalid line format...');
        return;
      }

      const quantity = parseInt(parts[0]);
      const cardName = parts.slice(1).join(' ');

      const cardExists = await checkCardExistence(cardName);

      if (!cardExists) {
        try {
          const response = await axios.get('https://api.scryfall.com/cards/named', {
            params: {
              fuzzy: cardName,
            },
          });

          const scryfallCard: ScryfallCard = response.data;
          await saveCardToSanity(scryfallCard); // Implement this function to save the card to Sanity
          setFetchedCards((prevCards) => [...prevCards, scryfallCard]);
        } catch (error) {
          setErrorMessage(`Error: Unable to fetch card: ${cardName} Error: ${error}`);
          return;
        }
      }
    }

    console.log('All Cards:', cards.concat(fetchedCards.map((scryfallCard) => ({
      quantity: 1,
      cardName: scryfallCard.name,
    }))));
  };

  return (
    <div>
      <textarea value={decklist} onChange={handleDecklistChange} />
      <button onClick={handleFetchCards}>Fetch Cards</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}
