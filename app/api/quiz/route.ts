import { NextResponse } from 'next/server';

// BAZA DANYCH - SZTYWNE LISTY UTWORÓW
const CATEGORIES: Record<string, string[]> = {
  
  // --- TWOJA PLAYLISTA DAD MUSIC (ZE ZDJĘĆ) ---
  'dad-music': [
    "Scorpions Wind Of Change", "Journey Don't Stop Believin'", "Aerosmith Dream On", "Foreigner I Want to Know What Love Is", "U2 With Or Without You", 
    "Red Hot Chili Peppers Snow (Hey Oh)", "U2 I Still Haven't Found What I'm Looking For", "Kansas Dust in the Wind", "The Police Roxanne", 
    "Creedence Clearwater Revival Have You Ever Seen The Rain", "Tears For Fears Everybody Wants To Rule The World", "Daryl Hall & John Oates Maneater", 
    "The Rolling Stones Paint It Black", "The Police Message In A Bottle", "Lynyrd Skynyrd Free Bird", "Creedence Clearwater Revival Fortunate Son", 
    "Fleetwood Mac Dreams", "Bruce Springsteen Dancing In the Dark", "Bruce Springsteen Born in the U.S.A.", "Bruce Springsteen Streets of Philadelphia", 
    "Foo Fighters Everlong", "Depeche Mode Enjoy the Silence", "Depeche Mode Personal Jesus", "Eric Clapton Layla", "Dire Straits Brothers In Arms", 
    "U2 One", "Bill Withers Ain't No Sunshine", "Chris Isaak Wicked Game", "Fleetwood Mac The Chain", "Red Hot Chili Peppers Otherside", 
    "Guns N' Roses Knockin' On Heaven's Door", "Dire Straits Sultans Of Swing", "The Beatles Yesterday", "Grover Washington Jr Just the Two of Us", 
    "Dire Straits Money For Nothing", "The Police Every Breath You Take", "R.E.M. Losing My Religion", "R.E.M. Everybody Hurts", "Eric Clapton Tears in Heaven", 
    "Radiohead Creep", "Metallica Nothing Else Matters", "Oasis Wonderwall", "Goo Goo Dolls Iris", "Robbie Williams Feel", "Pink Floyd Wish You Were Here", 
    "Genesis Jesus He Knows Me", "Phil Collins Another Day in Paradise", "Phil Collins In The Air Tonight", "Phil Collins Against All Odds", 
    "Philip Bailey Easy Lover", "Phil Collins You Can't Hurry Love", "Alphaville Forever Young", "Alphaville Big in Japan", "Pink Floyd Another Brick in the Wall", 
    "Status Quo In The Army Now", "Aerosmith Cryin'", "Guns N' Roses Sweet Child O' Mine", "Heart Alone", "Bonnie Tyler Total Eclipse of the Heart", 
    "Dire Straits Walk Of Life", "Bryan Adams Summer Of '69", "Green Day Boulevard of Broken Dreams", "Foreigner Juke Box Hero", "Queen Somebody To Love", 
    "Billy Joel Uptown Girl", "Berlin Take My Breath Away", "Cyndi Lauper Time After Time", "Queen I Want To Break Free", "George Harrison Got My Mind Set On You", 
    "Nena 99 Luftballons", "Blondie Heart Of Glass", "Soft Cell Tainted Love", "Billy Joel We Didn't Start the Fire", "Billy Joel Piano Man", 
    "Elton John Rocket Man", "Michael Jackson Black or White", "Electric Light Orchestra Mr. Blue Sky", "Sting Fields Of Gold", "Sting Englishman In New York", 
    "Sting Fragile", "Sting Desert Rose", "Sting Shape Of My Heart", "Queen Killer Queen", "Queen Bohemian Rhapsody", "Queen Don't Stop Me Now", 
    "Queen Under Pressure", "Queen Another One Bites The Dust", "Kings of Leon Sex on Fire", "Kings of Leon Use Somebody", "Red Hot Chili Peppers Can't Stop", 
    "Red Hot Chili Peppers Scar Tissue", "Red Hot Chili Peppers Californication", "Red Hot Chili Peppers Under the Bridge", "Linkin Park In the End", 
    "Linkin Park Numb", "Linkin Park Somewhere I Belong", "Linkin Park What I've Done", "Linkin Park Faint", "The Verve Bitter Sweet Symphony", 
    "Eagles Hotel California", "TOTO Hold the Line", "TOTO Africa", "Led Zeppelin Stairway to Heaven", "The Cranberries Zombie", 
    "Rod Stewart Da Ya Think I'm Sexy", "AC/DC Highway to Hell", "Madonna La Isla Bonita", "Survivor Eye of the Tiger", "Roxette The Look", 
    "Freddie Mercury I Was Born to Love You", "Boney M Rivers of Babylon", "The Clash London Calling", "U2 Sunday Bloody Sunday", "David Bowie Starman", 
    "U2 Beautiful Day", "The Killers Mr. Brightside", "David Bowie Space Oddity", "Gorillaz Clint Eastwood", "Kansas Carry on Wayward Son", "Sade Kiss of Life",
    "Dead Or Alive You Spin Me Round", "Fleetwood Mac Everywhere", "Alannah Myles Black Velvet", "Michael Jackson Billie Jean", "Rockwell Somebody's Watching Me",
    "Queen I Want It All", "Nirvana Smells Like Teen Spirit", "The Cure Boys Don't Cry", "Elton John Sacrifice", "UB40 Red Red Wine", "Sade Smooth Operator",
    "Seal Kiss from a Rose", "Midnight Oil Beds Are Burning", "Omega Gyongyhaju lany", "Murray Head One Night In Bangkok", "Frankie Goes To Hollywood Relax",
    "Spin Doctors Two Princes", "Elton John I'm Still Standing", "The Outfield Your Love", "Big Mountain Baby I Love Your Way", 
    "Michael Jackson The Way You Make Me Feel", "Michael Jackson Smooth Criminal", "Men At Work Who Can It Be Now", "Men At Work Down Under"
  ],

  // --- TWOJA PLAYLISTA POLSKI RAP (ZE ZDJĘĆ) ---
  'polski-rap-modern': [
    "Ralph Kaminski 2009", "Otsochodzi WWA Melanż", "OKI Trendsetting", "Taco Hemingway Następna stacja", "Quebonafide BUBBLETEA", 
    "Bedoes 2115 Rewolucja Romantyczna", "Fagata WOW", "Dawid Podsiadło Trójkąty i Kwadraty", "Mata 2001", "Bungee FIKU MIKU", 
    "Jeden Osiem L Jak zapomnieć", "Fukaj Zabiorę Cię Tam", "BROKIES PUK PUK", "Kizo Myto", "Taco Hemingway Bakayoko", 
    "kuqe 2115 taki mały ja", "Sentino Lato", "Belmondawg Pappardelle all'arrabbiata", "Bedoes 2115 05:05", "White 2115 Za tych co nie mogą", 
    "Mata Blok", "Gibbs suma wszystkich strachów", "Trzeci Wymiar Dla Mnie Masz Stajla", "Sobel MAMA POWTARZAŁA", "Kinny Zimmer PO CO", 
    "Otsochodzi Luty", "ReTo Billy Kid", "Fagata POW POW", "Hubert cotton candy", "Bedoes 2115 VOGUE", "rów babicze BERLIN2023", 
    "Kizo KIEROWNIK", "Mata Tango", "Guzior FALA", "Dawid Podsiadło mori", "Białas PDW", "Otsochodzi RAP", "sanah Nic dwa razy", 
    "Taco Hemingway Polskie Tango", "Kaz Bałagane Multisport", "Bedoes 2115 Wschód", "Tymek Ostatni", "Myslovitz Scenariusz dla moich sąsiadów", 
    "Mata Żółte flamastry i grube katechetki", "Paktofonika Jestem Bogiem", "Young Leosia Ej Agatka", "Wac Toja BOGOTA", "Malik Montana 1-WSZY NOS", 
    "Medusa Faraon", "OKI ILE LAT", "Szpaku Plaster", "Majszi MIŁOŚĆ ZA PIENIĄDZE", "Rest Dixon37 Havana", 
    "chillwagon @", "Żabson Sexoholik", "Paluch Szaman", "Kacper HTA Słońce Cały Rok", "Malik Montana Wychowanek Getta", "club2020 Malibu Barbie", 
    "Pusher Leje Wina", "Young Leosia SOBOTA WIECZÓR", "Sentino Vitalyi", "Żabson Puerto Bounce", "Sobel SEXTAPE", "Mata KAMIKAZE", 
    "Sentino CASABLANCA", "MIÜ dopóki się nie znudzisz", "Hellfield FENDI", "Bajorson Bailando", "Bungee TAK TO LATA", "Mata NIENAWIDZĘ BYĆ W KLUBIE", 
    "Żabson COWABONGA", "Kizo Lot", "Medusa La Vida Bella", "Mata BEZ NIKOGO OBOK", "Majki Uno Momento", "Young Leosia Jungle Girl", 
    "PRO8L3M Ground Zero", "White 2115 RiRi", "Mr. Polska Złote Tarasy", "Hellfield Wszyscy w Gucci", "Wac Toja Karmel", "francis 1DAY IN LA", 
    "Otsochodzi 300 BANIEK", "SVM!R NDA", "Sobel CHA CHA", "Kajtek W co ja się wpakowałem", "2115 WEEKEND 2115", "MIÜ PASEK PLAYBOYA", 
    "730 Huncho Ona Mówi", "SVM!R MIEJSKI MARATON", "Bedoes 2115 Nadchodzi lato", "OKI NA ZAWSZE MAŁOLAT", "Sentino MARBELLA", "SVM!R MONOPOL", 
    "Waima RING RING", "Malik Montana Dior", "Kaz Bałagane Trendsetter", "OKI Jeżyk", "OKI JEREMY SOCHAN", "Otsochodzi WSZYSTKO MIJA", 
    "wiktorek no i poszło", "Young Igi Bestia", "Rogal DDL Dziwki Dragi Lasery", "vkie DAM CI PORADY", "Aleshen Atlanta", 
    "2115 TURYSTA", "Żabson PRZEKAZ MYŚLI", "Kizo Fitness", "Malik Montana 911", "Żabson Nie mam czasu na wakacje", 
    "Kali 30 km/h", "Avi AMG", "Malik Montana Rundki", "OKI SPRZEDAŁEM SIĘ", "Diho Szyby", "club2020 Landlord", "White 2115 18", 
    "Dudek P56 California", "Sentino Rio", "OKI AGENT47", "Yung Adisz WWA NA KXKSIE", "Młody West Bez promo", "Mata To tylko wiosna", 
    "OKI Worki W Tłum", "Żabson Trapczan", "slowez NIE BĘDĘ ZA NIC PRZEPRASZAĆ", "Małach Nie dbam", "Rufuz PANAMA", "Medusa GLOW UP", 
    "Malik Montana Generał", "Taco Hemingway W PIĄTKI LEŻĘ W WANNIE", "Paktofonika Chwile Ulotne", "Gibbs Pogoda Drinki Plaża"
  ],

  // --- ARTYŚCI (10 RUND - PRECYZYJNE LISTY) ---
  
  'artist-kanye': [
    "Kanye West Father Stretch My Hands Pt. 1", "Kanye West Devil In A New Dress", "Kanye West God Is", "Kanye West CARNIVAL",
    "Kanye West Through The Wire", "Kanye West All Of The Lights", "Kanye West Everything I Am", "Kanye West True Love",
    "JAY-Z No Church In The Wild", "Kanye West POWER", "Kanye West Follow God", "Kanye West BURN", "Kanye West Jukebox Joints",
    "Kanye West On Sight", "Twista Slow Jamz", "Kanye West Monster", "Kanye West FIELD TRIP", "Kanye West Saint Pablo",
    "Kanye West Jesus Walks", "Kanye West Moon", "Kanye West Black Skinhead", "Kanye West Otis", "Kanye West Family Business",
    "Kanye West Praise God", "Kid Cudi Erase Me", "JAY-Z Why I Love You", "Kanye West Gorgeous", "Nas Still Dreaming",
    "Kanye West Famous", "Katy Perry E.T.", "Kanye West Roses", "Kanye West No More Parties In LA", "Kanye West Flashing Lights",
    "Kanye West Heartless", "Kanye West All Falls Down", "Kanye West Violent Crimes", "Kanye West Homecoming", "Kanye West Bound 2",
    "Rihanna FourFiveSeconds", "Kanye West Ghost Town", "Kanye West I Wonder", "Kanye West Gold Digger", "JAY-Z Ni**as In Paris",
    "JAY-Z Run This Town", "Kanye West Can't Tell Me Nothing", "Kanye West Runaway", "Kanye West Touch The Sky", "Estelle American Boy",
    "Kanye West Stronger"
  ],

  'artist-kendrick': [
    "Kendrick Lamar HUMBLE.", "Kendrick Lamar DNA.", "Kendrick Lamar Swimming Pools (Drank)", "Kendrick Lamar Alright", "Kendrick Lamar King Kunta",
    "Kendrick Lamar Bitch, Don't Kill My Vibe", "Kendrick Lamar Money Trees", "Kendrick Lamar LOVE. FEAT. ZACARI", "Kendrick Lamar LOYALTY. FEAT. RIHANNA", 
    "Kendrick Lamar All The Stars", "Kendrick Lamar N95", "Kendrick Lamar United In Grief", "Kendrick Lamar Father Time", "Kendrick Lamar Rich Spirit",
    "Kendrick Lamar Count Me Out", "Kendrick Lamar Silent Hill", "Kendrick Lamar m.A.A.d city", "Kendrick Lamar Poetic Justice", 
    "Kendrick Lamar i", "Kendrick Lamar King's Dead", "Kendrick Lamar Family Ties", "Kendrick Lamar ELEMENT.", "Kendrick Lamar YAH.",
    "Kendrick Lamar FEAR.", "Kendrick Lamar GOD.", "Kendrick Lamar DUCKWORTH.", "Kendrick Lamar Backseat Freestyle", "Kendrick Lamar A.D.H.D",
    "Kendrick Lamar HiiiPoWeR", "Kendrick Lamar Wesley's Theory", "Kendrick Lamar For Free?", "Kendrick Lamar Institutionalized", "Kendrick Lamar The Blacker The Berry"
  ],

  'artist-podsiadlo': [
    "Dawid Podsiadło Małomiasteczkowy", "Dawid Podsiadło Nie ma fal", "Dawid Podsiadło Trofea", "Dawid Podsiadło Najnowszy klip", "Dawid Podsiadło Matylda",
    "Dawid Podsiadło Pastempomat", "Dawid Podsiadło W dobrą stronę", "Dawid Podsiadło Trójkąty i kwadraty", "Dawid Podsiadło Nieznajomy", "Dawid Podsiadło mori",
    "Dawid Podsiadło To co masz Ty!", "Dawid Podsiadło D I A B L E", "Dawid Podsiadło wirus", "Dawid Podsiadło millenium", "Dawid Podsiadło Szarość i róż",
    "Dawid Podsiadło O czym śnisz?", "Dawid Podsiadło Rozpoznaję w Tobie coś", "Dawid Podsiadło Co mówimy?", "Dawid Podsiadło Nie kłami", "Dawid Podsiadło POST",
    "Dawid Podsiadło Halo", "Dawid Podsiadło Fantasmagoria", "Dawid Podsiadło Ostatnia nadzieja", "Dawid Podsiadło I Ciebie też, bardzo", "Dawid Podsiadło Całe szczęście",
    "Dawid Podsiadło PKP", "Dawid Podsiadło Bóg", "Dawid Podsiadło Projekt 19", "Dawid Podsiadło No", "Dawid Podsiadło Forest", "Dawid Podsiadło Lis", "Dawid Podsiadło Bela"
  ],

  'artist-eminem': [
    "Eminem Lose Yourself", "Eminem Without Me", "Eminem The Real Slim Shady", "Eminem Stan", "Eminem Mockingbird",
    "Eminem Love The Way You Lie", "Eminem Rap God", "Eminem Godzilla", "Eminem Not Afraid", "Eminem 'Till I Collapse",
    "Eminem Venom", "Eminem The Monster", "Eminem My Name Is", "Eminem When I'm Gone", "Eminem Sing For The Moment",
    "Eminem Cleanin' Out My Closet", "Eminem Superman", "Eminem Space Bound", "Eminem Berzerk", "Eminem Beautiful",
    "Eminem Like Toy Soldiers", "Eminem Shake That", "Eminem No Love", "Eminem River"
  ],

  'artist-weeknd': [
    "The Weeknd Blinding Lights", "The Weeknd Starboy", "The Weeknd The Hills", "The Weeknd Save Your Tears", "The Weeknd Can't Feel My Face",
    "The Weeknd I Feel It Coming", "The Weeknd Die For You", "The Weeknd Call Out My Name", "The Weeknd Heartless", "The Weeknd After Hours",
    "The Weeknd Earned It", "The Weeknd Wicked Games", "The Weeknd Often", "The Weeknd In Your Eyes", "The Weeknd Reminder",
    "The Weeknd Party Monster", "The Weeknd Acquainted", "The Weeknd Pray For Me", "The Weeknd Moth To A Flame", "The Weeknd Take My Breath"
  ],

  'artist-sanah': [
    "sanah Szampan", "sanah Ale jazz!", "sanah Melodia", "sanah Ten Stan", "sanah Kolońska i szlugi",
    "sanah Eldorado", "sanah Nic dwa razy", "sanah Marcepan", "sanah Hip Hip Hura", "sanah Oczy",
    "sanah Etcetera", "sanah Proszę pana", "sanah Królowa dram", "sanah No sory", "sanah Irenka",
    "sanah 2:00", "sanah Cząstka", "sanah Aniołom szepnij to", "sanah Pocałunki", "sanah Najlepszy dzień w moim życiu",
    "sanah Siebie zapytasz"
  ],

  'artist-queen': [
    "Queen Bohemian Rhapsody", "Queen Don't Stop Me Now", "Queen Another One Bites The Dust", "Queen Under Pressure", "Queen We Will Rock You",
    "Queen We Are The Champions", "Queen Radio Ga Ga", "Queen Somebody To Love", "Queen I Want To Break Free", "Queen Killer Queen",
    "Queen Crazy Little Thing Called Love", "Queen The Show Must Go On", "Queen Love of My Life", "Queen Who Wants to Live Forever", "Queen Fat Bottomed Girls",
    "Queen Bicycle Race", "Queen A Kind of Magic", "Queen One Vision", "Queen Hammer to Fall", "Queen I Want It All"
  ],

  'artist-taco': [
    "Taco Hemingway Tamagotchi", "Taco Hemingway Polskie Tango", "Taco Hemingway Deszcz na betonie", "Taco Hemingway Fiji", "Taco Hemingway Nostalgia",
    "Taco Hemingway 6 zer", "Taco Hemingway W piątki leżę w wannie", "Taco Hemingway Marsz", "Taco Hemingway Gelato", "Taco Hemingway 8 kobiet",
    "Taco Hemingway Cafe Belga", "Taco Hemingway Kabriolety", "Taco Hemingway Wszystko jedno", "Taco Hemingway Awaria", "Taco Hemingway Chodź",
    "Taco Hemingway Bakayoko", "Taco Hemingway Makarena Freestyle", "Taco Hemingway Pakiet Platinium"
  ],

  'artist-kukon': [
    "Kukon Miniówa", "Kukon Piję wódę i słucham Ich Troje", "Kukon Kocham Cię", "Kukon Matryca", "Kukon Cast Away",
    "Kukon Polish Paris", "Kukon Boli serce", "Kukon Miss Me", "Kukon Afery", "Kukon Ostatni bal",
    "Kukon Pora dla buntowników", "Kukon Sypialnia", "Kukon Dziewczyna z biblioteki", "Kukon Hard Flex Drive", "Kukon Ogrody"
  ],

  'artist-travis': [
    "Travis Scott Sicko Mode", "Travis Scott Goosebumps", "Travis Scott Highest in the Room", "Travis Scott Butterfly Effect", "Travis Scott Antidote",
    "Travis Scott Stargazing", "Travis Scott Fein", "Travis Scott 90210", "Travis Scott Franchise", "Travis Scott The Scotts",
    "Travis Scott Yosemite", "Travis Scott Can't Say", "Travis Scott No Bystanders", "Travis Scott Beibs in the Trap", "Travis Scott Pick Up The Phone",
    "Travis Scott Mamacita", "Travis Scott Upper Echelon", "Travis Scott Gatti"
  ],

  // --- KATEGORIE GATUNKOWE (TEŻ RĘCZNE DLA PEWNOŚCI) ---
  'usa-rap-modern': [
    "Travis Scott Sicko Mode", "Drake God's Plan", "Kendrick Lamar HUMBLE.", "Post Malone Rockstar", "The Weeknd Starboy", 
    "Kanye West Stronger", "Future Mask Off", "21 Savage Bank Account", "Doja Cat Paint The Town Red", "Playboi Carti Magnolia",
    "Drake Hotline Bling", "Cardi B Bodak Yellow", "Jack Harlow First Class", "Lil Uzi Vert XO Tour Llif3", "Migos Bad and Boujee"
  ],
  'usa-rap-classics': [
    "Eminem Lose Yourself", "2Pac California Love", "The Notorious B.I.G. Juicy", "Dr. Dre Still D.R.E.", "Snoop Dogg Drop It Like It's Hot", 
    "50 Cent In Da Club", "Jay-Z Empire State of Mind", "Ice Cube It Was A Good Day", "Outkast Ms. Jackson", "DMX X Gon' Give It To Ya",
    "Nas N.Y. State of Mind", "Wu-Tang Clan C.R.E.A.M.", "N.W.A Straight Outta Compton", "Coolio Gangsta's Paradise", "Cypress Hill Insane in the Brain"
  ],
  'rock-legends': [
    "Queen Bohemian Rhapsody", "AC/DC Back In Black", "Nirvana Smells Like Teen Spirit", "Guns N' Roses Sweet Child O' Mine", "Metallica Enter Sandman", 
    "The Rolling Stones Paint It Black", "Red Hot Chili Peppers Californication", "Bon Jovi Livin' On A Prayer", "Linkin Park In The End", "Pink Floyd Another Brick In The Wall",
    "System of a Down Chop Suey!", "Green Day Boulevard of Broken Dreams", "The Beatles Hey Jude", "Led Zeppelin Stairway to Heaven", "Aerosmith Dream On"
  ],
  'polski-rock': [
    "Lady Pank Mniej niż zero", "Maanam Cykady na Cykladach", "Kult Arahja", "Perfect Autobiografia", "T.Love Chłopaki nie płaczą", 
    "Myslovitz Długość dźwięku samotności", "Budka Suflera Jolka, Jolka pamiętasz", "Bajm Biała armia", "Hey Teksański", "Wilki Baśka",
    "O.N.A. Kiedy powiem sobie dość", "Ira Nadzieja", "Chłopcy z Placu Broni O Ela", "Dżem Wehikuł czasu", "Republika Biała flaga"
  ],
  'pop-global-now': [
    "Taylor Swift Shake It Off", "Harry Styles As It Was", "Dua Lipa Levitating", "Ariana Grande 7 rings", "Ed Sheeran Shape of You", 
    "Justin Bieber Baby", "Miley Cyrus Flowers", "Billie Eilish Bad Guy", "Rihanna Umbrella", "The Weeknd Blinding Lights",
    "Olivia Rodrigo drivers license", "Sia Chandelier", "Lady Gaga Bad Romance", "Katy Perry Firework", "Bruno Mars Uptown Funk"
  ],
  'tiktok-viral': [
    "Måneskin Beggin'", "The Weeknd Blinding Lights", "Doja Cat Say So", "Glass Animals Heat Waves", "Lizzo About Damn Time", 
    "Jack Harlow First Class", "Meghan Trainor Made You Look", "Lil Nas X Montero", "SZA Kill Bill", "Steve Lacy Bad Habit",
    "Sabrina Carpenter Espresso", "Tate McRae Greedy", "Sam Smith Unholy", "Harry Styles As It Was", "GAYLE abcdefu"
  ],
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // Jeśli nie ma kategorii, bierzemy domyślnie Pop
    const tracksList = (category && CATEGORIES[category]) ? CATEGORIES[category] : CATEGORIES['pop-global-now'];
    
    // --- WSZYSTKO JEST PLAYLISTĄ (Sztywne tytuły) ---
    
    // Losujemy 30 pozycji z listy, żeby mieć z czego wybierać
    const shuffledTerms = tracksList.sort(() => 0.5 - Math.random()).slice(0, 30);
    
    // Pobieramy każdą piosenkę DOKŁADNIE PO NAZWIE (Artist - Title)
    const promises = shuffledTerms.map(term => 
      fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=1`)
        .then(res => res.json())
        .then(data => data.results[0])
        .catch(() => null)
    );

    const results = await Promise.all(promises);
    
    // Filtrujemy tylko te, które się udało pobrać i mają podgląd audio
    const validSongs = results.filter(item => item !== null && item !== undefined && item.previewUrl);

    return NextResponse.json({ results: validSongs });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}