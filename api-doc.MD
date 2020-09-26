**AKSI Server API DOCUMENTATION**
----
----
**Admin**
----
***Login (Admin)***
----
  User (Admin) authentication

* **URL**

    /login

* **Method:**

    `POST`
  
*  **URL Params**

    _None_

* **Data Params**

    `body:`
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```

* **Success Response:**

  * **Code:** 201 <br/>
    **Content:** 
    ```json
    {
        "name": "string",
        "token": "string"
    }
    ```
 
* **Error Response:**

  * **Code:** 401 Authentication Failed <br/>
    **Content:** 
    ```json
    {
        "errors": [
            "User Not Found"
        ]
    }
        
    ```

    OR

  * **Code:** 500 Internal server error <br/>
    **Content:** 
    ```json
    {
        "errors": [
            "internal server error"
        ]
    }
        
    ```

----

**Management User**
----
***Create or Register***
----
  Add new user to database.

* **URL**

    /admin/user/

* **Method:**

    `POST`
  
*  **URL Params**

    _None_

* **Data Params**

   `headers:`
    ```json
    {
        "access_token": "_token_"
    }
    ```

    `body:`
    ```json
    {
        "email": "string",
        "name": "string",
        "img_url": "string",
        "role": "student",
        "password": "string"
    }
    ```

* **Success Response:**

  * **Code:** 201 <br/>
    **Content:** 
    ```json
    {
        "id": "integer",
        "email": "string",
        "name": "string",
        "role": "student"
    }
    ```

* **Error Response:**
  * **Code:** 400 Bad Request <br/>
    **Content:** 
    ```json
    {
        "errors": [
            "email already exist"
        ]
    }
        
    ```

    OR

  * **Code:** 500 Internal server error <br/>
    **Content:** 
    ```json
    {
        "errors": [
            "internal server error"
        ]
    }
        
    ```
----
***Read All User by Role***
----
  Get all user by role in database.

* **URL**

    /admin/user/role/:role

* **Method:**

    `GET`
  
*  **URL Params**

    _:role=[string]_

* **Data Params**

   `headers:`
    ```json
    {
        "access_token": "_token_"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br/>
    **Content:** 
    ```json
    {
        "users": [
            {
                "id": "integer",
                "email": "string",
                "name": "string",
                "img_url": "string",
                "role": "string",
                "password": "string(hash)"
            },
            {
                "id": "integer",
                "email": "string",
                "name": "string",
                "img_url": "string",
                "role": "string",
                "password": "string(hash)"
            }
        ]
    }
    ```
 
* **Error Response:**

  * **Code:** 401 Authentication Failed <br/>
    **Content:** 
    ```json
    {
        "errors": [
            "Permission Denied"
        ]
    }
        
    ```

    OR

  * **Code:** 500 Internal server error <br/>
    **Content:** 
    ```json
    {
        "errors": [
            "internal server error"
        ]
    }
        
    ```
----
***Read One User***
----
  Get one user in database.

* **URL**

    /admin/user/:id

* **Method:**

    `GET`
  
*  **URL Params**

    _:id=[integer]_

* **Data Params**

   `headers:`
    ```json
    {
        "access_token": "_token_"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br/>
    **Content:** 
    ```json
    {
        "user": 
        {
            "id": "integer",
            "email": "string",
            "name": "string",
            "img_url": "string",
            "role": "string",
            "password": "string(hash)"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 Authentication Failed <br/>
    **Content:** 
    ```json
    {
        "errors": [
            "Permission Denied"
        ]
    }
        
    ```

    OR

  * **Code:** 500 Internal server error <br/>
    **Content:** 
    ```json
    {
        "errors": [
            "internal server error"
        ]
    }
        
    ```
----
***Update User***
----
  Update user data in database.

* **URL**

    /admin/user/:id

* **Method:**

    `PUT`
  
*  **URL Params**

    _:id=[integer]_

* **Data Params**

   `headers:`
    ```json
    {
        "access_token": "_token_"
    }
    ```

    `body:`
    ```json
    {
        "email": "string",
        "name": "string",
        "img_url": "string",
        "password": "string"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br/>
    **Content:** 
    ```json
    {
        "user": 
        {
            "id": "integer",
            "email": "string",
            "name": "string",
            "img_url": "string",
            "role": "string",
            "password": "string(hash)"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 Authentication Failed <br/>
    **Content:** 
    ```json
    {
        "errors": [
            "Permission Denied"
        ]
    }
        
    ```

    OR

  * **Code:** 500 Internal server error <br/>
    **Content:** 
    ```json
    {
        "errors": [
            "internal server error"
        ]
    }
        
    ```
----
***Delete User (Siswa)***
----
  Delete user data (siswa) from database.

* **URL**

    /admin/user/:id

* **Method:**

    `DELETE`
  
*  **URL Params**

    _:id=[integer]_

* **Data Params**

   `headers:`
    ```json
    {
        "access_token": "_token_"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br/>
    **Content:** 
    ```json
    {
        "user": 
        {
            "id": "integer",
            "email": "string",
            "name": "string",
            "img_url": "string",
            "role": "string",
            "password": "string(hash)"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 Authentication Failed <br/>
    **Content:** 
    ```json
    {
        "errors": [
            "Permission Denied"
        ]
    }
        
    ```

    OR

  * **Code:** 500 Internal server error <br/>
    **Content:** 
    ```json
    {
        "errors": [
            "internal server error"
        ]
    }
        
    ```
----