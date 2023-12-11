export interface Card {
    quantity: number;
    cardName: string;
  }
  
  export interface ScryfallCard {
    name: string;
    id: string;
    image_uris: {
      small: string;
      normal: string;
      large: string;
      png: string;
    };
    cmc: number;
    type_line: string;
    colors: string[];
    set_name: string;
    rarity: string;
  }
  