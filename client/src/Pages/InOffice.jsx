import React from 'react';

import OfficeCard from '../Components/OfficeCard';
import { city, county } from '../data/office';

const InOffice = (props) => {
  let cityReps = city.map((rep, i) => {
    return (
      <OfficeCard
        key={i}
        name={rep.name}
        title={rep.title}
        img={rep.img}
      />
    );
  });

  let countyReps = county.map((rep, i) => {
    return (
      <OfficeCard
        key={i}
        name={rep.name}
        title={rep.title}
        img={rep.img}
      />
    );
  });

  return (
    <div className='InOffice'>
      {cityReps}
      {countyReps}
    </div>
  );
};

export default InOffice;
