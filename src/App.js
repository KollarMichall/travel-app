import { CssBaseline, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { getPlacesData, getWeatherData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

function App() {
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState(0)
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    const filteredPlace = places.filter(place => Number(place.rating) > rating)
    setFilteredPlaces(filteredPlace)
  }, [rating])


  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true)
      getWeatherData(coordinates.lat, coordinates.lng).then(res => {
        setWeatherData(res)
      })
      getPlacesData(type, bounds.sw, bounds.ne).then(res => {
        setPlaces(res?.filter(place => place.name && place.num_reviews > 0 ))
        setFilteredPlaces([])
        setIsLoading(false)
      })
    }

  }, [type, coordinates, bounds])
  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };
  return (<>
    <CssBaseline />
    <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
    <Grid container spacing={3} style={{ width: '100%' }}>
      <Grid item xs={12} md={4}>
        <List
          places={filteredPlaces.length ? filteredPlaces : places}
          childClicked={childClicked}
          isLoading={isLoading}
          setType={setType}
          type={type}
          setRating={setRating}
          rating={rating}

        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Map
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          places={filteredPlaces.length ? filteredPlaces : places}
          setChildClicked={setChildClicked}
          weatherData={weatherData}

        />
      </Grid>
    </Grid>
  </>
  );
}

export default App;
