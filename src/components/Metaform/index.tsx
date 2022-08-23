import React from "react";
import CoreFormRenderer, { IFormRenderer } from "@manojadams/metaforms-core";
import FormControl from "./forms/FormControl";
import { IonApp } from "@ionic/react";
import FormGroup from "./forms/FormGroup";

class FormRenderer extends React.Component<IFormRenderer> {

    constructor(props: IFormRenderer) {
      super(props);
    }
  
    render() {
      return (
        <CoreFormRenderer 
          {...this.props} 
          baseFormControl={FormControl}
          baseFormGroup={FormGroup}
        />
      )
    }
  }
  
  export default FormRenderer;