"use client";
import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components';
import { userContext } from '../context/user.context';
import CreateDeck from '../_components/createDeck';
import Logout from '../_components/logout';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const State: any = useContext(userContext);

  // this is where all of our login logic lives
  useEffect(() => {
    if (State.userState) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    // this is where we'll check if a user is logged in.
  }, [isLoggedIn, State.userState]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('submit button clicked');
    State.setUserState(e.target.creator.value);
  }
   
  return isLoggedIn ? (
    // If user is logged in, show this:
  <Page>
    <Logout/>
    <h1>Magic App</h1>
    <CreateDeck/>
  </Page>
  ) : (
  // If user is not logged in, show this:
  <Page>
    <h1>Magic App</h1>
    <h2>Log in to continue</h2>

    <div>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="username">Creator</label>
        <Creator type="text" id="creator" name="creator" />
        <SubmitButton type="submit" value="Get Decks" />
      </Form>
    </div>
  </Page>
  )
}

const Page = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`

const Form = styled.form`
`

const Creator = styled.input`
  color: black;
` 

const SubmitButton = styled.input`
  border: 1px solid white;
  border-radius: 5px;
  color: white;
  display: inline-block;
  justify-content: center;
  align-items: center;
  padding: .2rem 1rem;
  margin: .2rem;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }

  &:active {
    transform: translateY(3px);
  }
`
