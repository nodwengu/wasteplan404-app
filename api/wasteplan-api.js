module.exports = function (waiterPlanService) {

  async function allIssues(req, res, next) {
    try {
      let results = await waiterPlanService.all();
      res.json({
        status: 'success',
        data: results
      });
    }
    catch (err) {
      next(err);
    }
  };

  async function createIssue(req, res, next) {
    try {
      const { body } = req;

      //call the add function from our service waiterPlanService(instance)
      await waiterPlanService.add(body);

      res.json({
        status: 'success',
        data: "data added",
        message: "Issue successfully created"
      });
    }
    catch (err) {
      console.log(err);
    }

  }

  async function addUser(req, res, next) {
    try {
      const { body } = req;
      console.log(body);

      //call the add function from our service waiterPlanService(instance)
      await waiterPlanService.addUser(body);

      res.json({
        status: 'success',
        data: "data added",
        message: "User successfully created"
      });
    }
    catch (err) {
      console.log(err);
    }

  }

  async function allUsers(req, res, next) {
    try {
      const users = await waiterPlanService.getAllUsers();

      res.json({
        status: 'success',
        data: users,
      });
    } catch (error) {
      console.log(error);
      
    }
  }

  async function issuesForUser(req, res, next) {
    try {
      const issuesFor = await waiterPlanService.getAllUserIssues();

      res.json({
        status: 'success',
        data: issuesFor,
      });
    } catch (error) {
      console.log(error);
      
    }
  }


  return {
    allIssues,
    createIssue,
    addUser,
    allUsers,
    issuesForUser


  };
};
