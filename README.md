# Using
**Using**:

* **Frontend**: Bootstrap, jQuery.js, Vue.js, CKEditor.
* **Backend**: Koa, Sequelize.
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

##### /authentications
| error code | description |
| ---------- | ----------- |
| 1000 | there is no token in the http request header field 'Authorization' |
| 1001 | wrong token (can not decode the token) |
| 1002 | token out of date |
| 1003 | token do not exsit (token can not find in redis) |

<br/>

##### /authors
| error code | descript |
| ---------- | -------- |
| 1004 | username exist (want to update username, but the username is exist, so failed) |
| 1005 | penName exist (want to update penName, but the penName is exist, so failed) |
| 1006 | groupId dont exist |
| 1007 | add author failed (In most cases, this is a server error) |
| 1008 | update user failed (In most cases, this is a server error) |
| 1009 | password can't be void (when update user's password) |
| 1010 | update user's password failed (In most cases, this is a server error) |
| 1011 | update user's username failed (In most cases, this is a server error) |
| 1012 | update user's penName failed (In most cases, this is a server error) |
| 1013 | promote user failed (In most cases, this is a server error) |
| 1014 | delete user failed (In most cases, this is a server error) |

<br/>

##### /articles
| error code | descript |
| ---------- | -------- |
| 1015 | sdfsdfsdf |
