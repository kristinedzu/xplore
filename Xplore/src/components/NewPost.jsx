import { IonItem, IonLabel, IonInput, IonTextarea, IonImg, IonButton, IonIcon, IonSelectOption, IonSelect } from "@ionic/react";
import { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Camera, CameraResultType } from "@capacitor/camera";
import { add } from 'ionicons/icons';
import { citiesRef } from "../firebase-config";
import { push, set } from "@firebase/database";

export default function NewPostForm({ post, handleSubmit }) {
    const [countries, setCountries] = useState([]);
  
    async function getCountries() {
      const countriesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/countries.json`);
      const countriesData = await countriesRes.json();
      const countriesArray = Object.keys(countriesData).map(key => ({ id: key, ...countriesData[key]})); // from object to array
      setCountries(countriesArray);
  
      const citiesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/cities.json`);
      const citiesData = await citiesRes.json();
      const allCities = Object.keys(citiesData).map(key => ({ id: key, ...citiesData[key], country: countriesArray })); // from object to array
      const citiesArray = allCities.filter(city => city.countryId === country.id);
      return citiesArray;
    }
  
    useEffect(() => {
      getCountries();
    }, []);
    

    const [body, setBody] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [review, setReview] = useState("");
    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState("");

    useEffect(() => {
        if (post) {
            setBody(post.body);
            setCountry(post.country);
            setCity(post.city);
            setReview(post.review);
            setImage(post.img);
        }
    }, [post]);

    const ratingChanged = (newRating) => {
        setReview(newRating);
    };

    async function submitEvent(event) {
        event.preventDefault();

        const data = await getCountries();
        const findCity = data.find(thisCity => thisCity.name == city);
        if(findCity) {
            const cityId = findCity.id;
            const formData = { body: body, cityId: cityId, countryId: country.id, review: review, img: imageFile };
            handleSubmit(formData);
        } else {
            const newCity = { countryId: country.id, name: city };

            async function addCity(newCity) {

                const newCityRef = push(citiesRef);
                await set(newCityRef, newCity);
            }

            addCity(newCity);
            
            const createdCityData = await getCountries();
            const createdCity = createdCityData.find(thisCity => thisCity.name == city);
            const formData = { body: body, cityId: createdCity.id, countryId: country.id, review: review, img: imageFile };
            handleSubmit(formData);
        }
    }

    async function takePicture() {
        const image = await Camera.getPhoto({
          quality: 90,
          width: 500,
          allowEditing: true,
          resultType: CameraResultType.DataUrl
        });
        //let imageUrl = image.webPath;
        setImageFile(image);
        setImage(image.dataUrl);
        // Can be set to the src of an image now
        //ioimageElement.src = imageUrl;
      };
    

    return (
        <form onSubmit={submitEvent}>
            {/* <IonItem className="input-item">
                <IonLabel position="stacked">Upload image</IonLabel>
                <IonInput value={image} placeholder="Place image url" onIonChange={e => setImage(e.target.value)}></IonInput>
            </IonItem> */}
            <IonItem lines="none">
                {image && <IonImg className="ion-padding preview-img"src={image} onClick={takePicture} />}
                <IonButton onClick={takePicture}>
                    <IonIcon slot="icon-only" icon={add} />
                </IonButton>
            </IonItem>
            <IonItem className="input-item">
                <IonLabel position="floating">Country</IonLabel>
                <IonSelect value={country} placeholder="Select Country" onIonChange={e => setCountry(e.target.value)}>
                    {countries.map(country =>  
                        <IonSelectOption key={country.id} value={country}>{country.name}</IonSelectOption>
                    )}
                </IonSelect>
            </IonItem>
            <IonItem className="input-item">
                <IonLabel position="stacked">City</IonLabel>
                <IonInput value={city} placeholder="Type city" onIonChange={e => setCity(e.target.value)}></IonInput>
            </IonItem>           
            <IonItem className="input-item">
                <IonLabel position="stacked">Description</IonLabel>
                <IonTextarea value={body} placeholder="Your review destinations" onIonChange={e => setBody(e.target.value)}></IonTextarea>
            </IonItem>
            <IonItem className="input-item">
                <IonLabel position="stacked">Rate your experience</IonLabel>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                />
            </IonItem>

            <div className="ion-padding">
                <IonButton type="submit" expand="block">Add</IonButton>
            </div>
        </form>
    );
}
