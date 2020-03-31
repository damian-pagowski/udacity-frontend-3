# Weather-Journal App Project

## Overview
This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 

## Installation

```bash
npm install
```
App using environment variables to run:
- API_KEY
- API_URL

They can be provided in .env file:
```bash
API_KEY={YOUR_API_KEY}
API_URL=http://api.openweathermap.org/data/2.5/weather

```

## Usage

```bash
npm start
```
## API 

### GET / 
- serves index.html


### POST / 
- returns weather data for location identified with zip code (example: 94040,us)
- request parameters: zip, feelings. 



## Extras
If you are interested in testing your code as you go, you can use `tests.js` as a template for writing and running some basic tests for your code.
