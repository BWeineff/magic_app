"use client";
import React, { useState } from 'react'
import HomeButton from '../_components/homeButton';
import styled from 'styled-components';

export default function Game() {
    const [playerLife, setPlayerLife] = useState(20);
    const [opponentLife, setOpponentLife] = useState(20);

    const handleRefresh = () => {
        setPlayerLife(20);
        setOpponentLife(20);
    }

  return (
    <Wrapper>
        <HomeButton/>
        <LeftSection>
            <RefreshButton onClick={handleRefresh}>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" fill='white' viewBox="0 0 512 512"><path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/></svg>
            </RefreshButton>
        </LeftSection>
        <RightSection>
           <Opponent>
            <User>
                    image
                    name
                </User>
                <Counter color="opponent">
                    {/* life total */}
                    <p>{opponentLife}</p>
                    <LifeDown onClick={() => setOpponentLife(opponentLife - 1)}/>
                    <LifeUp onClick={() => setOpponentLife(opponentLife + 1)}/>
                </Counter>
           </Opponent>
           <Player id="player">
            <User>
                image
                name
            </User>
            <Counter color="player">
                {/* life total */}
                <p>{playerLife}</p>
                <LifeDown onClick={() => setPlayerLife(playerLife - 1) }/>
                <LifeUp onClick={() => setPlayerLife(playerLife + 1)}/>
            </Counter>
           </Player>
        </RightSection>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: space-evenly;
`

const RefreshButton = styled.button`
    width: 1rem;
    height: 100vh;
    color: #fff;
`

const RightSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    min-width: calc(100vw - 2rem);
`

const LeftSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
`


const Player = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
width: 100%;
height: 100%;
padding: 1rem;
`

const Opponent = styled(Player)`
   
`

const User = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: clamp(2rem, 10vw, 10rem);
    user-select: none;
    pointer-events: none;
`

const Counter = styled.div`
    position: relative;
    background-color: ${props => props.color === 'player' ? '#3498db' : '#e74c3c'};
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;

    p {
        font-size: 5rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        user-select: none;
        pointer-events: none;
    }
`

const LifeDown = styled.div`
    cursor: pointer;
    width: 50%;
    height: 100%;

    &:hover {
        opacity: 0.5;
        background-color: #fff;
    }
`

const LifeUp = styled.div`
    cursor: pointer;
    width: 50%;
    height: 100%;
    
    &:hover {
        opacity: 0.5;
        background-color: #fff;
    }
`
