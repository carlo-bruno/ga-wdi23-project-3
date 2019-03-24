import React from 'react';

const Elections = (props) => {
    return (
        <div className='Elections'>
            <div className='election-link' href='/'>Elections</div>
            <div className='registration' href='/'>Registration</div>
            <div className='locations' href='/'>Locations</div>
            <div className='volunteer' href='/'>Volunteer</div>
            <div className='candidates' href='/'>Candidates</div>
        </div>
    )
}

export default Elections;