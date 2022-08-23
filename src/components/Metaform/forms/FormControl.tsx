import { IonButton, IonCheckbox, IonDatetime, IonDatetimeButton, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonRadio, IonRadioGroup, IonSelect, IonSelectOption } from "@ionic/react";
import { BaseFormControl } from "@manojadams/metaforms-core";
import Search from "./Search";

export default class FormControl extends BaseFormControl {
    month(): JSX.Element {
        return this.date();
    }
    date(): JSX.Element {
        const meta = this.props.meta;
        return (
            <IonItem>
                <IonLabel position="floating">{meta.displayName}</IonLabel>
                <IonInput value={meta.value+''}></IonInput>
                {/* <IonDatetimeButton datetime="datetime"></IonDatetimeButton> */}
                <IonModal keepContentsMounted={true}>
                    <IonDatetime id="datetime" value={meta.value+''} presentation="date"></IonDatetime>
                </IonModal>
            </IonItem>
        )
    }
    radioButton(): JSX.Element {
        const meta = this.props.form;
        return (
            <div>
                <IonLabel>{meta.displayName}</IonLabel>
                <div className="row">
                    {
                        meta.options && meta.options.map((option, index) => {
                            const color = meta.value === option.value ? 'primary' : 'medium';
                            return (
                                <div className="col" key={index}>
                                    <IonButton color={color} expand="block" fill="outline" size="large"
                                        onClick={()=>{
                                            this.handleChange('', option.value);
                                        }}
                                    >{option.label}</IonButton>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    search(): JSX.Element {
        return (
            <Search 
                context={this.context}
                field={this.field}
                form={this.props.form}
                handleChange={(e: any)=>{
                    const value = e.currentTarget.value;
                    this.handleChange(e, value);
                }}
                section={this.props.section}
                sync={this.props.sync}
            />
        )
    }
    input(type: "text" | "number" | "email" | "password") {
        const meta = this.props.form;
        const value = meta.value + '';
        const placeholder = meta.placeholder || meta.displayName;
        return (
            <IonItem>
                <IonLabel position="floating">{meta.displayName}</IonLabel>
                <IonInput type={type} value={value} placeholder={placeholder} onIonChange={e => this.handleChange}></IonInput>
            </IonItem>
        )
    }
    text(): JSX.Element {
        return (
            this.input("text")
        )
    }
    label(): JSX.Element {
        return (
            <IonLabel>{this.props.form.displayName}</IonLabel>
        )
    }
    password(): JSX.Element {
        return this.input("password");
    }
    email(): JSX.Element {
        return this.input("email");
    }
    number(): JSX.Element {
        return this.input("number");
    }
    radio(): JSX.Element {
        const meta = this.props.form;
        return (
                <IonRadioGroup value={meta.value}>
                    {
                        meta.options && meta.options.map((option, index: number) => 
                            <IonItem key={option.value}>
                                <IonLabel>{option.label}</IonLabel>
                                <IonRadio slot="start" value={option.value} />
                            </IonItem>
                        )
                    }
                </IonRadioGroup>
        )
    }
    checkbox(): JSX.Element {
        const meta = this.props.form;
        return (
            <>
            {
                meta.options && meta.options.map((option, index: number) => 
                    <IonItem key={option.value}>
                        <IonLabel>{option.label}</IonLabel>
                        <IonCheckbox color="primary" checked={option.value === meta.value ? true : undefined} slot="start" value={option.value}></IonCheckbox>
                    </IonItem>
                )
            }
            </>
        )
    }
    select(): JSX.Element {
        const meta = this.props.meta;
        return (
            <IonItem>
                <IonLabel position="floating">{meta.displayName}</IonLabel>
                <IonSelect placeholder={"Select " + meta.displayName} value={meta.value}>
                    {
                        meta.options && meta.options.map(option => <IonSelectOption key={option.value} value={option.value}>{option.label}</IonSelectOption>)
                    }
                </IonSelect>
            </IonItem>
        )
    }
    multiselect(): JSX.Element {
        const meta = this.props.meta;
        return (
            <IonItem>
                <IonSelect placeholder="Select fruit" value={meta.value} multiple>
                    {
                        meta.options && meta.options.map(option => <IonSelectOption value={option.value}>{option.label}</IonSelectOption>)
                    }
                </IonSelect>
            </IonItem>
        )
    }
    button(): JSX.Element {
        throw new Error("Method not implemented.");
    }
    
}