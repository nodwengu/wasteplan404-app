
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




  return {
    getUsers,
    getIssues,
    getAllFor
   
  };
}