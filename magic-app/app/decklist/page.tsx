"use client";
import React, {useEffect} from 'react'
import {deckContext} from '../context/deck.context'
import styled from 'styled-components';
import HomeButton from '../_components/homeButton';
import Logout from '../_components/logout';
import { useRouter } from 'next/navigation'

// This page cares only about the deckContext and the selectedDeck inside the context
const dropdownMenuOptions = [
    { title: 'No Format', value: 'No Format' },
    { title: 'cEDH', value: 'cEDH' },
    { title: 'EDH', value: 'EDH' },
    { title: 'Legacy', value: 'Legacy' },
    { title: 'Vintage', value: 'Vintage' },
    { title: 'Modern', value: 'Modern' },
    { title: 'Standard', value: 'Standard' },
    { title: 'Pauper', value: 'Pauper' },
    { title: 'Pioneer', value: 'Pioneer' },
  ];

export default function Decklist() {
    const router = useRouter();

    const handleSave = () => {
        console.log('save button clicked');
        // TODO: grab the data from the input field and upload it.
        // TODO: only navigate home if api call to save deck worked successfully
        router.push('/', { scroll: false })
    }

    return (
    <Wrapper>
        <HomeButton/>
        <Logout/>
        <h2>Deck Name from selectedDeck</h2>
        <section>
            <p>Win Rate <span>##% || N/A</span></p>
        </section>
        <section>
            <div>
                <Frame>
                    <TextBlock placeholder='Enter or Paste Decklist Here'/>
                </Frame>
                <Frame>
                    <DropDownMenu>
                        {dropdownMenuOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                            {option.title}
                            </option>
                        ))}
                    </DropDownMenu>
                </Frame>
            </div>
            <Frame>
                <SaveButton onClick={handleSave}>Save</SaveButton>
            </Frame>
        </section>
    </Wrapper>
    
  )
}

// Styles
const Wrapper = styled.div`
 position: relative;
 padding: 2rem;
`

const Frame = styled.div`
 border: 1px solid white;
`

const TextBlock = styled.textarea`
`

const SaveButton = styled.button`
`

const DropDownMenu = styled.select`
    color: black;
`