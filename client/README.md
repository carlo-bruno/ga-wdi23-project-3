# Citizenly React Front-end
Initial Planning

    We spent the initial phases attacking project ideas and user stories. We brainstormed a lot and wanted all participants on the same page about our efforts so that we all feel motivated and excited to execute this project. We all agreed we wanted to help a user better understand a specific topic through transparency and organization. We centered in on how to help inexperienced citizen become more active in local politics. We will be including MapBox to make attending easy and accessible. We want to give the user all the resources to do their own research and participate within their area. 

User Stories:

    “I want to get into local politics but I don’t know where to begin. “

    “I like following politics but there are so many biased, how to I get fact based, politic driven local data “


    “I want to be able to plan and know whats going on around me when it comes to local elections and representatives”

    “I want to know more basic information about local politicians, like straight access to their social media, voting  history and up coming policies/votes.”

    Additionally, although this app is catered to a person who is taking the initiative to get more involved in local   politics, but we also wanted a user to skip the full profile and also be able to search for local information based   solely on their  zip code. So User profiles are optional but will create a better user experience but an  un-invested user will be able to see local events and upcoming elections as well. 

Technologies Used:

    Express
    Mongoose
    Express JWT
    RateLimit
    Axios
    Multer
    Cloudinary
    Cloudinary Storage
    Multer
    Momentum
    Mapbox
    dotenv

Styling and UX:

    Since this app was ultimately created to encourage users to get involved with political events (more than not   surrounded with descriptions like 'boring', 'pointless', and disorganzied'), we focused on simplicity, readability    and direct to source links. 
    We also wanted to focus on the app being used by any individual, not just someone interested specifically in    politics and chose green as a welcoming but un-affiliated color regarding politics. 
    Creating one's own profile to upload a photo, change locations is needed, and being able to save events to their page was going to be the major functionality of our app. We added political resources and elected officals as additional resources to encourage research and fact-checking throughout the local political process. 

Data and APIs

    After looking through API’s we concluded that a national scope is too broad for local government via the data we    found. We decided to focus on just Washington state local government and found some great resources on City Council    representatives, local community and government events. We are hoping to be able to pull from the same API,    depending on how we can query endpoints but decided to shift our vision to be event oriented and take from two     Gov.data API as well as a MeetUP Api that can be selected specifically for political events. We created functions   for each so that we could compile and do an axiosAll call. We also added Momentum for more user readability while     referencing dates. 

Our APIs:

    Meetup API
    	 let url = 'https://api.meetup.com/2/concierge?&sign=true&photo-	host=public&zip=98102&category_id=13'
    
     Community Outreach Events
    	 let url = 'https://data.seattle.gov/resource/OutreachEventCalendar.json'
    
     City Council Events Calendar
     	let url = 'https://data.seattle.gov/resource/mjjw-fp32.json'

    We used all through Apis by making them all fit into the same object form with keys values we needed; event Name,   venue, street address, event url, latitude/longitude and event description. We then simply concatenated the three     apis into one array to be able to access all the data at once.
    
    Since we could not find a functional API for local representatives in office and their information, we made     multiple objects with various representative data we could use. Although this won’t automatically be updated, we    felt that since we are focusing on just Seattle, we could hard code that information and update as needed. 

React Pages and Components

```bash
App (Class)
│
├─ Pages
│  ├─ LandingPage
│  │
│  ├─ Profile
│  │  ├─ CreateProfile
│  │  └─ UpdateProfile
│  │
│  ├─ Events (Class)
│  │  └─ EventShow
│  │
│  ├─ InOffice
│  │  └─ Representative
│  │
│  └─ Elections
│
└─  Components
   ├─ Header
   ├─ MenuBar
   │
   ├─ EventCard
   ├─ OfficeCard
   │
   ├─ Mapbox
   │
   ├─ Login (Class)
   └─ Signup (Class)
```
