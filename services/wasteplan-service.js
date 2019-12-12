module.exports = function WastePlanService(pool) {

  async function all() {
    let sql = `SELECT * FROM issues`;
                   
    let results = await pool.query(sql);

    return results.rows;
  }


  async function add(issue) {
    let data = [
      issue.userId,
      issue.date,
      issue.type,
      issue.status,
      issue.latitude,
      issue.longitude
    ];

    let query = `INSERT INTO issues(userId, date, type, status, latitude, longitude) VALUES($1, $2, $3, $4, $5, $6)`;
    return pool.query(query, data);
  }
 
  async function addUser(user) {
    let userData = [
      user. name,
      user.email,
      user.username,
      user.password,
      user.address,
      user.usertype
    ];
    let query = `INSERT INTO users(name, email, username, password, address, usertype) VALUES($1, $2, $3, $4, $5, $6)`;
    return pool.query(query, userData);
  }

  async function getAllUsers() {
    const sql = `SELECT * FROM users`;
    const results = await pool.query(sql);
    return results.rows;
  }

  async function getAllUserIssues(username) {
    const sql = `SELECT i.issueid, i.status, i.date, i.type, i.latitude, i.longitude, u.username
                 FROM issues i
                 INNER JOIN users u ON i.userid = u.id`;
    const results = await pool.query(sql);
    return results.rows;
  }


  async function getUser(username) {
    const sql = `SELECT * FROM users WHERE username = '${username}'`;
    const results = await pool.query(sql);
    return results.rows[0];
  }


 
  return {
    all,
    add,
    addUser,
    getAllUsers,

    getAllUserIssues,
    getUser

    // getAllUserIssues

    // getAllUserIssues,
    // getUser

  };

};
