import { IonItem, IonLabel, IonInput, IonTextarea, IonImg, IonButton, IonIcon } from "@ionic/react";
import { useState, useEffect } from "react";

export default function PostForm({ user, handleSubmit }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        if(user){
        setFirstName(user.firstName);
        setLastName(user.lastName);
        }
    }, [user]);

    
    function submitEvent(event) {
        event.preventDefault();
        const userData = { firstName: firstName, lastName: lastName};
        handleSubmit(userData);
    }
    
    return (
        <form onSubmit={submitEvent}>
                <IonItem className="input-item">
                    <IonLabel position="stacked">First name</IonLabel>
                    <IonInput value={firstName} placeholder={user.firstName} onIonChange={e => setFirstName(e.target.value)}></IonInput>
                </IonItem>
                <IonItem className="input-item">
                    <IonLabel position="stacked">Last name</IonLabel>
                    <IonInput value={lastName} onIonChange={e => setLastName(e.target.value)}></IonInput>
                </IonItem>
                <IonButton type="submit" expand="block">Save</IonButton>
            </form>
    );
}