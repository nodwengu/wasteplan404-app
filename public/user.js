

document.addEventListener('DOMContentLoaded', function () {
  function compileTemplate(selector) {
    let template = document.querySelector(selector);
    let templateInstance = Handlebars.compile(template.innerHTML);
    return templateInstance;
  };

  //Reference template from the DOM by Template class names
  const userIssuesTemplate = document.querySelector('.userIssuesTemplate');
 
  //Creating and compiling template instances
  const userIssuesTemplateInstance = Handlebars.compile(userIssuesTemplate.innerHTML);

  
  const usernameTemplate = document.querySelector('.usernameTemplate');
  const usernameTemplateInstance = Handlebars.compile(usernameTemplate.innerHTML);

  const addressTemplate = document.querySelector('.addressTemplate');
  const addressTemplateInstance = Handlebars.compile(addressTemplate.innerHTML);



  const addIssueBtn = document.querySelector('.addIssue');
  const selectElem = document.querySelector('#userIssuesDiv');
  const userLogoutBtn = document.querySelector('#userLogout');


  // Client side Factory function
  const wastePlanService = WastePlanService();

  async function showUserInfo() {
    try {
      let username = "";

      // Get user with username on storage if it exists
      if (localStorage.getItem("wastePlanUser") === null) {
        alert("storage is empty");
      } else {
        username = localStorage.getItem("wastePlanUser");
      }

      const response = await wastePlanService.getUser(username);
      const result = response.data;
      const user = result.data;
 
      if(user) {
        let addressTextareaElem = document.querySelector('#addressTextarea');
        let userInputNameElem = document.querySelector('#userInputName');

        userInputNameVal = userInputNameElem.value;
        addressTextareaVal = addressTextareaElem.value;
        userInputNameVal = user.name;
        addressTextareaVal = user.address;

        let nameInputHTML = usernameTemplateInstance({ userInputNameVal });
        document.querySelector('#nameInput').innerHTML = nameInputHTML;

        let addressInputHTML = addressTemplateInstance({ addressTextareaVal });
        document.querySelector('#addressTextarea').innerHTML = addressTextareaVal;
     
      }
    } 
    catch (error) {
      console.log(error);
    }
  }
  showUserInfo();

  

  async function logout(evt) {
    evt.preventDefault();
    // Remove key in local storage if there is any

    window.location = "/";  
  }

  userLogoutBtn.addEventListener('click', logout);

  async function showIssuesFor() {
    try {
      let username = "";

      // Get user with username on storage if it exists
      if (localStorage.getItem("wastePlanUser") === null) {
        alert("storage is empty");
      } else {
        username = localStorage.getItem("wastePlanUser");
      }
 
      const response = await wastePlanService.getAllFor(username);
      const results = response.data;
      const data = results.data;

      let userIssuessHTML = userIssuesTemplateInstance({ userIssues: results.data });
      selectElem.innerHTML = userIssuessHTML;

      console.log("Issues For: ", results.data);
      //console.log(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  showIssuesFor();

  const url = `https://geocoder.api.here.com/6.2/geocode.json?searchtext=samora machel&app_id=DnSYeWcQdc7VGpTWdf3R&app_code=MsbWu2efljEK5A7w_hrs_g&gen=8`;
  const APP_ID = `DnSYeWcQdc7VGpTWdf3R`;
  const APP_CODE = `MsbWu2efljEK5A7w_hrs_g`;
  var searchText = '';


  addIssueBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    let username = "";
    // Get user with username on storage if it exists
    if (localStorage.getItem("wastePlanUser") === null) {
      alert("storage is empty");
    } else {
      username = localStorage.getItem("wastePlanUser");
    }


    const response = await wastePlanService.getUser(username);
    const results = response.data;
    const user = results.data;

    searchText = user.address;

    if (user) {
      const response = await axios.get(`https://geocoder.api.here.com/6.2/geocode.json?searchtext=${searchText}&app_id=${APP_ID}&app_code=${APP_CODE}&gen=8`);
      const results = response.data;
      const data = results.Response.View[0].Result[0].Location.DisplayPosition;

      const latitude = data.Latitude;
      const longitude = data.Longitude;

      var selectedValue = "";
      if (document.getElementById('deliveryCheck').checked) {
        selectedValue = document.getElementById('deliveryCheck').value;
      } else if (document.getElementById('collectionCheck').checked) {
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

      const addResponse = await wastePlanService.addIssue(newIssue);
      if(addResponse) {
        showIssuesFor();
      }

    }
    

  });

  return {
    showIssuesFor
  };

});



function WastePlanService() {

  //Return all users
  function getUsers() {
    return axios.get('/api/users');
  }

  // Return all issues
  // function getIssues() {
  //   return axios.get('/api/issues');
  // }

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


  // function signupUser(data) {
  //   return axios.post('/api/users/add', data);
  // }

  // function loginUser(data) {
  //   return axios.post('/api/login', data);
  // }




  return {
    // getUsers,
    // getIssues,
    getAllFor,
    getUser,
    addIssue,

    // signupUser,
    // loginUser

  };
}
