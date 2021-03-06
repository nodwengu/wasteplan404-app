module.exports = function (wastePlanService) {

  async function allIssues(req, res, next) {
    try {
      let results = await wastePlanService.all();
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

      //call the add function from our service wastePlanService(instance)
      await wastePlanService.add(body);

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
      let { name, email, username, password, address, usertype } = body;

      if (!name) {
        return res.json({ success: false, message: "Error: name cannot be blank." });
      }
      if (!address) {
        return res.json({ success: false, message: "Error: address cannot be blank." });
      }
      if (!username) {
        return res.json({ success: false, message: "Error: username cannot be blank." });
      }
      if (!password) {
        return res.json({ success: false, message: "Error: password cannot be blank." });
      }
      if (!usertype) {
        return res.json({ success: false, message: "Error: usertype cannot be blank." });
      }
      if (!email) {
        return res.json({ success: false, message: "Error: email cannot be blank." });
      }

      email = email.toLowerCase();

      // Verify email existance

      const user = await wastePlanService.getUser(username);

      await wastePlanService.addUser(body);

      if (user.length > 0) { // Checks if user already exist
        return res.json({
          success: false,
          message: "Error: Account already exists.",
        });
      }

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
      const users = await wastePlanService.getAllUsers();

      res.json({
        status: 'success',
        data: users,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function issuesForUser(req, res, next) {;
    try {
      const { params } = req;
      const { username } = params;

      const issuesFor = await wastePlanService.getAllUserIssues(username);

      res.json({
        status: 'success',
        data: issuesFor,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getOneUser(req, res, next) {
    try {
      const { params } = req;
      const { username } = params;

      const user = await wastePlanService.getUser(username);


      res.json({
        data: user,
        status: 'success'

      });
    } catch (error) {
      console.log(error);
    }
  }

  /*/
   Login
 */
  async function login(req, res, next) {

    try {
      const { body } = req;
      let { username, password } = body;

      if (!username) {
        return res.json({ success: false, message: "Error: username cannot be blank." });
      }
      if (!password) {
        return res.json({ success: false, message: "Error: password cannot be blank." });
      }

      username = username.toLowerCase();

      const user = await wastePlanService.getUser(username);

      if (user && user.username == username && user.password == password) {
    
        res.json({
          success: true,
          message: "Logged in...",
        });
      } 
      res.json({
        success: false,
        message: "Error: Invalid login",
      });

    }
    catch (error) {
      console.log(error);
    }

  };



  return {
    allIssues,
    createIssue,
    addUser,
    allUsers,
    issuesForUser,
    getOneUser,
    login


  };
};
