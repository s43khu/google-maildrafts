# Google Sheets to Gmail Drafts Automation

This React application allows users to automate the creation of Gmail drafts using data from a Google Sheets spreadsheet. The app integrates with Google OAuth2 for authentication, enabling users to securely access their Google Sheets and Gmail accounts.

## Features

- **Google OAuth2 Login**: Securely log in with your Google account using OAuth2, with access to Google Sheets and Gmail APIs.
- **Fetch Data from Google Sheets**: Input your Google Sheets ID and specify a data range to fetch data directly from the spreadsheet.
- **Automated Gmail Draft Creation**: Automatically create Gmail drafts based on the data fetched from the Google Sheet. Each row in the spreadsheet corresponds to an email draft.
- **User Profile Display**: After logging in, your Google profile information is displayed, including your name and email address.
- **Responsive and User-Friendly UI**: The application includes a simple and intuitive interface, making it easy to use even for those who are not technically inclined.

## How It Works

1. **Google Login**: The app uses the `@react-oauth/google` library to authenticate users via their Google accounts. Upon successful login, the user's profile information is fetched and displayed.
2. **Fetching Spreadsheet Data**: Users provide the Google Sheets ID and the specific range they want to process (e.g., `Sheet1!A2:C`). The app uses the Google Sheets API to fetch the specified data.
3. **Creating Gmail Drafts**: The app iterates over the rows of data fetched from the Google Sheet and creates a Gmail draft for each row. The draft includes the recipient's email, subject, and message body.
4. **Toast Notifications**: The app uses `react-hot-toast` to provide real-time feedback during the draft creation process, including success and error notifications.

## Getting Started

### Prerequisites

- Node.js and npm installed
- Google Developer Console account with OAuth2 credentials set up

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/google-drafts-automation.git
   cd google-drafts-automation
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory with your Google OAuth2 client credentials:
   ```plaintext
   REACT_APP_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   ```
