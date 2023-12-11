// Utility functions
import { ScryfallCard } from '../types';
import { createClient } from '@sanity/client';

// Create a new Sanity client
// need to add token to .env file instead of explicitly calling it here
const sanityClient = createClient({
  projectId: 'y9gs3c3v',
  dataset: 'production',
  apiVersion: '2023-10-02',
  useCdn: true,
  token: 'skHeFitxcn81AHFxgkdpwyG17BnWL10SUk4oGlDIk7t1PQ17Ls1t1DGr7Xe1m3iGOCtWXTwtHvXQuvyAXXAyY3nU0Gh9HGejbdbg8ZptF35nGSX1G8U0eWYlyKisyXMow6Tg3KEUwwhL1rHOOC70aEIMVTVPvpLJafHmVsD2IGuf9vcUT4Q0',
});

// Function to check if a card exists in dataset
export async function checkCardExistence(cardName: string): Promise<boolean> {
    try {
      // GROQ query to check if the card exists in dataset
      const query = `*[_type == 'card' && name == $cardName][0]`;
      const params = { cardName };
      
      const response = await sanityClient.fetch(query, params);
      return !!response; // Card exists if response is truthy
    } catch (error) {
      console.error('Error checking card existence:', error);
      return false; // Error occurred or card not found
    }
  }

// Function to save a card to dataset
export async function saveCardToSanity(card: ScryfallCard): Promise<void> {
  try {
    // Map the fields from the ScryfallCard to the Sanity card schema
    const newCard = {
      _type: 'card', // Change to card schema type
      name: card.name || '',
      id: card.id || '',
      image_uris: {
        normal: card.image_uris?.normal || '',
      },
      cmc: card.cmc || 0,
      type_line: card.type_line || '',
      colors: card.colors || [],
      set_name: card.set_name || '',
      rarity: card.rarity || '',
    };

    // Use the Sanity client to create the new card document
    await sanityClient.create(newCard);

    console.log('Card saved to Sanity:', card.name);
  } catch (error) {
    console.error('Error saving card to Sanity:', error);
  }
}
