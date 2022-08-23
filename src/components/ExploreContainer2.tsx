import './ExploreContainer.css';
import Metaform from "./Metaform";
import { useEffect, useState } from 'react';
import {ISchema} from '@manojadams/metaforms-core/dist/constants/model-interfaces';
import { IonContent, IonLabel, IonRouterOutlet, IonTab, IonTabButton, IonTabs, IonToolbar } from '@ionic/react';
import { Route } from 'react-router';

interface ContainerProps { }

const ExploreContainer2: React.FC<ContainerProps> = () => {

  const [schema, setSchema] = useState<ISchema>();
  useEffect(() => {
    fetch('https://api.wealthyinsurancedev.in/api/v0/four-wheeler/schema-form/basic_form').then(response => response.json())
    .then(response => {
      setSchema(response.data);
    });
  }, []);

  return (
    <div className="container">
      <p>Hi, this is manoj</p>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact={true} path="/" render={()=>{
            return (<IonTab tab="tab1">
              <IonContent>
              Hi, this is tab 1
            </IonContent>
            </IonTab>)
          }}/>
        </IonRouterOutlet>
        <IonToolbar slot="bottom">
          <IonTabButton tab="tab1" href={"/tabs1"}>
              <IonLabel>Tab1</IonLabel>
          </IonTabButton>
        </IonToolbar>
        {/* <IonTab tab='tab1'>
          <IonContent>
            Hi, this is tab 2
          </IonContent>
        </IonTab> */}
      </IonTabs>
    </div>
  );
};

export default ExploreContainer2;
