import admin from 'firebase-admin';
const serviceAccount = {
  type: 'service_account',
  project_id: 'todolist-98812',
  private_key_id: '5116bfd3b403e554059512576a882b005e5474cb',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDWjm3tpWw0wuZc\nfDhmqMrdrDjjPhmwFAtY/1hfWoS9cNmwPgZuuQqJwJHZRD+OOh/wGafS7vOcI/pG\npDiwo2oKW49SOr4t5gPx/GSowWps25v6wkQ/z/FuXz3rf8gcilZrpBG9BjFoBg0U\nnYypr5BYtdjvnsvPkv3XMjRE0GXNWNeNztCmAOyzQwBEiKmudNnn48IZIxzmprTl\nGGnuKCSVRcPWKsxWsL9TAqC5K/7EME/iQ1EIpBO5vX/A2kw/8YJ/HVDykUMtKnlR\nDL7u7+tK7bYNG0Mzp3AsTGhfMATlPa6SExz32hP10SRPP6o19VkPHdZV9Et9qH5n\nppjWa12pAgMBAAECggEAGq61VJHXOluHpvZK1FeG/RjjLT2Gl8tyWtPMk3UwH1gW\ntnCMP75S5W01pimy5rbrTGKAaL7PPHqL8DeRlkQIVrfqw7zq9E3P7UroYMVG/Tk1\ndXKt5qqvWXzOOEiYpBX/J91MWG/Z+pgQDeGHAf5DqwiYbTpYGd0rpNTJQ8qP8oCw\n2qgvAjW5ppr5R8Zn8g7m0SZbniY4YbQIzg8ar1k4CHHKK0K1PR0mrsa8BNeqnMor\nc0Mh1vf7+v52R6AeZAacpiNQuKeyTIfAk25idT0ZiJ7tlvp7p7uqmvytzaLwue1b\nYZ+2FQNz0tddbbmYC6x5e/DaB5yg87ZbzhEQQuJstQKBgQD04WMvtWJW6TrifXzg\nxw7NogRZW36UN7FaPv9Q7Qh0Pu5MNd/OX6/SWfZabpTpBCgJnE5nK7R4VDEFFfjC\nVwglLYFtTvgcpVMSu+dtDj4RjRIlqZN2vubtNfg0Ls46hN0y1LkabBiR0cjafk65\npFiRq3OhwBh261y+ipEvBXPuNQKBgQDgTIo7iy5efz+NBDAQeQ9QG/dV0OTyeZhn\nT99Trg4UT3frDn3AMdaRVhJNy8Qi44ZSztrdD2zjQXngNKga2NpkYtSkz92QJ9W7\njosFc/+S98FolFbllc8RPrxlzphCijZmXZ5eFWLL3+HdhvA1c1cfPvej2VCSXzKY\n6NvUEAAwJQKBgGxmdXTCE3Urq3BlYmlSVMA8bzZrJR5RhQXRC050jyB+VxiPZLJD\nc15nioE/oFWCDIMsmRxcoXf+tPBuaH8G7ckfWsLbiUOM/7g0S97fxiQY0aawaWHQ\nYgMxt9zJt2r6M7zzo7kJjtrGBeaKsSjGkppxTi+VDH9f8t86EcjB3i7dAoGAWtil\nZFiK/1sqskLv9LwTp66sDuX81PjK8Y04NvxYV4GYYGwOIroM3fCumTPezQK6dO+z\nVbXZtHHgmx64t6b9TYt59Qb8BlccCktBo4PIEA6pF2J9j5+Nrr5qMBHtOYYhYnSo\noBKpYUncgY0V3ZBJyS4HvyVVrPNB2wz1fH6+lMECgYBFVU7WxZ6Ri551Dxldfz1i\nCUZWeNL8Q97YNdF0ps7DSsvA3vJEK0TJLs++Pg1WxlBddmrioHCDaiBtlLGOhqfW\njAl85uqr3Ly2PmCPKLBzdVXbSLDuyvWLPnCLkVQ2wJnIJ8YiALMsCgg8eruWQPwu\nMbuTLio1oqUQTU/dT2Ur2A==\n-----END PRIVATE KEY-----\n',
  client_email:
    'firebase-adminsdk-s2vjs@todolist-98812.iam.gserviceaccount.com',
  client_id: '100547939706374367903',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-s2vjs%40todolist-98812.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

if (!admin.apps.length) {
  try {
    const serviceAccountKey = serviceAccount as admin.ServiceAccount;
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey),
    });
  } catch (error: any) {
    console.log('Firebase admin initialization error', error.stack);
  }
}

export default admin.firestore();
