import React from 'react';

const Elections = (props) => {
  return (
    <div className='Elections'>
      <div className='services'>
        <h2>Services and Information</h2>
        <p>Learn about your city, county, and state.</p>
        <p>
          We serve as an online resource for election information
          and voting services in your community.
        </p>
      </div>

      <div className='election-link'>
        <h2>Elections</h2>
        <p>
          <a href='https://kingcounty.gov/depts/elections/results/2019/201902.aspx'>
            February 2019 Special Election
          </a>
        </p>
        <p>
          <a href='https://kingcounty.gov/depts/elections/results/2019/201904.aspx'>
            April 2019 Special Election
          </a>
        </p>
        <p>
          <a href='https://kingcounty.gov/depts/elections/results/2019/201908.aspx'>
            August 2019 Primary Election
          </a>
        </p>
        <p>
          <a href='https://kingcounty.gov/depts/elections/results/2019/201911.aspx'>
            November 2019 General Election
          </a>
        </p>
      </div>

      <div className='registration'>
        <h2>Registration</h2>
        <p>
          <a href='https://kingcounty.gov/depts/elections/how-to-vote/register-to-vote.aspx'>
            Register to Vote
          </a>
        </p>
        <p>
          <a href='https://weiapplets.sos.wa.gov/MyVote/#/login'>
            Check if I'm Registered
          </a>
        </p>
      </div>

      <div className='locations'>
        <h2>Locations</h2>
        <p>
          <a href='https://kingcounty.gov/depts/elections/how-to-vote/ballots/returning-my-ballot/accessible-voting-centers.aspx'>
            Accessible Voting Centers
          </a>
        </p>
        <p>
          <a href='https://kingcounty.gov/depts/elections/how-to-vote/ballots/returning-my-ballot/ballot-drop-boxes.aspx'>
            List of All Ballot Drop-off Locations
          </a>
        </p>
        <p>
          <a href='https://kingcounty.gov/depts/elections/how-to-vote/register-to-vote/~/link.aspx?_id=36414770BB894F53BD6302A12E7B2302&_z=z'>
            Directions to King County Elections Office
          </a>
        </p>
        <p>
          <a href='https://kingcounty.gov/depts/elections/how-to-vote/register-to-vote/~/link.aspx?_id=760D8A185BA14B5781E50CC50CBEBE57&_z=z'>
            Downloadable Maps
          </a>
        </p>
        <p>
          <a href='https://kingcounty.gov/depts/elections/how-to-vote/register-to-vote/~/~/link.aspx?_id=9C84B888C5774C36975C1C0F23E55086&_z=z'>
            Find My Voting Districts
          </a>
        </p>
      </div>

      <div className='volunteer'>
        <h2>Volunteer</h2>
        <p>
          <a href='https://kingcounty.gov/services/volunteer.aspx'>
            Information for Volunteers
          </a>
        </p>
      </div>

      <div className='candidates'>
        <h2>Candidates</h2>
        <p>
          <a href='https://kingcounty.gov/depts/elections/how-to-vote/ballots/whats-on-the-ballot/candidates/201908.aspx'>
            View the List of Candidates
          </a>
        </p>
        <p>
          <a href='https://kingcounty.gov/depts/elections/for-candidates.aspx'>
            I Want to Run for Office
          </a>
        </p>
      </div>
    </div>
  );
};

export default Elections;
