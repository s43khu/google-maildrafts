import React, { useState, useEffect } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [link, setLink] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [range, setRange] = useState('Sheet1!A2:C');

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/gmail.compose',
    onSuccess: (response) => {
      console.log(response);
      setUser(response);
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    if (user?.access_token) {
      axios
        .get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${user.access_token}`)
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log('Error fetching user info:', err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setUser(null);
  };

 const fetchSheetData = async () => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${link}/values/${range}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch Google Sheets data.');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
};

  const processSheetData = async () => {
    const toastId = toast.loading('Processing drafts...');
    setIsProcessing(true);
    try {
      const data = await fetchSheetData();
      if (data.status === 200 && data.data && data.data.values) {
        const values = data.data.values;
        for (const row of values) {
          const [email, subject, message] = row;
          const rawMessage = [
            `From: "Sender Name" <your-email@example.com>`,
            `To: ${email}`,
            `Subject: ${subject}`,
            '',
            `${message}`
          ].join('\n');

          const encodedMessage = window.btoa(unescape(encodeURIComponent(rawMessage)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

          const response = await axios.post(
            'https://www.googleapis.com/gmail/v1/users/me/drafts',
            {
              message: {
                raw: encodedMessage
              }
            },
            {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
                'Content-Type': 'application/json'
              }
            }
          );

          console.log('Draft created:', response.data);
        }
        toast.success('Drafts created successfully!', { id: toastId });
      } else {
        console.error('Error: Invalid data format');
        toast.error('Error: Invalid data format', { id: toastId });
      }
    } catch (error) {
      console.error('Error processing data:', error);
      toast.error('Error processing data', { id: toastId });
    } finally {
      setIsProcessing(false); 
    }
  };

  const handleCreateDrafts = async () => {
    await processSheetData();
  };

  return (
    <div>
      <Toaster />
      <h2>{profile ? "Create Drafts" : "Google Login"}</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image"  style={{width: "100px",height: "100px"}}/>
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <label>Sheet ID:{'  '}</label>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder='Spreadsheet id...'
          />
          <br />
          <p>
            <center>
              <button onClick={handleCreateDrafts} disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Create Drafts'}
              </button>
            </center>
          </p>
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={login}>Sign in with Google</button>
      )}
    </div>
  );
}

export default App;
