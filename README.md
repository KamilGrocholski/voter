<h1 align="center">Voter</h1>

<h3 align="center">Check it <a href="https://voter-liard.vercel.app">here</a>!</h3>

### Table of content

- [Overview](#overview)
- [How to run it locally](#how-to-run-it-locally)
- [App screens](#app-screens)

## Overview

An application to create vote sets and cast votes. Made using [create-t3-app](https://create.t3.gg) boilerplate, [Zustand](https://github.com/pmndrs/zustand), [Cloudinary](https://cloudinary.com) and [HeadlessUI](https://headlessui.com).

## How to run it locally

- Clone the repository

```bash
git clone https://github.com/KamilGrocholski/voter.git
```

- Install dependencies

```bash
cd voter
npm install
```

- Files changes

```
voter/prisma/schema.prisma

Comment the @db.Text annotations in model Account
and change `provider = "postgresql"` to `provider = "sqlite"`

voter/.env

copy from voter/.env.example
and set the required env variables
```

- Run the app

```bash
npm run dev
```

## App screens

Home\
![screenshot](https://github.com/KamilGrocholski/voter/blob/main/readme-images/home.png?raw=true)

Vote set voting\
![screenshot](https://github.com/KamilGrocholski/voter/blob/main/readme-images/vote-set_voting.png?raw=true)

Vote set page\
![screenshot](https://github.com/KamilGrocholski/voter/blob/main/readme-images/vote-set_page.png?raw=true)

Dashboard main\
![screenshot](https://github.com/KamilGrocholski/voter/blob/main/readme-images/dashboard.png?raw=true)

Dashboard vote set overview\
![screenshot](https://github.com/KamilGrocholski/voter/blob/main/readme-images/dashboard_my-vote-set_overview.png?raw=true)

Dashboard vote set items\
![screenshot](https://github.com/KamilGrocholski/voter/blob/main/readme-images/dashboard_my-vote-set_items.png?raw=true)

Dashboard vote set settings\
![screenshot](https://github.com/KamilGrocholski/voter/blob/main/readme-images/dashboard_my-vote-set_settings.png?raw=true)
