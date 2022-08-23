import { IonLabel, IonTabBar, IonTabButton, IonTabs, IonRouterOutlet } from "@ionic/react";
import { BaseFormGroup, IField } from "@manojadams/metaforms-core";
import { Redirect, Route } from "react-router";
import Section from "./Section";
import { IonReactRouter } from '@ionic/react-router';

export default class FormGroup extends BaseFormGroup {
    tabs(): JSX.Element {
        const tab1 = this.tabFields[0];
        return (
            <IonReactRouter>
                <IonTabs>
                    <IonTabBar slot="bottom">
                        {
                            this.state.tabFields.map((tabField: IField, index: number)=>{
                                return (
                                    <IonTabButton tab={tabField.name} href={"/tabs/"+tabField.name} key={index}>
                                        <IonLabel>{tabField.meta.displayName}</IonLabel>
                                    </IonTabButton>
                                )
                            })
                        }
                    </IonTabBar>
                    <IonRouterOutlet>
                        {
                            this.state.tabFields.map((tabField: IField, index: number)=>{
                                return (
                                    <Route key={index} path={"/tabs/" + tabField.name} render={() => {
                                        return this.panel(tabField.name, index)
                                    }}/>
                                )
                            })
                        }
                        <Redirect path="/" to={"/tabs/"+tab1.name} exact/>
                    </IonRouterOutlet>
                </IonTabs>
            </IonReactRouter>
        )
    }
    panel(sectionName: string, index: number) {
        const section = this.sectionFields.find(s => s.name === sectionName);
        return (
            <>
            {
                section && 
                <Section 
                    key={section.name} 
                    section={section} 
                    index={index}
                    error={this.state.error.section === section.name}
                    form={this.context.form} activeIndex={this.state.activeIndex}/>
            }
            </>
        )
    }
    panels(): JSX.Element {
        return <></>
    }
    
}