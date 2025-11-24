INSTRUCTIONS FOR RUNNING FUELAI MOBILE PORTION:
------------------------------------------------

LOCAL SERVER SETUP:
- Use the SQL dump provided within the GitHub, we utilize PGAdmin4 (although I am sure you configured this during the
  web portion).

TWO .ENV FILES NEEDED:

1. BACKEND (.env in /fuelai directory):
    - Copy .env.example: cp .env.example .env (do this within ide or powershell while in the /fuelai directory)
    - Update these settings:
      DB_CONNECTION=pgsql
      DB_HOST=127.0.0.1
      DB_PORT=5432
      DB_DATABASE=fuelai
      DB_USERNAME=postgres
      DB_PASSWORD=your_password_here
    - Run: php artisan key:generate

2. MOBILE (.env in /MobileFuelAI directory):
    - Create/edit the .env file with:
      EXPO_PUBLIC_API_BASE_URL=http://YOUR_IPV4_ADDRESS:8000/api
      EXPO_PUBLIC_OPENAI_API_KEY=<Arsal's key>
      EXPO_PUBLIC_OPENROUTER_API_KEY=<Steven's key>
    - Did not push their keys for obvious reasons but they have informed me they would of course send it to you.

- Now you can run 'php artisan serve --host=0.0.0.0 --port=8000' to actually start the server in your powershell.

- Open Powershell, traverse to the project FuelAI then to cd 'fuelai' and php artisan serve --host=0.0.0.0 --port=8000.
  Server up and running and Mobile will connect once you set up Expo.

SET UP EXPO TO WORK ON YOUR PHONE

- Download the EXPO application from the App Store (specifically for iOS, it is not setup to really work with Android
  though parts will it will look bad, time limitations (+ not owning an android) made this part not possible for capstone)

- Connect to the same Wi-Fi network as your phone.  You should be able to do this on School Wi-Fi, but I know sometimes
  the certificate gives it a problem, you can always use a hotspot or if there is a connection that doesn't require a
  certificate then that is the best thing to do, if not - it should still logically work it is just a recommendation.

- Now open another window so the server stays going in shell and then traverse to cd MobileFuelAI and run the command
  'npm install'.  This should logically install everything without any complaints, but I have set up 3 computers to
  test this process to give you as concise, yet detailed explanation and this is normally the part that it has a hard time
  with if it does at all.  If needed (the console will tell you), you may have to run the command 'npm audit fix' or 'npm doctor' but once
  again, it should tell you if this is necessary.  If nothing says that, you are fine.

- After that you should be able to just run expo with the command: 'npx expo start'.  If it mentions above the QR code
  'The following packages should be updated for best compatibility with the installed expo version:', you can safely ignore
  it, or force download them, it doesn't really matter - it will work without the updates and with them.

- Next you can scan the QR code with your iPhone camera, it will open the project on your phone.

- Another thing that may happen, will be if specific dependencies didn't get installed which your shell you're running
  the expo in will purvey + the application as well.  Resolving this is as simple as traversing to the file and pressing to download
  on the dependencies, but I prefer to do 'npm install @whatever/whatever'.  For example, I had to run
  'npm install @react-native-picker/picker' this most recent time I set this up and that was all.

- The very last hurdle that may be encountered, is if you viewed the other Expo project that is in our capstone first;
  if you did, run the following commands in the shell with the server, kill the server, run these commands, then start
  server again: 'php artisan config:clear' 'php artisan cache:clear' 'php artisan route:clear'.  This will resolve any caching issues
  if there were any at all.  If it throws an error that means you should be fine and there is nothing to clear.
  For good measure if that happens, kill the expo too and run with 'npx expo start -c --clear' which forces a cache clear 
  with expo as well.

- With that, everything is taken care of, you can safely test persistence, populate the app with your data, sign in, out,
  test functions.  If you ever need to return to it simply start both the servers you're running in the Powershell, and the
  expo server in the cd mobilefuelai with the npx expo start again.  Persistence is intended to work even if you kill and
  rejoin since it uses the phones memory so you shouldn't have to worry about signing in every time.