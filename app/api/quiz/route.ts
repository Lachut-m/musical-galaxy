import { NextResponse } from 'next/server';

const CATEGORIES: Record<string, string[]> = {
  'polski-rap-modern': [
    "Mata", "Bedoes 2115", "White 2115", "Oki", "Sobel", "Kizo", "Young Leosia", "Kukon", "Szpaku", "Żabson", "Bambi", "Gibbs", "Otsochodzi", "Jan-rapowanie", "Taco Hemingway", "Fukaj", "Kinny Zimmer"
  ],
  'usa-rap-modern': [
    "Travis Scott", "Drake", "Kendrick Lamar", "Post Malone", "The Weeknd", "Kanye West", "Future", "21 Savage", "Doja Cat", "Cardi B", "Lil Uzi Vert", "Jack Harlow", "Gunna", "Playboi Carti"
  ],
  'usa-rap-classics': [
    "Eminem", "2Pac", "The Notorious B.I.G.", "Dr. Dre", "Snoop Dogg", "50 Cent", "Jay-Z", "Ice Cube", "Outkast", "DMX", "Nas", "Wu-Tang Clan", "N.W.A"
  ],
  'rock-legends': [
    "Queen", "AC/DC", "Nirvana", "Guns N' Roses", "Metallica", "The Rolling Stones", "Red Hot Chili Peppers", "Bon Jovi", "Linkin Park", "Green Day", "System of a Down", "Pink Floyd", "Aerosmith"
  ],
  'polski-rock': [
    "Lady Pank", "Maanam", "Kult", "Perfect", "T.Love", "Myslovitz", "Budka Suflera", "Bajm", "Hey", "Wilki", "O.N.A.", "Ira", "Chłopcy z Placu Broni"
  ],
  'pop-global-now': [
    "Taylor Swift", "Harry Styles", "Dua Lipa", "Ariana Grande", "Ed Sheeran", "Justin Bieber", "Miley Cyrus", "Billie Eilish", "Olivia Rodrigo", "Rihanna", "Beyonce", "Lady Gaga", "Sia"
  ],
  'tiktok-viral': [
    "Måneskin", "The Weeknd", "Doja Cat", "Glass Animals", "Lizzo", "Jack Harlow", "Meghan Trainor", "Lil Nas X", "SZA", "Steve Lacy", "Sabrina Carpenter", "Tate McRae", "Sam Smith"
  ],
  
  // Kategorie jednego artysty
  'artist-eminem': ["Eminem"],
  'artist-weeknd': ["The Weeknd"],
  'artist-sanah': ["Sanah"],
  'artist-queen': ["Queen"],
  'artist-taco': ["Taco Hemingway"],
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // Domyślna lista
    const artistsList = (category && CATEGORIES[category]) ? CATEGORIES[category] : CATEGORIES['pop-global-now'];

    // Losujemy więcej artystów, żeby zapewnić różnorodność
    // Usuwamy duplikaty z listy artystów (Set)
    const uniqueArtistsPool = Array.from(new Set(artistsList));
    const shuffledArtists = uniqueArtistsPool.sort(() => 0.5 - Math.random()).slice(0, 12);
    
    let rawSongs: any[] = [];

    // Pobieramy utwory
    for (const artist of shuffledArtists) {
      // Pobieramy po 5 utworów od artysty
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(artist)}&entity=song&limit=5&attribute=artistTerm`
      );
      
      if (response.ok) {
        const data = await response.json();
        rawSongs = [...rawSongs, ...data.results];
      }
    }

    // --- LOGIKA USUWANIA DUPLIKATÓW ---
    const uniqueSongs = [];
    const seenTracks = new Set();

    // Mieszamy surowe wyniki przed filtrowaniem
    rawSongs.sort(() => 0.5 - Math.random());

    for (const song of rawSongs) {
      if (!song.previewUrl || !song.trackName) continue;

      // Tworzymy unikalny klucz: "tytuł-artysta" (małe litery, bez znaków specjalnych)
      // Usuwamy nawiasy, żeby "Song A" i "Song A (Live)" były traktowane jako to samo (żeby nie było powtórki)
      const cleanTitle = song.trackName.toLowerCase().split('(')[0].split('-')[0].trim().replace(/[^a-z0-9]/g, "");
      const cleanArtist = song.artistName.toLowerCase().replace(/[^a-z0-9]/g, "");
      const key = `${cleanTitle}-${cleanArtist}`;

      if (!seenTracks.has(key)) {
        seenTracks.add(key);
        uniqueSongs.push(song);
      }
    }

    // Ograniczamy do 20 sztuk (z zapasem, frontend utnie do 15)
    const finalPlaylist = uniqueSongs.slice(0, 20);

    return NextResponse.json({ results: finalPlaylist });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}