# Medical Management System

### This assignment is developed on a branch named mongoDB, based on my previous front-end project. Please refer to the mongoDB branch for the relevant code.

This project is a Medical Management System built using:

### Frontend:

#### React, JavaScript

### Backend:

#### Express, MongoDB

### Features:

- Doctor login & registration
- CRUD operations for patient data
- HTTP status codes: 500, 400, 404, 200, 201

### How to run the project

- Front-end:

1. cd health-sync
2. npm start

- Back-end:

1. cd server
2. node app.js

### Branch mongoDB include fronted and backend, main branch only have fronted.

### How to deploy the project

#### MongoDB Atlas:

1. login: https://www.mongodb.com/products/platform/atlas-database
2. Configurations/ Name:healthsync-dev-cluster (My name of cluster)
3. Provider: AWS
4. Copy the string containing the name and the password.
5. Install the 'MongoDB for VS Code' Extension to your VSCode, paste the string containing the name and the password to command palette in the top.
6. How to get your MONGO_URI?

- Go in to your Cluster of this project, click the button 'Connect' in the right top conner.
- Choose 'Connect to your application', click the 'Drivers'.
- Copy the string who is under 'Use this connection string in your application'.

#### Back-end (Render):

1. login Render: https://render.com/
2. Root Directory: server (Which is my back-end folder)
3. Build Command: npm install
4. Start Command: node app.js
5. Environment Variables:
- Paste the string (MONGO_URI) that you get from MongoDB Atlas to your .env file. You can write PORT=10000, or just not write the PORT, Render will gives one for it.
6. After the back-end deployed, you will get the this link: https://pkny-medi.onrender.com.


#### Front-end (Netlify):
1. 
Branch to deploy: mongoDB-deploy-online 
Base directory: health-sync
Build command: npm run build
Publish directory: build
Functions directory: (let it empty, because it already deployed separate)
2. Environment variables:
 - Pasta https://pkny-medi.onrender.com to .env of front-end.

#### Registration Page

On the registration page, users are required to enter a Registration Code provided from the database. Registration will only succeed if the code is correct. This measure helps prevent unauthorized users from registering and accessing the system.

- Registration Code Validation: The system automatically verifies whether the entered code exists and is valid in the database during registration.
- Failure Conditions: If the code is incorrect or invalid, the registration process will be rejected, and the user cannot complete registration.
- Security Purpose: This approach ensures that only users with a valid code can register, enhancing the overall security of the system.

### Accessible:

(least 4 sentences, maximum 50)

- Adjusted the contrast between background and foreground colors. Because this is friendly to the visually impaired.
- Placeholder for the input field.This will prompt the user to know what to enter in the input field.
- Different color of the border of the input field when it is clicked. It helps users to know what state the input field currently in.
- Image elements have [alt] attributes. When the network is not good or the image is not loaded successfully, the user can be prompted to see what information the image displays.
- Remove unnecessary dependencies. It can reduce page loading time and give users a better experience.
- Using PurgeCSS to remove unused CSS. It can reduce page loading time and give users a better experience.

- **Register Page:**

  - There are alerts for the user to know the register is success or failure.

- **Login Page:**

  - There are alerts for the user to know the login is success or failure.

- **Dashboard Page:**
  - Reduce the unused JavaScript, reduce loading time, and improve the first rendering speed of the page.
  - Use aria-label attribute to the button without visible text. Use aria-labelledby to the button with visible text(such as "See more button").Let screen readers know what it does.

### SEO-friendly:

- Page isn’t blocked from indexing, then it will appear in Google,Bing, and other search engines.
- Document has a <title> element. Search engines use the <title> as the page title in search results, improving click-through rates (CTR). Browsers display the title on tabs, making navigation easier for users.
- Document has a meta description.Search engines display the description in results, improving CTR. Enhances sharing on social media, as platforms like Facebook and Twitter use meta descriptions for previews.
- Page has successful HTTP status code.Users and search engines can access the page without issues.Prevents SEO penalties from errors like 404 (Not Found) or 500 (Server Error).
- Links have descriptive text. Improves accessibility—screen readers can describe links properly.
- Links are crawlable. Search engines can properly index the linked pages, improving site ranking.Ensures smooth navigation for users, preventing broken or useless links. Boosts internal linking power, strengthening the website structure.
- robots.txt is valid. Ensures search engines can access and index key pages.
  Prevents search engines from crawling sensitive areas (e.g., /user/).
  Improves crawl efficiency, reducing unnecessary server load.

### what type of tracking you have implemented, why, and how it takes into consideration your users privacy.

(at least 2 sentences, maximum 50)

- I used google analytics to track users.
- Why I used it?
  1. Most features are available in the free version.
  2. Compare to Counter.dev.
  - User authentication: I need to track login, failed login, and add-patient events, which Counter.dev does not support well.
  - User behavior analysis: I need to track how doctors interact with patient data, such as editing information, which Counter.dev cannot handle.
  3. Compare to Goat Counter.
  - Goat Counter is suitable for blogs or simple websites, but lacks deep behavioral tracking, custom reports, and compliance features required in medical systems.
  4. Compare to Hotjar.
  - Though powerful in behavior analysis, Hotjar raises concerns about data privacy and performance, making it less suitable for sensitive medical systems.
- When I consider users privacy, I think Analytics has the following advantages which are benefits to my system.
  1. Google Analytics offers IP anonymization, which helps protect user identity by removing the last part of the IP address (e.g., 192.168.1.1 becomes 192.168.1.x). GA4 enables IP anonymization by default.
  2. Data retention: I set it to 14 months, aligning with GDPR rules.
  3. Data sharing control: All data sharing options are disabled, including Google Signals, to avoid leakage.
  4. To comply with GDPR, I implemented a custom consent mechanism that requires users to agree to the use of them before any data is collected.

### threats and vulnerabilities:

(at least 2 common threats and vulnerabilities that your project might be vulnerable too. Going into detail over one of them, explaining how you have mitigated yourself against it.(at least 5 sentences, maximum 50))

- The corresponding relationship between doctors and patients. After the current doctor logs in, he/she can only add, delete, update, and check the patients he is responsible for. He/She cannot act on the patient data of other doctors.

  1. I defined a function authenticateDoctor as the middleware. It helps pass the doctorID to the patient parameter, so that all patients with the same doctorID are treated by the same doctor. This doctorID is the ID given to the user(doctor) by the system when he registers.

- To prevent anyone from registering as a doctor in the system, I have designed a registration code that users must enter when they first register to become a doctor.

  1. These registration codes can only be used once; if they have already been used, they will become invalid. Therefore, I created a new collection called code_registration in my MongoDB to store these registration codes.
  2. These codes will only be randomly generated once during the initial setup and saved in the MongoDB. On subsequent runs of the program, it will check if these registration codes already exist and will not generate new ones.
  3. It is important to note that after adding this feature, related status and code must also be added to both the front-end and back-end APIs.

- I add a confirmation window before deleting a patient(confirm the delete operation).To prevent users from accidentally deleting patient information.

```
PKNY MEDI/
├── .git/ ← Git
├── health-sync/ ← React Front-end
│ ├── build/
│ │ └── static/
│ │ ├── css/
│ │ ├── js/
│ │ └── media/
│ ├── public/
│ ├── src/
│ │ ├── api/
│ │ ├── assets/
│ │ │ └── images/
│ │ ├── components/
│ │ │ └── ui/
│ │ ├── pages/
│ │ │ ├── AppointmentPage/
│ │ │ ├── AuthPage/
│ │ │ ├── Dashboard/
│ │ │ ├── DoctorsPage/
│ │ │ ├── Home/
│ │ │ ├── MobileMenuPage/
│ │ │ └── PrivacyPolicyPage/
│ │ ├── App.css/
│ │ ├── App.jsx/
│ │ ├── index.css/
│ │ └── index.js/
│ │── .env/
│ │── .gitignore/
│ │── craco.config.js/
│ │── package-lock.json/
│ │── package.json/
│ └── README.md/
├── server/ ← Express Back-end
│ ├── config/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── app.js/
│ ├── package-lock.json/
│ └── package.json/
│── .gitignore/
│── package-lock.json/
│── package.json/
└── README.md/
```
