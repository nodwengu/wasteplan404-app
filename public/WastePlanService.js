module.exports = function (pool) {

function getUsers(){
const usersql = await pool.query('insert into users() ')
}

function getIssues(){
const issuessql = await pool.query('select * from issues')
console.log(issuessql);

return issuessql.rows
}




    return{
    getUsers,
    getIssues
    }
}