"use client";
import { useState, createContext } from 'react';

const deckContext: any = createContext(null);

export interface DeckType {
    title: string;
    slug?: string;
    creator?: string;
    decklist?: string;
    mainImage?: string;
    format?: string;
    publishedAt?: string;
    cards?: string;
    wins?: number;
    losses?: number;
  }

const DeckProvider = (props: any) => {
    const [state, setState] = useState({
        selectedDeck: {},
        allDecks: []
    })

    return <deckContext.Provider value={{state, setState}}>
        {props.children}
    </deckContext.Provider>
}
export { deckContext as deckContext, DeckProvider as DeckProvider }