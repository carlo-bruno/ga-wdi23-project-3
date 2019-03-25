import React from 'react';

const Elections = (props) => {
    return (
        <div className='Elections'>
            <div className='election-link' href='https://kingcounty.gov/depts/elections/elections/election-dates.aspx'>Elections</div>
            <div className='registration' href='https://weiapplets.sos.wa.gov/MyVote/#/login'>Registration</div>
            <div className='locations' href='https://kingcounty.gov/depts/elections/how-to-vote/ballots/returning-my-ballot.aspx'>Ballot Locations</div>
            <div className='candidates' href='https://kingcounty.gov/depts/elections/how-to-vote/ballots/whats-on-the-ballot.aspx'>Candidates</div>
            <div className='volunteer' href='https://kcelections.com/'>Stay Up to Date on Election Information</div>
        </div>
    )
}

export default Elections;