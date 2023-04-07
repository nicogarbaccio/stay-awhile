# Stay Awhile
## Full Stack short-term rental marketplace inspired by Airbnb 
### Built with Next.js 13, React, Prisma, MongoDB, NextAuth, and Tailwind CSS

### [LIVE SITE](https://stay-awhile.vercel.app/)

### Features:

- Tailwind design, animation, and effects
- Fully responsive on all screen sizes
- Credential authentication
- Google authentication
- Github authentication
- Image upload using Cloudinary CDN
- Client form validation and handling using react-hook-form
- Server error handling using react-toast
- Calendars with react-date-range
- Maps via React Leaflet
- Page loading state
- Page empty state
- Booking / Reservation system
- Guest reservation cancellation
- Owner reservation cancellation
- Creation and deletion of properties
- Pricing calculation
- Advanced search algorithm by category, date range, map location, number of guests, rooms and bathrooms
    - For example, properties that have a reservation in your desired date range to travel will be filtered out
- Favorites system & page
- Shareable URL filters
    - If you select a category, location and date range, you will be able to share a URL with a logged out friend in another browser and they will see the same results
- Used Prisma to define and generate the database schema, and then used Prisma's MongoDB connector to interact with the MongoDB database based on the schema definition.
- Fetched data in server react components by directly accessing MongoDB database
- Used new Next.js 13 template files like error.tsx and loading.tsx to unify loading and error handling

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/AntonioErdeljac/next13-airbnb-clone.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
```

### Setup Prisma

```shell
npx prisma db push

```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
