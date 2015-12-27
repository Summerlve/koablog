# Using
**Using**:

* **Frontend**: Bootstrap, jQuery.js, Vue.js, CKEditor.
* **Backend**: Node.js: Koa, Sequelize, EJS.
* **Database&Cache**: MySQL, Redis.
* **API Design**: RESTful API Design.

<br/>

# INSTALL
This web app dependent on Node.js, MySQL, Redis.

##### 1. Install the MySQL 5.6.19+
##### 2. Install the Redis 2.8.4+
##### 3. Install the Node.js 4.2.1+

<br/>

# API Design
**/authentications**

/roots

/panels

/articles

GET

/users

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
| 1000 | there is none token in the http request header field 'Authorization' |
| 1001 | wrong token (can not decode the token) |
| 1002 | token out of date |
| 1003 | token do not exists, please log in again (token can not find in redis) |
| 1004 | username or password is not correct (when log in) |
| 1005 | insufficient permission (when someone want to pass the permission filter, but failed) |

<br/>

##### router /users
| error code | description |
| ---------- | ----------- |
| 2000 | username, password, penName, groupName is required and must be not void (when create new user, but some info dont included in request body) |
| 2001 | username exists (want to update username or create new user, but the username is exist, so failed) |
| 2002 | penName exists (want to update penName or create new user, but the penName is exist, so failed) |
| 2003 | group don't exists |
| 2004 | add user failed (In most cases, this is a server error) |
| 2005 | update user failed (In most cases, this is a server error) |
| 2006 | this item cannot be empty can't be void (when update user's username, penName, password) |
| 2007 | change user's group failed (In most cases, this is a server error) |
| 2008 | delete user failed (In most cases, this is a server error) |

<br/>

##### router /articles
| error code | description |
| ---------- | ----------- |
| 3000       | some error  |

<br/>

##### router /tags
| error code | description |
| ---------- | ----------- |
| 4000 | add tag fialed (In most cases, this is a server error) |
| 4001 | tag's name can not be void (when update a tag's info or create a new tag but the tag's name to void will trigger this error) |
| 4002 | update tag failed (In most cases, this is a server error) |
| 4003 | delete tag failed (In most cases, this is a server error) |
| 4004 | this tag name already exists (when update or create) |

<br/>

##### router /groups
| error code | description                                                 |
| ---------- | -----------                                                 |
| 5000       | groupName can not be void (when create or update)           |
| 5001       | this group name already exists (when update or create)      |
| 5002       | create group failed (In most cases, this is a server error) |
| 5003       | update group failed(In most cases, this is a server error)  |
| 5004       | delete group failed (In most cases, this is a server error) |

<br/>

