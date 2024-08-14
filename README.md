# Realtime Shopping List

## Introduction

We're looking for talented full-stack developers to join our team. As part of our selection process, we have designed a programming task that will test your skills in developing both the front-end and back-end of an application.

The task at hand is to create a collaborative, realtime shopping list platform using Typescript (React + Node.js). This document provides all the details and guidelines you need to successfully complete this assignment.

## Task Description

You are required to build a **minimal & simple**, collaborative shopping list application. The app will have two main parts:
- A dashboard page for creating and deleting shopping lists.
- A separate page for each shopping list that displays its items with a clear mechanism for marking items as purchased.

### Dashboard Page

This is the landing page of your application. It should display a list of all shopping lists that have been created. Users should have the ability to create a new shopping list and delete existing ones.

Each shopping list must have a name and a list of items. The list of items should be inputted as simple text entries. For simplicity, once a shopping list is created, its items cannot be modified. Also, there's no need to keep track of the quantity of each item.

Example:
```
List #123
- Apple
- Cereal
- Milk
```

### Shopping List Page

Clicking on a shopping list from the dashboard should open that list on a new page. On this page, all items in the shopping list should be displayed, each with a mechanism (such as a checkbox or similar) to mark it as completed. It should be clear to users which items are completed and which are not.

The purpose of this page is to provide a collaborative, realtime environment where anyone with the URL can check off items as they are purchased. When an item is checked off, the change should be immediately reflected on all screens displaying that list. There is no need to worry about race conditions. You may assume that two users will not attempt to check off the same item simultaneously.

## Backend and API

For the backend, you are expected to implement the necessary REST API routes to support the functionality of the shopping list application. This includes routes for creating, retrieving, and deleting shopping lists, as well as marking items as purchased.

Additionally, you will need to find a solution for the real-time aspect of the application, where changes to a shopping list should be immediately reflected on all screens displaying that list. 

**To keep this task simple, you don't have to worry about persisting the shopping lists in a database. You can just keep the existing lists in memory on the server!!!**

## Project Structure

The provided code snippet is organized into two separate folders within a single repository for simplicity. One folder contains a blank create-react-app project for the front-end development. The other folder contains a blank TypeScript Express Node.js server for the back-end development.

For the front-end, you can start the application by **installing** the dependencies and running the following command in your terminal from the front-end folder:

```npm run start```

For the back-end, you can start the server with the following command from the back-end folder:

```npm run dev```

This command starts the Node.js server and sets it up to automatically reload whenever any changes are detected in your code. 

## Time Management

In this task, we want to assess your ability to build functional applications efficiently. Here are some guidelines to help you focus your efforts:
- **Function over form**: At this stage, we're more interested in how the application works rather than how it looks. You don't need to spend a lot of time on the user interface design. A simple, clean UI that supports all the required functionalities will suffice.
- **Focus on delivering a functional product**: It's important that you deliver a working application. If you find yourself running out of time and still have remaining features to implement, please describe in comments how you would have implemented them.
- **And remember, no persistence required!**: You don't have to worry about persisting the shopping lists in a database.

## How to Proceed

Please follow these steps:
- Clone the repository to your local machine.
- Create a new repository on your personal GitHub / Gitlab account. This is where you'll upload your work. Please do not make changes to the original repository, as we want to avoid participants seeing each other's code.
- As you develop the application, regularly commit your changes and push them to your personal repository. This will allow us to see your progress and the decisions you make at each stage.
- Once you've completed the task, or after 2 hours (whichever comes first), send us an email with the URL of your personal repository. This will allow us to review your code and assess your skills.

Remember, the focus of this task is to showcase your ability to build a functional application, while highlighting your efficiency and simplicity in design. We're also interested in your coding style and ability to write clean, readable code in TypeScript.

We look forward to seeing your work. Best of luck!
