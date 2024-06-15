# Password Manager

A secure and efficient password manager application that allows users to manage their passwords across different categories. This project provides a RESTful API for backend operations and a frontend interface for user interactions.


## Features

- Add, update, and delete passwords
- Group passwords by categories
- Search functionality to quickly find passwords


## Installation
### Backend

Clone the repository and install the backend dependencies:

```bash
git clone git@github.com:PsychedelicsEyes/PasswordManager.git
cd password-manager/backend
npm install
```
### Frontend
Navigate to the frontend directory and install the dependencies:
```
cd ../frontend
npm install
```
## Environment Variables
To run this project, you will need to add the following environment variables to your .env file in the **backend directory**:
```
API_PORT=
API_DOMAIN=
MONGODB_URI=
JWT_SECRET=
DEFAULT_PASSWORD=
```

The default password will be the  password for the first connection of the website. If you want you can change it at any time in the dashboard settings.

You will need to add the following environment variables to your .env file in the  **frontend directory**:

```
REACT_APP_API_URL=
```
## Support

For support, add on discord psychedelicseyes


## End of Readme

Made with ❤️
