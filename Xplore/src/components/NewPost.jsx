import { IonItem, IonLabel, IonInput, IonTextarea, IonImg, IonButton, IonIcon, IonSelectOption, IonSelect } from "@ionic/react";
import { useState, useEffect } from "react";

export default function NewPostForm({ post, handleSubmit }) {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [text, setText] = useState();

  
    async function getCountries() {
      const countriesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/countries.json`);
      const countriesData = await countriesRes.json();
      const countriesArray = Object.keys(countriesData).map(key => ({ id: key, ...countriesData[key]})); // from object to array
      setCountries(countriesArray);
  
      const citiesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/cities.json`);
      const citiesData = await citiesRes.json();
      const allCities = Object.keys(citiesData).map(key => ({ id: key, ...citiesData[key], country: countriesArray })); // from object to array
      const citiesArray = allCities.filter(city => city.countryId === country.id);
      setCities(citiesArray);
    }
  
    useEffect(() => {
      getCountries();
    }, []);
    

    const [body, setBody] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (post) {
            setBody(post.body);
            setCity(post.city);
            setCountry(post.country);
            setImage(post.image);
        }
    }, [post]);

    function submitEvent(event) {
        event.preventDefault();
        const formData = { body: body, cityId: city.id, countryId: country.id, img: image };
        handleSubmit(formData);
    }

    return (
        <form onSubmit={submitEvent}>
            <IonItem className="input-item">
                <IonLabel position="floating">Country</IonLabel>
                <IonSelect value={country} placeholder="Select Country" onIonChange={e => setCountry(e.target.value)}>
                    {countries.map(country =>  
                        <IonSelectOption key={country.id} value={country}>{country.name}</IonSelectOption>
                    )}
                </IonSelect>
            </IonItem>
            <IonItem className="input-item">
                <IonLabel position="floating">City</IonLabel>
                <IonSelect value={city} placeholder="Select City" onIonFocus={getCountries} onIonChange={e => setCity(e.target.value)}>
                    {cities.map(city =>  
                        <IonSelectOption key={city.id} value={city}>{city.name}</IonSelectOption>
                    )}
                </IonSelect>
            </IonItem>          
            <IonItem className="input-item">
                <IonLabel position="stacked">Description</IonLabel>
                <IonTextarea value={body} placeholder="Your review destinations" onIonChange={e => setBody(e.target.value)}></IonTextarea>
            </IonItem>
            <IonItem className="input-item">
                <IonLabel position="stacked">Image Url</IonLabel>
                <IonInput value={image} placeholder="Place image url" onIonChange={e => setImage(e.target.value)}></IonInput>
            </IonItem>

            <div className="ion-padding">
                <IonButton type="submit" expand="block">Add</IonButton>
            </div>
        </form>
    );
}
