<h1>Wether App</h1>
<h2>Overview</h2>
<p>
Weather app is an app that displays weather and air pollution data based on current location.
</p>
<h2>How to Run</h2>
<p>Use git to clone the repository</p>

```
git clone https://github.com/ImMo3n/Weather
```

<p>Install the packages</p>

```
npm install
```

<p>To run in development mode use</p>

```
npm run dev
```

<p>To run Tailwind use this command in a seperate terminal</p>

```
npm run tailwind
```

<h2>
How It works
</h2>
<p>
With the help of public API called <a target="_blank" href="https://geolocation-db.com/">Geolocation-DB</a> we can detect the current location of the user.
</p>
<p>
We supply the location sent to us by Geolocation-db to <a target="_blank" href="https://openweathermap.org/api">Open Weather Map</a> api and get weather and pollution data.
</p>
<p>
The Open Weather API specifically requires latitude and longitude numbers for it to work.
</p>
<p>With the help of <a target="_blank" href="http://www.geognos.com/geo/en/world-countries-API.html">World Countries API</a> we have access to any country's latitude and longitude numbers which gives the ability of switching and viewing other country's weather and pollution details.</p>
<p>For the logos of country flags we use the help of <a target="_blank" href="https://www.freakflagsprite.com/">Freak Flags</a>. It requires country abbreviation to display the correct country flag.</p>
<p>For exmple this will display the france flag.</p>

```jsx
<div className="fflag fflag-FR ff-lg ff-app"></div>
```

<p>The entire app runs off of asynchronously fetched data, therefore the app uses custom hook called PromiseElement to manage multiple stages of fetching.</p>

```jsx
<PromiseElement
  promise={promiseCurrent}
  SuccessElement={SuccessElement}
  LoadingElement={SkeletonLoader}
  ErrorElement={ErrorElement}
/>
```

<p>The promise is a function that returns a promise. SuccessElement, LoadingElement, ErrorElement are jsx elements which the hook will display based on the fetch status.<p>

<p>The Geolocation-db API is significantly slower than open Weather Map API so I decided to store the country location info inside local storage when user loads the app for the first time, And if the location changes (by using a VPN) the location updates therefore it updates the initially loaded weather data.</p>
