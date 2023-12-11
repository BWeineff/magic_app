import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components';
import DeckCard from './deckCard';
import Link from 'next/link';
import { deckContext, DeckType } from '../context/deck.context';

export default function CreateDeck() {
  const [decks, setDecks] = useState([]) // TODO deck examples go here
  const deckState: any = useContext(deckContext); // set to any or state will be wacky, https://github.com/facebook/react/issues/24928

  useEffect(() => {
    setDecks(deckState.state.allDecks || []);
  }, [deckState.state]);

  return (
    <Wrapper>
      <h2>Deck List</h2>

      <CreateDeckButton href={"/decklist"}>
        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" fill="white" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
      </CreateDeckButton>

      {
        decks.length === 0 ? 
        <p>Create your first deck</p>
        : 
          <UL>
          {
            decks.map((deck: DeckType, index) => (
              <li key={index}>
                <DeckCard title={deck.title} />
              </li>
            ))
          }
        </UL>
        
      }
      
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

` 

const UL = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0;
`

const CreateDeckButton = styled(Link)`
  display: inline-block;
  padding: 2rem;
  margin: .2rem;
  border-radius: 5px;
  border: 1px solid white;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #333;
  }

  &:active {
    transform: translateY(3px);
  }
`
