export interface JournalItem {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content?: string;
}

export const journals: JournalItem[] = [
  {
    id: "1",
    title: "The Silence of Stone",
    date: "October 24, 2023",
    category: "ARCHITECTURE",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    excerpt: "An exploration of architectural stillness and the weight of history in contemporary brutalist structures.",
    content: "An exploration of architectural stillness and the weight of history in contemporary brutalist structures. The silence of stone speaks volumes about the human condition and our relationship with space.",
  },
  {
    id: "2",
    title: "Light and Shadow",
    date: "October 12, 2023",
    category: "ATMOSPHERE",
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=800&auto=format&fit=crop",
    excerpt: "Capturing the ephemeral dance of sunbeams on minimalist surfaces at the golden hour.",
    content: "Capturing the ephemeral dance of sunbeams on minimalist surfaces at the golden hour. This journal explores how light transforms the simplest of spaces into moments of transcendence.",
  },
  {
    id: "3",
    title: "Echoes of Ivory",
    date: "October 18, 2023",
    category: "POETRY",
    image: "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop",
    excerpt: "The soft resonance of monochrome textures and how they shape our perception of intimate spaces.",
    content: "The soft resonance of monochrome textures and how they shape our perception of intimate spaces. A poetic exploration of how simplicity can speak volumes.",
  },
  {
    id: "4",
    title: "A Pearly Morning",
    date: "October 05, 2023",
    category: "ATMOSPHERE",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    excerpt: "A poetic study on the iridescence of dawn and tactile luxury in everyday objects.",
    content: "A poetic study on the iridescence of dawn and tactile luxury in everyday objects. The morning light reveals the hidden beauty in the ordinary.",
  },
];
