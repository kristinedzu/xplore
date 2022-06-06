import { IonItem, IonLabel, IonInput, IonTextarea, IonImg, IonButton, IonIcon, IonSelectOption, IonSelect, IonGrid, IonRow, IonAlert } from "@ionic/react";
import { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Camera, CameraResultType } from "@capacitor/camera";
import { add } from 'ionicons/icons';
import { citiesRef } from "../firebase-config";
import { push, set } from "@firebase/database";

const customActionSheetOptions = {
    header: 'Countries',
    subHeader: 'Select the country that you have been to'
};


export default function NewPostForm({ post, handleSubmit }) {
    const [countries, setCountries] = useState([]);
    const [showAlert1, setShowAlert1] = useState(false);
  
    async function getCountries() {
      const countriesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/countries.json`);
      const countriesData = await countriesRes.json();
      const countriesArray = Object.keys(countriesData).map(key => ({ id: key, ...countriesData[key]})); // from object to array
      setCountries(countriesArray);
  
      const citiesRes = await fetch(`https://xplore-cf984-default-rtdb.europe-west1.firebasedatabase.app/cities.json`);
      const citiesData = await citiesRes.json();
      const allCities = Object.keys(citiesData).map(key => ({ id: key, ...citiesData[key] })); // from object to array
      return allCities;
    }
  
    useEffect(() => {
      getCountries();
    }, []);

    const [body, setBody] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [review, setReview] = useState("");
    const [postImage, setImage] = useState("");
    const [postImageFile, setImageFile] = useState("");

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

        if(!city || !body || !country || !review || !postImageFile) {
            setShowAlert1(true);
        } else {
            const data = await getCountries();
            const findCity = data.find(thisCity => thisCity.name == city);
            if(findCity) {
                const cityId = findCity.id;
                if(body) {
                    console.log(body);
                }
                const formData = { body: body, cityId: cityId, countryId: country.id, review: review, img: postImageFile };
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
                const formData = { body: body, cityId: createdCity.id, countryId: country.id, review: review, img: postImageFile };
                handleSubmit(formData);
            }
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
        <form onSubmit={submitEvent} className="form-container">
            {/* <IonItem className="input-item">
                <IonLabel position="stacked">Upload image</IonLabel>
                <IonInput value={image} placeholder="Place image url" onIonChange={e => setImage(e.target.value)}></IonInput>
            </IonItem> */}
            <IonGrid>
              <IonRow class='ion-justify-content-center'>
                {postImage ? <IonItem className="img-space">
                    {postImage && <IonImg className="post-img-preview" src={postImage} onClick={takePicture}/>}
                </IonItem> : <IonItem>
                    {postImage && <IonImg className="post-img-preview" src={postImage} onClick={takePicture}/>}
                </IonItem>}
              </IonRow>
              <IonRow class='ion-justify-content-center'>
                <IonButton onClick={takePicture}>
                    <IonIcon slot="icon-only" icon={add} />
                </IonButton>
              </IonRow>
            </IonGrid>
            <IonItem className="input-item">
                <IonLabel position="floating">Country</IonLabel>
                <IonSelect interface="action-sheet" interfaceOptions={customActionSheetOptions} value={country} placeholder="Select Country" onIonChange={e => setCountry(e.target.value)} required>
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
            <IonItem lines="none" className="input-item">
                <IonLabel position="stacked">Rate your experience</IonLabel>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={32}
                    activeColor="#ffd700"
                    required
                />
            </IonItem>

            <div className="ion-padding">
                <IonButton type="submit" expand="block">Add</IonButton>
            </div>
            <IonAlert
                isOpen={showAlert1}
                onDidDismiss={() => setShowAlert1(false)}
                header={'Please fill out all fields'}
                buttons={['OK']}
            />
        </form>
    );
}
