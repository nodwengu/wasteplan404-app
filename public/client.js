
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


  const showIssuesBtn = document.querySelector('.showIssues');

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

  
  // showIssuesBtn.addEventListener('click', function() {
   
  // });






});


function WastePlanService() {

  function getUsers() {
    return axios.get('/api/users');
  }

  function getIssues() {
    return axios.get('/api/issues');
  }




  return {
    getUsers,
    getIssues
   
  };
}