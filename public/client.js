
document.addEventListener('DOMContentLoaded', function () {
  function compileTemplate(selector) {
    let template = document.querySelector(selector);
    let templateInstance = Handlebars.compile(template.innerHTML);
    return templateInstance;
  };
  // alert("alert from client");

  //console.log(document.querySelector('#userInputName'));
  //Reference template from the DOM by Template class names
  //const issuesTemplate = document.querySelector('.issuesTemplate');
  // console.log("TEMPLATE:", issuesTemplate);
  //Creating and compiling template instances
  //const issuesTemplateInstance = Handlebars.compile(issuesTemplate.innerHTML);

  //Reference template from the DOM by Template class names
  // const userIssuesTemplate = document.querySelector('.userIssuesTemplate');
  // console.log("TEMPLATE:", userIssuesTemplate);
  //Creating and compiling template instances
  //const userIssuesTemplateInstance = Handlebars.compile(userIssuesTemplate.innerHTML);


  const showIssuesForBtn = document.querySelector('.issuesFor');
  const addIssueBtn = document.querySelector('.addIssue');

  const selectElem = document.querySelector('#issuesDiv');



  // Client side Factory function
  const wastePlanService = WastePlanService();

  async function users() {
    const users = await wastePlanService.getUsers();
    console.log("Users: ", users);
  }


  // const url = `https://geocoder.api.here.com/6.2/geocode.json?searchtext=samora machel&app_id=DnSYeWcQdc7VGpTWdf3R&app_code=MsbWu2efljEK5A7w_hrs_g&gen=8`;
  // const APP_ID = `DnSYeWcQdc7VGpTWdf3R`;
  // const APP_CODE = `MsbWu2efljEK5A7w_hrs_g`;
  // var searchText = '';

  // addIssueBtn.addEventListener('click', async(e) => {
  //   e.preventDefault();

  //   const response = await wastePlanService.getUser('jason');
  //   const results = response.data;
  //   const user = results.data;

  //   searchText = user.address;

  //   if(user) {
  //     const response = await axios.get(`https://geocoder.api.here.com/6.2/geocode.json?searchtext=${searchText}&app_id=${APP_ID}&app_code=${APP_CODE}&gen=8`);
  //     const results = response.data;
  //     const data = results.Response.View[0].Result[0].Location.DisplayPosition;

  //     const latitude = data.Latitude;
  //     const longitude = data.Longitude;

  //     // console.log("Lat: ", latitude);
  //     // console.log("Long: ", longitude);
  //     // console.log("User Id", user.id);

  //     var selectedValue = "";
  //     if(document.getElementById('deliveryCheck').checked) {
  //       selectedValue = document.getElementById('deliveryCheck').value;
  //     }else if(document.getElementById('collectionCheck').checked) {
  //       selectedValue = document.getElementById('collectionCheck').value;
  //     }

  //     const newIssue = {
  //       userId: user.id,
  //       date: new Date(),
  //       type: selectedValue, //get type of input
  //       status: true,
  //       latitude: latitude,
  //       longitude: longitude
  //     };

  //     await wastePlanService.addIssue(newIssue);

  //     const test = await wastePlanService.getIssues();
  //     const testresults = test.data;

  //     let issuessHTML = issuesTemplateInstance({ issues: testresults.data });
  //     selectElem.innerHTML = issuessHTML;

  //     //console.log("API DATA: ",response.data.Response.View[0].Result[0].Location.DisplayPosition);
  //   }


  // });




  const signupBtn = document.querySelector('#signupBtn');
  const signinBtn = document.querySelector('#signinBtn');


  async function signup(e) {
    e.preventDefault();

    let nameVal = document.querySelector('#signupname').value;
    let emailVal = document.querySelector('#signupemail').value;
    let usernameVal = document.querySelector('#signupusername').value;
    let passwordVal = document.querySelector('#signuppassword').value;
    let addressVal = document.querySelector('#signupaddress').value;

    let newUser = {
      name: nameVal,
      email: emailVal,
      username: usernameVal,
      password: passwordVal,
      address: addressVal,
      usertype: 'user'
    };

    try {
      const response = await wastePlanService.signupUser(newUser);
      let message = response.data.message;
      // alert(message);
      // console.log(message);//Create a username variable on local storage
      // alert("about to create variable on local storage");
      // first check if there isn't any value in storage then save
      // remove any with the same name//Create a username variable on lo//Create a username variable on local storage
      // alert("about to create variable on local storage");
      // first check if there isn't any value in storage then save
      // remove any with the same name

      storage(usernameVal);
      // alert("about to create variable on local storage");
      // first check if there isn't any value in storage then save
      // remove any with the same name

      storage(usernameVal);

      storage(usernameVal);
      window.location = "/user.html";
    } catch (error) {
      console.log(error);
    }

  }
  // let userInputName = document.querySelector('#userInputName')
  // console.log(userInputName.value)

  function storage(theName) {
    localStorage.setItem('wastePlanUser', theName);
  };

  async function login() {
    try {
      let loginUsername = document.querySelector('#signinusername').value;
      let loginPassword = document.querySelector('#signinpassword').value;

      let data = {
        username: loginUsername,
        password: loginPassword
      };

      const response = await wastePlanService.loginUser(data);
      const results = response.data;

      if (results.success) {
        //Create a username variable on local storage
        // alert("about to create variable on local storage");
        // first check if there isn't any value in storage then save
        // remove any with the same name

        storage(loginUsername);


        const userResponse = await wastePlanService.getUser(loginUsername);
        const userResults = userResponse.data;
        const user = userResults.data;

        // let userInputName = document.querySelector('#userInputName')
        // // userInputNameVal = "wewewewe";
        // console.log(userInputName)

        if (user.usertype == 'user') {
          //alert('success');
          // let userInputNameVal = document.querySelector('#userInputName').value;
          // alert(userInputNameVal)
          // console.log(userInputName)
          //document.querySelector('#userInputName').value = "sdsdsdsd"
          window.location = "/user.html";
        } else {
          window.location = "/admin.html";
        }

        //Store the username in the local storage
        //Then redirect the user to the required page
        // window.location = "https://wasteplan404-webapp.herokuapp.com/";
      } else {
        alert(results.message);
      }

    }
    catch (error) {
      console.log(error);
    }
  }
  signupBtn.addEventListener('click', signup);
  signinBtn.addEventListener('click', login);





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


  function signupUser(data) {
    return axios.post('/api/users/add', data);
  }

  function loginUser(data) {
    return axios.post('/api/login', data);
  }




  return {
    getUsers,
    getIssues,
    getAllFor,
    getUser,
    addIssue,

    signupUser,
    loginUser

  };
}