# Birthday Reminder App

## Overview

A simple web application that allows users to set birthday reminders, ensuring that no birthday is forgotten.

## Features

- Set birthday reminders for your friends, family, and loved ones
- Easily add and remove contacts from your list
- Mobile-responsive design for use on any device

## Technologies Used

- HTML, CSS, JavaScript

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/username/birthday-reminder-app.git
   ```

2. ```bash
   cd birthday-reminder-app
   ```

3. Open `index.html` in your browser.

## Challenges and Future Improvements

In the initial version of the Birthday Reminder app, I experimented with browser notifications and email delivery using EmailJS.

- Browser Notifications: These depend on user permissions and can be blocked or ignored silently by the browser. Additionally, they only trigger when the web app is open, which limits their usefulness for time-sensitive reminders like birthdays.

- Email Reminders (via EmailJS): Although EmailJS allowed sending emails without a backend, I encountered delays and limitations due to client-side-only delivery and lack of scheduling support. For an app that requires timely, recurring reminders, a server-based system is more dependable.

### Planned Improvements:

- Implement a backend (likely with Node.js or Firebase Functions) to handle notifications.

- Store birthdays in a database.
