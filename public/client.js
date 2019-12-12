
document.addEventListener('DOMContentLoaded', function () {
  function compileTemplate(selector) {
    let template = document.querySelector(selector);
    let templateInstance = Handlebars.compile(template.innerHTML);
    return templateInstance;
  };

  //Reference template from the DOM by Template class names
  const issuesTemplate = document.querySelector('.issuesTemplate');

  //Creating and compiling template instances
  const issuesTemplateInstance = Handlebars.compile(issuesTemplate.innerHTML);


  const showIssuesForBtn = document.querySelector('.issuesFor');
  const addIssueBtn = document.querySelector('.addIssue');

  const selectElem = document.querySelector('#issuesDiv');



  // Client side Factory function
  const wastePlanService = WastePlanService();

  async function users() {
    const users = await wastePlanService.getUsers();
    console.log("Users: ", users);
  }

  async function showIssues() {
    try {
      const response = await wastePlanService.getIssues();
      const results = response.data;

      let issuessHTML = issuesTemplateInstance({ issues: results.data });
      selectElem.innerHTML = issuessHTML;
      
      console.log("Issues: ", results.data);

    } 
    catch (error) {
      console.log(error);
    }
  
  }

 

  users();
  showIssues();

  
  showIssuesForBtn.addEventListener('click', async function() {
    try {
      const response = await wastePlanService.getAllFor('user1');
      const results = response.data;
      const data = results.data;
      console.log(data);
    } 
    catch (error) {
      console.log(error);
    }
  });
  const url = `https://geocoder.api.here.com/6.2/geocode.json?searchtext=samora machel&app_id=DnSYeWcQdc7VGpTWdf3R&app_code=MsbWu2efljEK5A7w_hrs_g&gen=8`;
  const APP_ID = `DnSYeWcQdc7VGpTWdf3R`;
  const APP_CODE = `MsbWu2efljEK5A7w_hrs_g`;
  var searchText = '';

  addIssueBtn.addEventListener('click', async(e) => {
    e.preventDefault();

    const response = await wastePlanService.getUser('user1');
    const results = response.data;
    const user = results.data;

    searchText = user.address;

    if(user) {
      const response = await axios.get(`https://geocoder.api.here.com/6.2/geocode.json?searchtext=${searchText}&app_id=${APP_ID}&app_code=${APP_CODE}&gen=8`);
      const results = response.data;
      const data = results.Response.View[0].Result[0].Location.DisplayPosition;

      const latitude = data.Latitude;
      const longitude = data.Longitude;

      console.log("Lat: ", latitude);
      console.log("Long: ", longitude);
      console.log("User Id", user.id);

      var selectedValue = "";
      if(document.getElementById('deliveryCheck').checked) {
        selectedValue = document.getElementById('deliveryCheck').value;
      }else if(document.getElementById('collectionCheck').checked) {
        selectedValue = document.getElementById('collectionCheck').value;
      }
      
      const newIssue = {
        userId: user.id,
        date: new Date(),
        type: selectedValue, //get type of input
        status: true,
        latitude: latitude,
        longitude: longitude
      };

      await wastePlanService.addIssue(newIssue);
      
      const test = await wastePlanService.getIssues();
      const testresults = test.data;

      let issuessHTML = issuesTemplateInstance({ issues: testresults.data });
      selectElem.innerHTML = issuessHTML;
      
      //console.log("API DATA: ",response.data.Response.View[0].Result[0].Location.DisplayPosition);
    }

  
  });






});


function WastePlanService() {

  //Return all users
  function getUsers() {
    return axios.get('/api/users');
  }

  // Return all issues
  function getIssues() {
    return axios.get('/api/issues');
  }

  // Return issues for a specific user
  function getAllFor(username) {
    return axios.get(`/api/issues/${username}`);
  }

  // Return datas for a specific user
  function getUser(username) {
    return axios.get(`/api/user/${username}`);
  }

  function addIssue(data) {
    return axios.post('/api/addIssue', data);
  }




  return {
    getUsers,
    getIssues,
    getAllFor,
    getUser,
    addIssue
   
  };
}