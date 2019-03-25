import React, { Component } from 'react';

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true
    };
  }

  toggleHide = () => {
    this.setState({
      isHidden: !this.state.isHidden
    });
  };

  render() {
    return (
      <div className='UpdateProfile'>
        <h2>Welcome, Carlito!</h2>
        <div className='profile-img'>
          <img src='http://placekitten.com/g/150/150' alt='' />

          <small onClick={() => this.toggleHide()}>
            Upload profile image
          </small>
          <div
            className={`cloudinary ${
              this.state.isHidden ? 'hidden' : ''
            }`}>
            <form id="photo-upload" encType="multipart/form-data" method='POST' action='/UpdateProfile'>
              <input type='hidden' name='userId' value={props.user ? props.user._id : ''} />
              <input type='file' name='myFile' />
              <input type='submit' className='btn btn-primary' />
            </form>
          </div>
        </div>

        <section className='profile-form'>
          <form>
            <input type='text' name='city' placeholder='City' />
            <input type='text' name='state' placeholder='State' />
            <input type='text' name='zip' placeholder='Zip Code' />
            <button type='submit'>Submit</button>
          </form>
        </section>
      </div>
    );
  }
}

export default UpdateProfile;
