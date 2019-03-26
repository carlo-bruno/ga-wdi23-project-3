import React from 'react';
<<<<<<< HEAD
import { city } from '../data/office';

=======
import OfficeCard from '../Components/OfficeCard'
import {city, county} from '../data/office'



const InOffice = (props) => {



  let cityReps = city.map(rep => {
     return(<div> 
      <OfficeCard name={rep.name} title={rep.title} img={rep.img} />
    </div>)

  })

  let countyReps = county.map(rep => {
    return(<div> 
      <OfficeCard name={rep.name} title={rep.title} img={rep.img}/>
   </div>)

 })

  return (
    <div>
    {cityReps}
    {countyReps}
      {
        // OfficeCard
        // OfficeCard
        // OfficeCard
        //
      }
    </div>
  );
};
>>>>>>> 22da874e415c60967ffb6f7071d26462e86426bb

