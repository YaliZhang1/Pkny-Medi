# Medical Management System

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

<!-- - For get an temporary url for testing, (Because Cookiebot doesn't accept localhost)run:

1. npm install -g localtunnel
2. lt --port 3000
   It will give you a link like: https://long-jars-search.loca.lt. (This is a temporary link, every time will give you different one.)This one just for test Google Analytics integrating a consent management platform (CMP) for obtaining user consent before collecting data. I used Cookiebot here. -->

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
  - User authentication: I need to track user login, error login and add new patient events, which Counter.dev cannot support well.
  - User behavior analysis: I need to track how doctors interact with patient information, such as editing patient information. Counter.dev cannot provide this kind of in-depth data tracking.
  3. Compare to Goat Counter.
  - Goat Counter is suitable for personal blogs or small websites that need concise, privacy-friendly traffic statistics, but it is not suitable for systems that need to deeply analyze user behavior, generate customized reports, or meet medical privacy compliance needs. Therefore, Goat Counter not provide enough features to meet my needs.
  4. Compare to Hotjar.
  - Although Hotjar provides very powerful behavioral analysis tools, I need more stringent data protection measures due to privacy issues and data compliance requirements for medical data. Coupled with Hotjar's performance impact and privacy compliance issues, it not be completely suitable for my medical management system, especially when sensitive medical data is involved.
- When I consider users privacy, I think Analytics has the following advantages which are benefits to my system.
  1. Google Analytics offers IP anonymization, which helps protect user identity by removing the last part of the IP address (e.g., 192.168.1.1 becomes 192.168.1.x).Just add {'anonymize_ip': true} to the head of index.html.
  2. Data retention settings allow administrators to choose how long data is stored, with options from 14 days to permanent storage, ensuring compliance with GDPR's data retention limitations. I set the time to 14 months.
  3. Google Analytics allows users to control data sharing, including disabling sharing with other Google services like Ads or BigQuery, to prevent data leakage. I set all the data sharing settings to false. Turn off the Google Signals.
  4. To comply with GDPR, Google Analytics encourages integrating a consent management platform (CMP) for obtaining user consent before collecting data. I used Cookiebot here.
  <!-- 5. Google Analytics uses cookies (\_ga, \_gid) to track user behavior, and under GDPR, user consent is required for cookie use, with Google providing guidance for compliance. -->

### threats and vulnerabilities:

(at least 2 common threats and vulnerabilities that your project might be vulnerable too. Going into detail over one of them, explaining how you have mitigated yourself against it.(at least 5 sentences, maximum 50))

- 1. The corresponding relationship between doctors and patients. After the current doctor logs in, he/she can only add, delete, update, and check the patients he is responsible for. He/She cannot act on the patient data of other doctors.
- I defined a function authenticateDoctor as the middleware. It helps pass the doctorID to the patient parameter, so that all patients with the same doctorID are treated by the same doctor. This doctorID is the ID given to the user(doctor) by the system when he registers.
- 2. To prevent anyone from registering as a doctor in the system, I have designed a registration code that users must enter when they first register to become a doctor.
- These registration codes can only be used once; if they have already been used, they will become invalid. Therefore, I created a new collection called code_registration in my MongoDB to store these registration codes.
- These codes will only be randomly generated once during the initial setup and saved in the MongoDB. On subsequent runs of the program, it will check if these registration codes already exist and will not generate new ones.
- It is important to note that after adding this feature, related status and code must also be added to both the front-end and back-end APIs.
