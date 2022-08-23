import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonRadio, IonRadioGroup, IonSearchbar } from "@ionic/react";
import { IOption } from "@manojadams/metaforms-core";
import { useContext, useEffect, useRef, useState } from "react";

const Search = (props: any) => {
    const meta = props.form;
    const modal = useRef<HTMLIonModalElement>(null);
    const [isOpen, setOpen] = useState(false);
    const option = meta.value ? meta.options?.find((op: any) => op.value === meta.value) : {label:''};

    useEffect(()=>{
        if (props.open) {
            setOpen(true);
        }
    },[props.open])
    return (
        <>
             <IonItem>
                <IonLabel position="floating">{meta.displayName}</IonLabel>
                <IonInput value={option?.label} id="open-modal" placeholder={meta.displayName}
                    onClick={() => {
                        setOpen(true);
                    }}
                ></IonInput>
            </IonItem>
            <IonModal isOpen={isOpen}>
                <IonButtons slot="end">
                    <IonButton onClick={() => setOpen(false)}>Close</IonButton>
                    {/* <IonButton onClick={() => setOpen(false)}>Submit</IonButton> */}
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
                    <IonRadioGroup value={meta.value} onIonChange={props.handleChange}>
                    {
                        meta.options && meta.options.map((option: any) => 
                            <IonItem key={option.value}>
                                <IonLabel>{option.label}</IonLabel>
                                <IonRadio slot="end" color="success" value={option.value}></IonRadio>
                            </IonItem>
                        )
                    }
                    </IonRadioGroup>
                </IonList>
            </IonModal>
            {/* <IonContent fullscreen>
            </IonContent> */}
        </>
    )
}

export default Search;