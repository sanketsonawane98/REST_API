
***Setting up and running api***
1}Download files from git repo.
2}run command "npm install" to install all dependencies.
3}run command "npm start" to start the api.

*****************TESTING THE API******************

****************API IS DEPLOYED ON RENDER********
In this api there are 7 routes 

1-> https://restapi-7gw2.onrender.com/users/signup (POST REQUEST)
2-> https://restapi-7gw2.onrender.com/users/login  (POST REQUEST)
3->https://restapi-7gw2.onrender.com/blogs         (GET REQUEST)
4->https://restapi-7gw2.onrender.com/blogs         (POST REQUEST)
5->https://restapi-7gw2.onrender.com/blogs/:id     (DELETE REQUEST)
6->https://restapi-7gw2.onrender.com/blogs/:id     (PATCH REQUEST)
7->https://restapi-7gw2.onrender.com              (GET REQUEST)


**How to use this api**

1->when we make POST request through post man to https://restapi-7gw2.onrender.com/users/signup this url and provide data in  
josn format ex {
    "email":"power@gmail.com",
    "password": "777777"
}
then api will check the email already exists or not . if exists it will not create new user and will
show message "User with this email already exists" else it will create new user and will show message 
"User SignedUp Successfully"



2->when we make POST request through post man to https://restapi-7gw2.onrender.com/users/login this url and provide data in  
josn format ex {
    "email":"power@gmail.com",
    "password": "777777"
}
then if the email and password are correct then user will be loggedin successfully else not.
if user logged in successfully api will show message "Authentication successfull" and will show jwt token 
for the user ex.{message:"Authentication successfull",token:token} this token is used for authentication
else "Authentication failed"

3->  when we make a GET request through post man to https://restapi-7gw2.onrender.com/blogs api will show all the blogs
in our database

4-> when we make a POST request through post man to https://restapi-7gw2.onrender.com/blogs and add our jwt token 
in headers in Authorization field ex.(Authorization:Bearer  token) [NOTE bearer should be there in front of token]
and providing data in json ex({"title":"My College","content": "IIITDM"}) this will add new blog to our database
[NOTE :only authorized users with jwt token can do this operation]


5-> when we make a DELETE request through post man to https://restapi-7gw2.onrender.com/blogs/:id and add our jwt token 
in headers in Authorization field ex.(Authorization:Bearer  token) [NOTE bearer should be there in front of token]
this will delete   a blog int  our database corresponding to the given id


6-> when we make a PATCH request through post man to https://restapi-7gw2.onrender.com/blogs/:id and add our jwt token 
in headers in Authorization field ex.(Authorization:Bearer  token) [NOTE bearer should be there in front of token]
and providing data in json ex({"title":"My College","content": "IIITDM"}) this will update    a blog int  our database
corresponding to the given id
[NOTE :only authorized users with jwt token can do this operation]

7-> when we make a POST request through post man to https://restapi-7gw2.onrender.com api will greet us showing message "Hello this is a blog api"


*For testing 
{
    "email":"doremon@gmail.com",
    "password": "333"
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRvcmVtb25AZ21haWwuY29tIiwidXNlcklkIjoiNjQzZDU2NjllZTg1YjUyNGY4MGFhNTIzIiwiaWF0IjoxNjgxNzQxNDMwLCJleHAiOjE2ODE3NDUwMzB9.ZmgDy8Iac7W1549UhCfcxGflcizMqj-k4c31dp1Uinc"
}
above is a authorized user with respective email and password and token 
token==eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRvcmVtb25AZ21haWwuY29tIiwidXNlcklkIjoiNjQzZDQ4MWU1OTQxZjc0OTIzM2RjZTU3IiwiaWF0IjoxNjgxNzM3ODg2LCJleHAiOjE2ODE3NDE0ODZ9.uahYTssHFKySnZfben0MrrTejbllBFozGWd5R9vv0PI