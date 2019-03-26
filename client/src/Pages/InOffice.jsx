import React from 'react';

import OfficeCard from '../Components/OfficeCard';

const InOffice = (props) => {
  let cityReps = props.office.city.map((rep, i) => {
    return (
      <OfficeCard
        key={i}
        name={rep.name}
        title={rep.title}
        img={rep.img}
      />
    );
  });

  let countyReps = props.office.county.map((rep, i) => {
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
      <section>
        <h2>Seattle City Council:</h2>
        {cityReps}
        <h2>King County Council:</h2>
        {countyReps}
      </section>
    </div>
  );
};

export default InOffice;
