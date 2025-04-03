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

### Accessible:(least 4 sentences, maximum 50)

- Adjusted the contrast between background and foreground colors. Because this is friendly to the visually impaired.
- Placeholder for the input field.This will prompt the user to know what to enter in the input field.
- Different color of the border of the input field when it is clicked. It helps users to know what state the input field currently in.
- Image elements have [alt] attributes. When the network is not good or the image is not loaded successfully, the user can be prompted to see what information the image displays.
- Remove unnecessary dependencies. It can reduce page loading time and give users a better experience.
- Using PurgeCSS to remove unused CSS. It can reduce page loading time and give users a better experience.

- **Home Page:**
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
  - User authentication: I need to track user login, logout, error login, etc. events, which Counter.dev cannot support well.
  - User behavior analysis: I need to track how doctors interact with patient information, such as editing medical records, viewing patient information, etc. Counter.dev cannot provide this kind of in-depth data tracking.
  - Privacy: Although Counter.dev performs well in terms of privacy (no cookies, GDPR compliance), since my system involves medical data, the privacy protection requirements will be more stringent. For medical systems, I must not only protect user privacy, but also ensure that the system meets more stringent compliance requirements, such as:
    Data encryption and protection: The storage and transmission of medical data need to be encrypted, and Counter.dev does not specifically provide data protection features.
  3. Compare to Goat Counter.
  - Goat Counter is suitable for personal blogs or small websites that need concise, privacy-friendly traffic statistics, but it is not suitable for systems that need to deeply analyze user behavior, generate customized reports, or meet medical privacy compliance needs. Therefore, Goat Counter not provide enough features to meet my needs.
  4. Compare to Hotjar.
  - Although Hotjar provides very powerful behavioral analysis tools, I need more stringent data protection measures due to privacy issues and data compliance requirements for medical data. Coupled with Hotjar's performance impact and privacy compliance issues, it not be completely suitable for my doctor management system, especially when sensitive medical data is involved.
- When I consider users privacy, I think Analytics has the following advantages which are benefits to my system.
  1. Google Analytics offers IP anonymization, which helps protect user identity by removing the last part of the IP address (e.g., 192.168.1.1 becomes 192.168.1.x).
  2. Data retention settings allow administrators to choose how long data is stored, with options from 14 days to permanent storage, ensuring compliance with GDPR's data retention limitations.
  3. To comply with GDPR, Google Analytics encourages integrating a consent management platform (CMP) for obtaining user consent before collecting data.
  4. Google Analytics allows users to control data sharing, including disabling sharing with other Google services like Ads or BigQuery, to prevent data leakage.
  5. Data masking removes sensitive personal information, such as usernames and emails, from reports, enhancing privacy protection.
  6. Google Analytics uses cookies (\_ga, \_gid) to track user behavior, and under GDPR, user consent is required for cookie use, with Google providing guidance for compliance.

### threats and vulnerabilities:

at least 2 common threats and vulnerabilities that your project might be vulnerable too. Going into detail over one of them, explaining how you have mitigated yourself against it.(at least 5 sentences, maximum 50)
