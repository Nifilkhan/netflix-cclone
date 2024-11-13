# Netflix-Clone

This project is a fully functional Netflix clone built with Angular, using the TMDb API to fetch and display movie and TV show data. The app replicates the Netflix browsing experience with a sleek interface styled with Tailwind CSS, allowing users to explore popular, trending, and top-rated content. It includes the ability to watch trailers directly from the movie or TV show details page, enhancing the user's viewing experience. Additionally, each movie and TV show page provides a list of similar recommendations, making it easier for users to discover related content. The dynamic search feature allows users to find movies or shows by title with live results, while detailed information such as ratings, synopsis, release dates, and cast are available for every item. This project demonstrates my ability to integrate third-party APIs with Angular, create dynamic user interfaces, and deliver an engaging web experience.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [Angular CLI](https://angular.io/cli) (install via npm)

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Nifilkhan/netflix-clone
   cd netflix-clone


## Installation

Install Dependencies

```bash
cd netflix-clone
npm install

```
    
## Environment Variables

In order to use the TMDb API in the project, you'll need to add the API URL, query parameters, and headers (including Authorization) to the environment configuration.

`tmdbApiUrl`

`Query Parameters: Configure options like include_adult, include_video, language, page, and sort_by to customize your movie results.`


`Accept: Use application/json to get JSON responses.`
`Authorization: Replace 'YOUR_API_KEY_HERE' with your TMDb API key for authentication.`

## Run the project using angular cli


```bash
  ng serve
```


## Running unit tests

Run `ng test` to execute the unit tests via [jest](https://github.com/jestjs/jest).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
