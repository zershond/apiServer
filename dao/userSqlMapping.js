/**
 * Created by zershond on 2017/3/3.
 */
var user = {
    insert: 'insert into user(id,name,age) value(?,?,?)',
    update: 'update user set name=?, age=?, where id=?',
    delete: 'delete from user where id=?',
    queryById: 'select * from user where id=?',
    queryAll: 'select * from user'
};
module.exports = user;