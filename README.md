# Using
**Using**:

* **Frontend**: Bootstrap, jQuery.js, Vue.js, CKEditor.
* **Backend**: Koa, Sequelize, EJS.
* **Database&Cache**: MySQL, Redis.
* **API Design**: RESTful API Design.

<br/>

# API Design
**/authentications**

/roots

/panels

/articles

GET

/authors

GET

/tags

/groups

/files

/abouts

<br/>

# Error Code

##### authorization and permission
| error code | description |
| ---------- | ----------- |
| 1000 | there is no token in the http request header field 'Authorization' |
| 1001 | wrong token (can not decode the token) |
| 1002 | token out of date |
| 1003 | token do not exsit (token can not find in redis) |
| 1004 | username or password is not correct (when log in) |
| 1005 | insufficient permission (when someone want to pass the permission filter, but failed) |


<br/>

##### router /authors
| error code | description |
| ---------- | ----------- |
| 2000 | username, password, penName, groupName is required (when create new user, but some info dont included in request body) |
| 2001| username exists (want to update username or create new user, but the username is exist, so failed) |
| 2002 | penName exists (want to update penName or create new user, but the penName is exist, so failed) |
| 2003 | group don't exists (accroding to group's name) |
| 2004 | add user failed (In most cases, this is a server error) |
| 2005 | update user failed (In most cases, this is a server error) |
| 2006 | password can't be void (when update user's password) |
| 2007 | update user's password failed (In most cases, this is a server error) |
| 2008 | update user's username failed (In most cases, this is a server error) |
| 2009 | update user's penName failed (In most cases, this is a server error) |
| 2010 | promote user's permission failed (In most cases, this is a server error) |
| 2011 | delete user failed (In most cases, this is a server error) |
<br/>

##### router /articles
| error code | description |
| ---------- | ----------- |
| 3000 |  |
