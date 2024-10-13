# Book Store

A web application for managing and browsing a collection of books, built with React on the frontend and Django on the backend.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Browse a catalog of books
- User authentication
- Search functionality
- Responsive design

## Technologies Used

- **Frontend:** React, Axios, React Router
- **Backend:** Django, Django REST Framework
- **Database:** PostgreSQL
- **Styling:** CSS, Bootstrap

## Installation

### Prerequisites

- Python 3.10
- Node.js and npm

### Backend Setup

1. Create a virtual environment and activate it:
    ```bash
    python -m venv env
    source env/Scripts/activate

2. Install the required packages:
    ```bash
    pip install -r requirements.txt
    Run migrations:

3. Run migrations:
    ```bash
    python manage.py makemigrations
    python manage.py migrate

4. Start the Django server:
    ```bash
    python manage.py runserver


### Frontend Setup
Open a new terminal and navigate to the frontend directory:

1. Install the required packages:
    ```bash
    npm install

2. Start the React application:
    ```bash
    npm start