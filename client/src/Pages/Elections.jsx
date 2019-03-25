import React from 'react';

const Elections = (props) => {
    return (
        <div className='Elections'>
            <div className='election-link'>
                <h3>Elections</h3>
                <p><a href='https://kingcounty.gov/depts/elections/results/2019/201902.aspx'>February 2019 special election</a></p>
                <p><a href='https://kingcounty.gov/depts/elections/results/2019/201904.aspx'>April 2019 special election</a></p>
                <p><a href='https://kingcounty.gov/depts/elections/results/2019/201908.aspx'>August 2019 primary election</a></p>
                <p><a href='https://kingcounty.gov/depts/elections/results/2019/201911.aspx'>November 2019 general election</a></p>
            </div>

            <div className='registration'>
                <h3>Registration</h3>
                <p><a href='https://kingcounty.gov/depts/elections/how-to-vote/register-to-vote.aspx'>Register to vote</a></p>
                <p><a href='https://weiapplets.sos.wa.gov/MyVote/#/login'>Check if I'm registered</a></p>
            </div>

            <div className='locations'>Locations
                <p><a href='</p>
            </div>
            <div className='volunteer' href='/'>Volunteer</div>
            <div className='candidates' href='/'>Candidates</div>
        </div>
    )
}

export default Elections;