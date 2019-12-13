

document.addEventListener('DOMContentLoaded', function () {
  function compileTemplate(selector) {
    let template = document.querySelector(selector);
    let templateInstance = Handlebars.compile(template.innerHTML);
    return templateInstance;
  };
  const issuesTemplate = document.querySelector('.issuesTemplate');
  const issuesTemplateInstance = Handlebars.compile(issuesTemplate.innerHTML);
  


  // const logoutBtn = document.querySelector('#adminLogout');
  const selectElem = document.querySelector('#issuesDiv');
  const adminLogoutBtn = document.querySelector('#adminLogout');


  // Client side Factory function
  const wastePlanService = WastePlanService();

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

  async function logout(evt) {
    evt.preventDefault();
    // Remove key in local storage if there is any

    window.location = "/";  
  }

  adminLogoutBtn.addEventListener('click', logout);

  showIssues();

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


  // Return datas for a specific user
  function getUser(username) {
    return axios.get(`/api/user/${username}`);
  }

  // function addIssue(data) {
  //   return axios.post('/api/addIssue', data);
  // }


  // function signupUser(data) {
  //   return axios.post('/api/users/add', data);
  // }

  // function loginUser(data) {
  //   return axios.post('/api/login', data);
  // }




  return {
    // getUsers,
     getIssues,
   
    // getUser,
    // addIssue,

    // signupUser,
    // loginUser

  };
}
