import './ExploreContainer.css';
import Metaform from "./Metaform";
import { useEffect, useState } from 'react';
import {ISchema} from '@manojadams/metaforms-core/dist/constants/model-interfaces';
import FormGroup from './Metaform/forms/FormGroup';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {

  const [schema, setSchema] = useState<ISchema>();
  useEffect(() => {
    fetch('https://api.wealthyinsurancedev.in/api/v0/four-wheeler/schema-form/basic_form').then(response => response.json())
    .then(response => {
      setSchema(response.data);
    });
  }, []);

  return (
    <>
      {
        schema &&
        <Metaform schema={schema} onSubmit={()=>{
          console.log('hi');
          
        }}/>
      }
    </>
  );
};

export default ExploreContainer;
