import { IonItem, IonLabel, IonTextarea, IonButton, IonAlert } from "@ionic/react";
import { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";

export default function NewCommentForm({ comment, handleSubmit }) {
    const [showAlert1, setShowAlert1] = useState(false);

    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (comment) {
            setBody(comment.body);
            setTitle(comment.title);
        }
    }, [comment]);

   
    async function submitEvent(event) {
        event.preventDefault();

        if(!body || !title ) {
            setShowAlert1(true);
        } else {
            const formData = { comment: body, title: title };
            handleSubmit(formData);
        }
    }

    return (
        <form onSubmit={submitEvent} className="form-container">
            <IonItem className="input-item">
                <IonLabel position="stacked">Title</IonLabel>
                <IonTextarea value={title} placeholder="Title for your review" onIonChange={e => setTitle(e.target.value)}></IonTextarea>
            </IonItem>
            <IonItem className="input-item">
                <IonLabel position="stacked">Comment</IonLabel>
                <IonTextarea value={body} placeholder="Your review for this place" onIonChange={e => setBody(e.target.value)}></IonTextarea>
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
