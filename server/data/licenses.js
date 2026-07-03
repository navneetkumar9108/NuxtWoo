// export const licenses = [
//   {
//     id: 1,
//     name: "Marvel",
//     slug: "marvel",
//   },
//   {
//     id: 2,
//     name: "DC",
//     slug: "dc",
//   },
//   {
//     id: 3,
//     name: "Naruto",
//     slug: "naruto",
//   },
//   {
//     id: 4,
//     name: "One Piece",
//     slug: "one-piece",
//   },
//   {
//     id: 5,
//     name: "Dragon Ball Z",
//     slug: "dragon-ball-z",
//   },
//   {
//     id: 6,
//     name: "Harry Potter",
//     slug: "harry-potter",
//   },
//   {
//     id: 7,
//     name: "Disney",
//     slug: "disney",
//   },
//   {
//     id: 8,
//     name: "Pokémon",
//     slug: "pokemon",
//   },
//   {
//     id: 9,
//     name: "Rick and Morty",
//     slug: "rick-and-morty",
//   },
//   {
//     id: 10,
//     name: "Batman",
//     slug: "batman",
//   },
// ];

const defaultLicense = {
  isFeatured: false,
  isActive: true,
  createdAt: "2026-01-01",
  updatedAt: "2026-06-01",
};

const licenseList = [
  {
    name: "Marvel",
    slug: "marvel",
    logo: "/licenses/marvel.svg",
    isFeatured: true,
  },
  {
    name: "DC",
    slug: "dc",
    logo: "/licenses/dc.svg",
    isFeatured: true,
  },
  {
    name: "Disney",
    slug: "disney",
    logo: "/licenses/disney.svg",
    isFeatured: true,
  },
  {
    name: "Star Wars",
    slug: "star-wars",
    logo: "/licenses/star-wars.svg",
    isFeatured: true,
  },
  {
    name: "Harry Potter",
    slug: "harry-potter",
    logo: "/licenses/harry-potter.svg",
    isFeatured: true,
  },
  {
    name: "Naruto",
    slug: "naruto",
    logo: "/licenses/naruto.svg",
    isFeatured: true,
  },
  {
    name: "One Piece",
    slug: "one-piece",
    logo: "/licenses/one-piece.svg",
    isFeatured: true,
  },
  {
    name: "Dragon Ball Z",
    slug: "dragon-ball-z",
    logo: "/licenses/dragon-ball-z.svg",
  },
  {
    name: "Pokémon",
    slug: "pokemon",
    logo: "/licenses/pokemon.svg",
    isFeatured: true,
  },
  {
    name: "Rick & Morty",
    slug: "rick-and-morty",
    logo: "/licenses/rick-and-morty.svg",
  },
  {
    name: "Looney Tunes",
    slug: "looney-tunes",
    logo: "/licenses/looney-tunes.svg",
  },
  {
    name: "Friends",
    slug: "friends",
    logo: "/licenses/friends.svg",
  },
  {
    name: "Batman",
    slug: "batman",
    logo: "/licenses/batman.svg",
  },
  {
    name: "Superman",
    slug: "superman",
    logo: "/licenses/superman.svg",
  },
  {
    name: "Spider-Man",
    slug: "spider-man",
    logo: "/licenses/spider-man.svg",
  },
  {
    name: "Avengers",
    slug: "avengers",
    logo: "/licenses/avengers.svg",
  },
  {
    name: "Deadpool",
    slug: "deadpool",
    logo: "/licenses/deadpool.svg",
  },
  {
    name: "Iron Man",
    slug: "iron-man",
    logo: "/licenses/iron-man.svg",
  },
  {
    name: "Captain America",
    slug: "captain-america",
    logo: "/licenses/captain-america.svg",
  },
  {
    name: "No License",
    slug: "no-license",
    logo: "/licenses/no-license.svg",
  },
];

export const licenses = licenseList.map((license, index) => ({
  id: index + 1,
  sortOrder: index + 1,
  ...defaultLicense,
  ...license,
}));
