import { NextResponse } from 'next/server';

// BAZA DANYCH - SZTYWNE LISTY UTWORÓW
// Serwer szuka DOKŁADNIE tych fraz.
const CATEGORIES: Record<string, string[]> = {
  
  // --- PLAYLISTY (15 RUND) ---
  'dad-music': [
    "The Chain - 2004 Remaster Fleetwood Mac", "Otherside Red Hot Chili Peppers", "Knockin' On Heaven's Door Guns N' Roses", 
    "Layla - Acoustic Eric Clapton", "Sultans Of Swing Dire Straits", "Brothers In Arms Dire Straits", "Yesterday - Remastered 2009 The Beatles", 
    "Just the Two of Us Grover Washington, Jr.", "Money For Nothing Dire Straits", "Every Breath You Take The Police", "Losing My Religion R.E.M.", 
    "Everybody Hurts R.E.M.", "Enjoy the Silence Depeche Mode", "Tears in Heaven Eric Clapton", "Creep Radiohead", "Nothing Else Matters Metallica", 
    "Wonderwall Oasis", "Iris The Goo Goo Dolls", "Feel Robbie Williams", "Wish You Were Here Pink Floyd", "Jesus He Knows Me Genesis", 
    "Another Day in Paradise Phil Collins", "In The Air Tonight Phil Collins", "Against All Odds Phil Collins", "Easy Lover Philip Bailey", 
    "You Can't Hurry Love Phil Collins", "Fields Of Gold Sting", "Englishman In New York Sting", "Fragile Sting", "Desert Rose Sting", 
    "Shape Of My Heart Sting", "Killer Queen Queen", "Bohemian Rhapsody Queen", "Don't Stop Me Now Queen", "Under Pressure Queen", 
    "Another One Bites The Dust Queen", "Somebody To Love Queen", "Sex on Fire Kings of Leon", "Use Somebody Kings of Leon", "Can't Stop Red Hot Chili Peppers", 
    "Scar Tissue Red Hot Chili Peppers", "Californication Red Hot Chili Peppers", "Under the Bridge Red Hot Chili Peppers", "In the End Linkin Park", 
    "Numb Linkin Park", "Somewhere I Belong Linkin Park", "What I've Done Linkin Park", "Faint Linkin Park", "Bitter Sweet Symphony The Verve", 
    "Hotel California Eagles", "Hold the Line TOTO", "Africa TOTO", "Rocket Man Elton John", "Stairway to Heaven Led Zeppelin", "Wish You Were Here Pink Floyd", 
    "Zombie The Cranberries", "Wind Of Change Scorpions", "Don't Stop Believin' Journey", "Dream On Aerosmith", "I Want to Know What Love Is Foreigner", 
    "With Or Without You U2", "Snow (Hey Oh) Red Hot Chili Peppers", "I Still Haven't Found What I'm Looking For U2", "Dust in the Wind Kansas", 
    "Roxanne The Police", "Have You Ever Seen The Rain CCR", "Everybody Wants To Rule The World Tears For Fears", "Maneater Daryl Hall & John Oates", 
    "Paint It, Black The Rolling Stones", "Message In A Bottle The Police", "Free Bird Lynyrd Skynyrd", "Fortunate Son CCR", "Dreams Fleetwood Mac", 
    "Dancing In the Dark Bruce Springsteen", "Born in the U.S.A. Bruce Springsteen", "Streets of Philadelphia Bruce Springsteen", "Everlong Foo Fighters", 
    "Enjoy the Silence Depeche Mode", "Personal Jesus Depeche Mode", "Layla Eric Clapton", "Brothers In Arms Dire Straits", "One U2", "Ain't No Sunshine Bill Withers", 
    "Wicked Game Chris Isaak", "Forever Young Alphaville", "Big in Japan Alphaville", "Another Brick in the Wall Pink Floyd", "In The Army Now Status Quo", 
    "Cryin' Aerosmith", "Sweet Child O' Mine Guns N' Roses", "Alone Heart", "Total Eclipse of the Heart Bonnie Tyler", "Walk Of Life Dire Straits", 
    "Summer Of '69 Bryan Adams", "Boulevard of Broken Dreams Green Day", "Juke Box Hero Foreigner", "Somebody To Love Queen", "Uptown Girl Billy Joel", 
    "Take My Breath Away Berlin", "Time After Time Cyndi Lauper", "I Want To Break Free Queen", "Got My Mind Set On You George Harrison", "99 Luftballons Nena", 
    "Heart Of Glass Blondie", "Tainted Love Soft Cell", "Don't Stop Believin' Journey", "We Didn't Start the Fire Billy Joel", "Piano Man Billy Joel", 
    "Rocket Man Elton John", "Black or White Michael Jackson", "Mr. Blue Sky ELO", "You Spin Me Round Dead Or Alive", "Everywhere Fleetwood Mac", 
    "Black Velvet Alannah Myles", "Billie Jean Michael Jackson", "Somebody's Watching Me Rockwell", "I Want It All Queen", "Smells Like Teen Spirit Nirvana", 
    "Personal Jesus Depeche Mode", "Boys Don't Cry The Cure", "Sacrifice Elton John", "Red Red Wine UB40", "Smooth Operator Sade", "Kiss from a Rose Seal", 
    "Don't Stop Fleetwood Mac", "Beds Are Burning Midnight Oil", "Walk Of Life Dire Straits", "Gyongyhaju lany Omega", "One Night In Bangkok Murray Head", 
    "Relax Frankie Goes To Hollywood", "Two Princes Spin Doctors", "I'm Still Standing Elton John", "Your Love The Outfield", "Baby, I Love Your Way Big Mountain", 
    "The Way You Make Me Feel Michael Jackson", "Smooth Criminal Michael Jackson", "Who Can It Be Now? Men At Work", "Down Under Men At Work", 
    "Da Ya Think I'm Sexy? Rod Stewart", "Highway to Hell AC/DC", "In The Army Now Status Quo", "La Isla Bonita Madonna", "Eye of the Tiger Survivor", 
    "Nothing Else Matters Metallica", "The Look Roxette", "I Was Born to Love You Freddie Mercury", "Englishman In New York Sting", "Rivers of Babylon Boney M.", 
    "London Calling The Clash", "Sunday Bloody Sunday U2", "Starman David Bowie", "Beautiful Day U2", "Mr. Brightside The Killers", "Space Oddity David Bowie", 
    "Clint Eastwood Gorillaz", "Carry on Wayward Son Kansas", "Kiss of Life Sade"
  ],

  'polski-rap-modern': [
    "2009 Ralph Kaminski", "WWA Melanż Otsochodzi", "Trendsetting OKI", "Następna stacja Taco Hemingway", "BUBBLETEA Quebonafide", 
    "Rewolucja Romantyczna Bedoes 2115", "WOW Fagata", "Trójkąty i Kwadraty Dawid Podsiadło", "2001 Mata", "FIKU MIKU Bungee", 
    "Jak zapomnieć Jeden Osiem L", "Zabiorę Cię Tam Fukaj", "PUK PUK BROKIES", "Myto Kizo", "Bakayoko Taco Hemingway", 
    "taki mały ja kuqe 2115", "Lato Sentino", "Pappardelle all'arrabbiata Belmondawg", "05:05 Bedoes 2115", "Za tych co nie mogą White 2115", 
    "Blok Mata", "suma wszystkich strachów Gibbs", "Dla Mnie Masz Stajla Trzeci Wymiar", "MAMA POWTARZAŁA Sobel", "PO CO? Kinny Zimmer", 
    "Luty Otsochodzi", "Billy Kid ReTo", "POW POW Fagata", "cotton candy Hubert.", "VOGUE Bedoes 2115", "BERLIN2023 rów babicze", 
    "KIEROWNIK Kizo", "Tango Mata", "FALA Guzior", "mori Dawid Podsiadło", "PDW Białas", "RAP Otsochodzi", "Nic dwa razy sanah", 
    "Polskie Tango Taco Hemingway", "Multisport Kaz Bałagane", "Wschód Bedoes 2115", "Ostatni Tymek", "Scenariusz dla moich sąsiadów Myslovitz", 
    "Żółte flamastry i grube katechetki Mata", "Jestem Bogiem Paktofonika", "Ej Agatka Young Leosia", "BILLY 6ix9ine", "BOGOTA Wac Toja", 
    "1-WSZY NOS Malik Montana", "Faraon Medusa", "CZEMU NIE ŚPISZ? bambi", "ILE LAT? OKI", "Plaster Szpaku", "MIŁOŚĆ ZA PIENIĄDZE Majszi", 
    "Havana Rest Dixon37", "@ chillwagon", "Sexoholik Żabson", "Szaman Paluch", "Słońce Cały Rok Kacper HTA", "Wychowanek Getta Malik Montana", 
    "Malibu Barbie club2020", "Leje Wina Pusher", "SOBOTA WIECZÓR Young Leosia", "Vitalyi Sentino", "Puerto Bounce Żabson", "SEXTAPE Sobel", 
    "NAPALONE FANKI Eryk Moczko", "BRAND NEW SQ8 OKI", "MVP OKI", "Lovestory White 2115", "Tak to leciało! Otsochodzi", 
    "W co ja się wpakowałem Kajtek", "WEEKEND 2115 2115", "PASEK PLAYBOYA MIÜ", "Ona Mówi 730 Huncho", "WWA Melanż Otsochodzi", 
    "MIEJSKI MARATON SVM!R", "Nadchodzi lato Bedoes 2115", "NA ZAWSZE MAŁOLAT OKI", "MARBELLA Sentino", "MONOPOL SVM!R", "KIEROWNIK Kizo", 
    "RING RING Waima", "Lato Sentino", "Dior Malik Montana", "Trendsetter Kaz Bałagane", "VOGUE Bedoes 2115", "Jeżyk! OKI", "JEREMY SOCHAN OKI", 
    "WSZYSTKO MIJA Otsochodzi", "PG$ Young Leosia", "no i poszło wiktorek", "Wschód Bedoes 2115", "Bestia Young Igi", "05:05 Bedoes 2115", 
    "Dziwki Dragi Lasery Rogal DDL", "DAM CI PORADY vkie", "Atlanta Aleshen", "TURYSTA 2115", "PRZEKAZ MYŚLI Żabson", "Fitness Kizo", 
    "TO NIE MA ZNACZENIA bambi", "911 Malik Montana", "Nie mam czasu na wakacje Żabson", "30 km/h Kali", "AMG Avi", "Rundki Malik Montana", 
    "SPRZEDAŁEM SIĘ OKI", "Szyby Diho", "Landlord club2020", "18 White 2115", "California Dudek P56", "Rio Sentino", "Za tych co nie mogą White 2115", 
    "PO CO? Kinny Zimmer", "AGENT47 OKI", "WWA NA KXKSIE Yung Adisz", "Bez promo Młody West", "To tylko wiosna Mata", "Worki W Tłum OKI", 
    "Trapczan Żabson", "NIE BĘDĘ ZA NIC PRZEPRASZAĆ slowez", "Nie dbam Małach", "MIŁOŚĆ ZA PIENIĄDZE Majszi", "PANAMA Rufuz", 
    "California Dudek P56", "GLOW UP Medusa", "PO CO? Kinny Zimmer", "Generał Malik Montana", "W PIĄTKI LEŻĘ W WANNIE Taco Hemingway", 
    "Chwile Ulotne Paktofonika", "Pogoda, Drinki, Plaża Gibbs"
  ],

  // --- ARTYŚCI (5 RUND - SZTYWNE LISTY ZE ZDJĘĆ) ---
  
  'artist-otsochodzi': [
    "Luty Otsochodzi", "NAWETT JAK Otsochodzi", "Tak to leciało! Otsochodzi", "300 BANIEK Otsochodzi", "Przypadkiem Oki", 
    "Nie / nie Otsochodzi", "New York Freestyle Otsochodzi", "Mów Otsochodzi", "MVP Oki", "KIEDYŚ CIĘ ZNAJDĘ Otsochodzi", 
    "RAP Otsochodzi", "Euforia Otsochodzi", "WWA Melanż Otsochodzi", "Cichosza Taco Hemingway", "Kochaj Mnie Albo Rzuć Otsochodzi", 
    "BÓL Otsochodzi", "Tarcho Terror Otsochodzi", "O.N.A club2020", "Czarne Chmury Otsochodzi", "Landlord club2020", 
    "Waka Flocka Otsochodzi", "WSZYSTKO MIJA Otsochodzi", "0:00 Otsochodzi", "Amerykańskie Teledyski Oki", "KFC Otsochodzi", 
    "Room service Louis Villain", "Ej, mała! club2020", "Worki W Tłum Oki", "Poj*bane Stany Otsochodzi", "Brud i krew Gruby Mielzky", 
    "Dla mnie Otsochodzi", "PUK PUK PUK Oki", "Nowy Kolor Otsochodzi", "Moonwalk Oki", "PATRZ NA NIEBO JAK PIERDOLNIE Otsochodzi", 
    "Malibu Barbie club2020", "Uzależniony Smolasty", "Biggie Oki", "Worldwide Otsochodzi", "club2020 club2020", "SumieNIE Otsochodzi"
  ],

  'artist-bambi': [
    "WIDZIAŁAM JUŻ WSZYSTKO bambi", "1DAY IN LA francis", "Woda Księżycowa Kubi Producent", "NIE MA CIĘ Fukaj", 
    "CZEMU NIE ŚPISZ? bambi", "RUW BAMBICZE bambi", "Przester Young Leosia", "BFF bambi", "MILLIE WALKY bambi", 
    "TO NIE MA ZNACZENIA bambi", "zostań, proszę kuqe 2115", "LECĘ BO CHCĘ Deemz", "Te numery Young Leosia", 
    "TLEN bambi", "GRAWITACJA bambi", "MADONNA bambi", "PG$ Young Leosia", "NIE CHCESZ MNIE bambi", 
    "KSZTAŁT MIŁOŚCI Young Igi", "VUELO bambi", "Double Match Young Leosia", "CLOUDS bambi", "RED BULL 64 BARS bambi", 
    "ZA DUŻO W SZYJE bambi", "Bad Bunny SB Maffija", "NUMBER ONE bambi", "Heart Sped Up Ely Oaks", "LATAWCE bambi", 
    "Skippers Young Leosia", "chrypki głos nie od fajek bambi", "Papier Young Leosia", "IRL bambi", "Bletki bambi", 
    "ICON bambi", "Kot Schrödingera CatchUp", "100 Bands Dina Ayada", "COLD BOY WINNER SB Maffija", "Dobra Robota Young Leosia", 
    "Headhunter Young Leosia", "Chwile Waima", "Zamki z piasku SB Maffija"
  ],

  'artist-kanye': [
    "Flashing Lights Kanye West", "Heartless Kanye West", "All Falls Down Kanye West", "Violent Crimes Kanye West", 
    "Homecoming Kanye West", "Bound 2 Kanye West", "FourFiveSeconds Rihanna", "Ghost Town Kanye West", "I Wonder Kanye West", 
    "Gold Digger Kanye West", "Ni**as In Paris JAY-Z", "Run This Town JAY-Z", "Can't Tell Me Nothing Kanye West", 
    "Runaway Kanye West", "Touch The Sky Kanye West", "American Boy Estelle", "Stronger Kanye West", 
    "Father Stretch My Hands Pt. 1 Kanye West", "Devil In A New Dress Kanye West", "God Is Kanye West", "CARNIVAL Kanye West", 
    "Through The Wire Kanye West", "All Of The Lights Kanye West", "Everything I Am Kanye West", "True Love Kanye West", 
    "No Church In The Wild JAY-Z", "POWER Kanye West", "Follow God Kanye West", "BURN Kanye West", "Jukebox Joints A$AP Rocky", 
    "On Sight Kanye West", "Slow Jamz Twista", "Monster Kanye West", "FIELD TRIP Kanye West", "Saint Pablo Kanye West", 
    "Jesus Walks Kanye West", "Moon Kanye West", "Black Skinhead Kanye West", "Otis JAY-Z", "Family Business Kanye West", 
    "Praise God Kanye West", "Erase Me Kid Cudi", "Why I Love You JAY-Z", "Gorgeous Kanye West", "Still Dreaming Nas", 
    "Famous Kanye West", "E.T. Katy Perry", "Roses Kanye West", "No More Parties In LA Kanye West"
  ],

  // --- Reszta artystów (dla porządku - też sztywne listy) ---
  'artist-kendrick': [
    "Kendrick Lamar HUMBLE.", "Kendrick Lamar DNA.", "Kendrick Lamar Swimming Pools (Drank)", "Kendrick Lamar Alright", 
    "Kendrick Lamar King Kunta", "Kendrick Lamar Bitch, Don't Kill My Vibe", "Kendrick Lamar Money Trees"
  ],
  'artist-eminem': [
    "Eminem Lose Yourself", "Eminem Without Me", "Eminem The Real Slim Shady", "Eminem Stan", "Eminem Mockingbird",
    "Eminem Love The Way You Lie", "Eminem Rap God", "Eminem Godzilla", "Eminem Not Afraid"
  ],
  'artist-weeknd': [
    "The Weeknd Blinding Lights", "The Weeknd Starboy", "The Weeknd The Hills", "The Weeknd Save Your Tears", 
    "The Weeknd Can't Feel My Face", "The Weeknd I Feel It Coming", "The Weeknd Die For You"
  ],
  'artist-podsiadlo': [
    "Dawid Podsiadło Małomiasteczkowy", "Dawid Podsiadło Nie ma fal", "Dawid Podsiadło Trofea", "Dawid Podsiadło Matylda", 
    "Dawid Podsiadło Pastempomat", "Dawid Podsiadło W dobrą stronę", "Dawid Podsiadło Trójkąty i kwadraty"
  ],
  'artist-sanah': [
    "sanah Szampan", "sanah Ale jazz!", "sanah Melodia", "sanah Ten Stan", "sanah Kolońska i szlugi", "sanah Eldorado"
  ],
  'artist-taco': [
    "Taco Hemingway Tamagotchi", "Taco Hemingway Polskie Tango", "Taco Hemingway Deszcz na betonie", "Taco Hemingway Fiji", 
    "Taco Hemingway Nostalgia", "Taco Hemingway 6 zer"
  ],
  'artist-kukon': [
    "Kukon Miniówa", "Kukon Kocham Cię", "Kukon Matryca", "Kukon Cast Away", "Kukon Polish Paris"
  ],
  'artist-queen': [
    "Queen Bohemian Rhapsody", "Queen Don't Stop Me Now", "Queen Another One Bites The Dust", "Queen Under Pressure", 
    "Queen We Will Rock You", "Queen We Are The Champions", "Queen Radio Ga Ga"
  ],
  'artist-travis': [
    "Travis Scott Sicko Mode", "Travis Scott Goosebumps", "Travis Scott Highest in the Room", "Travis Scott Butterfly Effect", 
    "Travis Scott Antidote", "Travis Scott Stargazing", "Travis Scott Fein"
  ],
  
  // --- KATEGORIE GATUNKOWE ---
  'usa-rap-modern': ["Travis Scott Sicko Mode", "Drake God's Plan", "Kendrick Lamar HUMBLE.", "Post Malone Rockstar", "The Weeknd Starboy"],
  'usa-rap-classics': ["Eminem Lose Yourself", "2Pac California Love", "The Notorious B.I.G. Juicy", "Dr. Dre Still D.R.E."],
  'rock-legends': ["Queen Bohemian Rhapsody", "AC/DC Back In Black", "Nirvana Smells Like Teen Spirit", "Guns N' Roses Sweet Child O' Mine"],
  'polski-rock': ["Lady Pank Mniej niż zero", "Maanam Cykady na Cykladach", "Kult Arahja", "Perfect Autobiografia"],
  'pop-global-now': ["Taylor Swift Shake It Off", "Harry Styles As It Was", "Dua Lipa Levitating", "Ariana Grande 7 rings"],
  'tiktok-viral': ["Måneskin Beggin'", "The Weeknd Blinding Lights", "Doja Cat Say So", "Glass Animals Heat Waves"]
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // Pobieramy listę utworów dla danej kategorii
    const tracksList = (category && CATEGORIES[category]) ? CATEGORIES[category] : CATEGORIES['pop-global-now'];
    
    // --- TRYB PLAYLISTA ---
    // Pobieramy konkretne utwory z listy
    const shuffledTerms = tracksList.sort(() => 0.5 - Math.random()).slice(0, 30);
    
    const promises = shuffledTerms.map(term => 
      fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=1`)
        .then(res => res.json())
        .then(data => data.results[0])
        .catch(() => null)
    );

    const results = await Promise.all(promises);
    const validSongs = results.filter(item => item !== null && item !== undefined && item.previewUrl);

    return NextResponse.json({ results: validSongs });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}