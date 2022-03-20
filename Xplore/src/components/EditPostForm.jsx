import { IonItem, IonLabel, IonButton, IonTextarea} from "@ionic/react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Toast } from "@capacitor/toast";

export default function EditPostForm({ post, handleSubmit }) {
    const [body, setBody] = useState("");
    const history = useHistory();

    useEffect(() => {
        if(post){
        setBody(post.body);
        }
    }, [post]);

    
    async function submitEvent(event) {
        event.preventDefault();
        const postData = { body: body};
        handleSubmit(postData);
        history.replace("/profilepage");

        
        await Toast.show({
            text: "Your post has been updated!",
            position: "center"
        });
    }
    
    return (
        <form onSubmit={submitEvent}>
                <IonItem className="input-item">
                    <IonLabel position="stacked">Description</IonLabel>
                    <IonTextarea auto-grow="true" value={body} placeholder={post.body} onIonChange={e => setBody(e.target.value)}></IonTextarea>
                </IonItem>
                <IonButton class="ion-margin-horizontal ion-margin-top" type="submit" expand="block">Update</IonButton>
        </form>
    );
}