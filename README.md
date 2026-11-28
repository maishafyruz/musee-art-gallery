# Musée — The Art of Discovery

**Author:** Maisha Fyruz  
**Course:** CSC 372-01 — Web Development  

## Project Overview

Musée is a personal digital art gallery that allows users to discover
artworks from different periods and create their own private collections.

Users can search for artworks and artists through the Cleveland Museum
of Art API, save their favorite artworks, write personal notes, and
manage their collections.

The visual design is inspired by classical European art galleries,
using a burgundy and antique gold color palette, decorative floral
patterns, elegant typography, and framed artwork displays.

The target users are art enthusiasts, students, and individuals who
enjoy discovering and collecting art in a digital environment.

## Live Application

https://musee-art-gallery.onrender.com

## Features

- Responsive homepage with featured classical artworks.
- Search for artworks by artist name, artwork title, or keyword.
- Integration with the Cleveland Museum of Art Open Access API.
- User authentication through GitHub OAuth.
- Automatically created user accounts upon first sign-in.
- Personal galleries associated with individual users.
- Save artworks to a personal gallery.
- View saved artworks.
- Add and update personal notes.
- Remove artworks from a collection.
- Prevention of duplicate saved artworks.
- Authentication-protected gallery operations.
- Input validation and error handling.

## Technologies Used

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API
- Google Fonts

### Backend

- Node.js
- Express.js
- Passport.js
- GitHub OAuth 2.0
- Express Session
- connect-pg-simple

### Database and Deployment

- PostgreSQL
- Neon
- Render
- GitHub

### External API

- Cleveland Museum of Art Open Access API

## Project Structure

```text
musee-art-gallery/
├── controllers/
│   ├── artwork-controller.js
│   └── discovery-controller.js
├── models/
│   ├── artwork-model.js
│   └── user-model.js
├── routes/
│   ├── artwork-router.js
│   ├── discovery-router.js
│   └── auth-router.js
├── public/
│   ├── images/
│   ├── index.html
│   ├── discover.html
│   ├── gallery.html
│   ├── styles.css
│   ├── auth.js
│   ├── discover.js
│   └── gallery.js
├── authentication.js
├── database.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## API Endpoints

### Personal Gallery

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/gallery` | Retrieves saved artworks |
| POST | `/api/gallery` | Saves a new artwork |
| PUT | `/api/gallery/:id` | Updates an artwork's personal note |
| DELETE | `/api/gallery/:id` | Removes a saved artwork |

All personal gallery routes require authentication.

### Artwork Discovery

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/discover?q=Monet` | Searches the external museum API |

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/auth/github` | Initiates GitHub authentication |
| GET | `/auth/github/callback` | Completes authentication |
| GET | `/auth/status` | Retrieves current authentication status |
| POST | `/auth/logout` | Logs out the current user |

## Database Design

The application uses PostgreSQL with two main application tables.

### Users

Stores user information obtained through GitHub authentication.

| Column | Purpose |
| --- | --- |
| id | Primary key |
| github_id | Unique GitHub user identifier |
| username | GitHub username |

### Artworks

Stores artworks saved by individual users.

| Column | Purpose |
| --- | --- |
| id | Primary key |
| user_id | Foreign key referencing users |
| artwork_id | External museum artwork identifier |
| title | Artwork title |
| artist | Artist information |
| image_url | Artwork image URL |
| note | User's personal note |

The users and artworks tables have a one-to-many relationship.
A unique constraint on user_id and artwork_id prevents users from
saving duplicate artworks while allowing different users to save
the same artwork.

An additional session table is managed by connect-pg-simple to
store authentication sessions in PostgreSQL.

## Setup Instructions

### Prerequisites

- Node.js (version 22 or newer recommended)
- npm
- Git
- PostgreSQL database or Neon account
- GitHub account and OAuth application credentials

### 1. Clone the Repository

```bash
git clone https://github.com/maishafyruz/musee-art-gallery.git
cd musee-art-gallery
```

### 2. Install Dependencies

```bash
npm ci
```

### 3. Configure GitHub OAuth

Create a GitHub OAuth application using the following URLs
for local development:

Homepage URL:

```text
http://localhost:3000
```

Authorization callback URL:

```text
http://localhost:3000/auth/github/callback
```

Obtain the Client ID and Client Secret from GitHub.

### 4. Configure Environment Variables

Create a `.env` file in the root directory and provide the
following environment variables:

```env
DATABASE_URL=your_postgresql_connection_string
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
SESSION_SECRET=your_secure_session_secret
```

A secure session secret can be generated using:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

The `.env` file is excluded from version control to protect
sensitive credentials.

### 5. Start the Application

```bash
npm run dev
```

The database tables are created automatically if they do not
already exist.

Open the application in your browser:

```text
http://localhost:3000
```

### Production Deployment

The application is deployed on Render with Neon PostgreSQL
as the database provider.

The production build command is:

```bash
npm ci
```

The production start command is:

```bash
npm start
```

Production environment variables are configured through Render,
including NODE_ENV=production and the production GitHub OAuth
credentials and callback URL.

## Reflection

### Design Choices

I chose Vanilla JavaScript for the frontend because the project
did not require a complex frontend framework. HTML, CSS, and
JavaScript provided the functionality I needed while allowing me
to apply the DOM manipulation, event handling, and Fetch API
concepts covered throughout the course.

For the backend, I chose Node.js and Express because they allowed
me to create REST API endpoints and organize the application into
routes, controllers, and models. Separating these responsibilities
made the code easier to understand, maintain, and debug.

I chose PostgreSQL because the application needed a persistent
database that could associate saved artworks with individual users.
The relationship between the users and artworks tables allows
each user to maintain their own collection without interfering
with another user's data.

I used GitHub OAuth through Passport.js instead of implementing
local password-based authentication. This allows a third-party
provider to handle user authentication without requiring the
application to collect or store passwords.

The visual design was also an important consideration. I wanted
the website to resemble a classical art gallery rather than a
standard image collection. The burgundy and gold colors, decorative
elements, and typography were selected to complement the artworks
and create a consistent visual identity across the application.

### Challenges

One of the main challenges was integrating the external artwork
API. I initially attempted to use the Art Institute of Chicago API,
but requests from the backend encountered access restrictions.
I resolved this by switching to the Cleveland Museum of Art API
and adapting the application to its response structure.

Another challenge was connecting authentication with the database.
I needed to ensure that a user signing in for the first time would
be added to the database, while returning users could access their
existing collections. This was accomplished by checking the GitHub
user identifier before creating a new user record.

Connecting the frontend CRUD operations to the backend also
required careful attention to request methods, data formats,
validation, and error responses.

During deployment, I had to configure environment variables and
create separate OAuth credentials for the production website.
I also configured PostgreSQL-based session storage so that
authentication sessions would not depend solely on server memory.

### Learning Outcomes

This project helped me understand how the frontend, backend,
database, and external services work together in a full-stack
web application.

I gained practical experience creating REST API endpoints,
performing database CRUD operations, using parameterized SQL
queries, and communicating with the backend through the Fetch API.

I also developed a better understanding of session-based
authentication, OAuth, middleware, and protecting routes so
that users can only access their own data.

Deploying the application helped me understand the differences
between local development and production environments,
particularly environment variables, OAuth callback URLs,
and session management.

Overall, this project allowed me to combine the different
concepts covered throughout the semester into a functional
full-stack web application.

### Future Work

With more development time, I would consider adding:

- Google authentication to make the application more accessible
  to users without GitHub accounts.
- Advanced search filters by artistic period, medium, and artist.
- Pagination to allow users to explore additional search results.
- Multiple personal collections organized by theme or artist.
- A detailed artwork view containing historical information.
- Sorting and filtering options within personal galleries.
- Additional accessibility and performance improvements.

These features would provide users with more flexibility while
preserving the main purpose of Musée as a personal digital
art gallery.

## Acknowledgments

- Cleveland Museum of Art — Open Access API and artwork data.
- National Gallery of Art — Featured artwork imagery.
- Alte Pinakothek — Featured artwork imagery.
- Google Fonts — Cinzel Decorative and Cormorant Garamond.
