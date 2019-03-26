import React from 'react';
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

export default InOffice;
