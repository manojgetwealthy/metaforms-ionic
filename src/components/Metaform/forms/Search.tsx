import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal, IonRadio, IonSearchbar } from "@ionic/react";
import { IOption } from "@manojadams/metaforms-core";
import { useContext, useRef } from "react";

const Search = (props: any) => {
    const meta = props.form;
    const modal = useRef<HTMLIonModalElement>(null);
    return (
        <>
            <IonContent fullscreen>
                <IonModal trigger="open-modal" ref={modal}>
                    <IonButtons slot="end">
                        <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                        <IonButton onClick={() => modal.current?.dismiss()}>Submit</IonButton>
                    </IonButtons>
                    <IonSearchbar onInput={(e) => {
                        const config = meta.events?.input || meta.config;
                        const value = e.currentTarget.value;
                        props.context.getData(config, value, props.section, '$input')
                        .then((results: Array<IOption>) => {
                            props.context.setFieldOptions(props.section, props.field.name, results);
                            props.sync();
                            // setLoading(false);
                        }).catch((e: any) => {
                            // setOptions([]);
                            // setLoading(false);
                            // props.context.handleError(error, props.section, props.name);
                            
                        });
                    }}>
                    </IonSearchbar>
                    <IonList>
                        {
                            meta.options && meta.options.map((option: any) => 
                                <IonItem key={option.value}>
                                    <IonLabel>{option.label}</IonLabel>
                                    <IonRadio slot="end" color="success" value={option.value}></IonRadio>
                                </IonItem>
                            )
                        }
                    </IonList>
                </IonModal>
            </IonContent>
        </>
    )
}

export default Search;