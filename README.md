  Metadata Management Application Documentation
  Introduction
The Metadata Management Application is a web-based tool designed to facilitate the management and verification of recipient metadata in transactions. 
It allows users to create, edit, verify, and download metadata associated with transactions, including recipient details, token information, and transaction classification and description.

Features
1. User Authentication
The application employs user authentication to ensure that only authorized users can access and manage their metadata.

2. Transaction Creation
          1. Dynamic Recipient Forms:
Allows users to add multiple recipients dynamically.
Validates recipient names using a regex pattern.
Checks for required fields before proceeding.
          2. Tokens:
Users can add multiple tokens with associated amounts.
Tokens are dynamically added and validated.
           3.Transaction Classification and Description:
Collects information about the transaction's classification and description.
Validates and ensures all fields are filled.
           4.Exchange Rate Entry:
Users can input the exchange rate for the transaction.  
          5.Sequential Form Navigation:
Allows users to navigate through different forms in a sequential order.

3. JSON File Generation
The app facilitates the generation of JSON files containing sanitized and structured metadata.
Admin users can trigger the creation of JSON files for verified recipient data.

 4.Data Download
Download Verified Data: Users can download verified recipient data in JSON format for further analysis or archival purposes.
Functionality has been enabled on the home page table to download previous transaction files.

5. Error Handling and User Feedback
The app incorporates error handling mechanisms to provide meaningful feedback to users in case of issues during data input or verification.

6. Asynchronous Operations
Asynchronous operations using async/await are implemented to handle time-consuming tasks without blocking the application's responsiveness.

Getting Started
A.User Registration/Login:

B.Users need to register or log in to access the app, ensuring personalized and secure data management.
Form Input:

C.Navigate through the multi-step form to input transaction details, recipient information, tokens, and classification.
Admin Verification:

D.Admin users can verify recipient data to mark it as reliable and trustworthy.
JSON File Generation:

E.Admin users can generate JSON files containing sanitized and structured metadata for verified recipient data.
Data Download:

F.Authenticated users can download verified recipient data in JSON format for external use.
  Future Enhancements
  Add generate .CVS file functionality to the app to generate wallet transaction data.
  Incorprate an exchange rate API for the exchange rates during time of transaction.

  Contributors
[Raymond Ezra]
[Randy Mungai]
Version History
Version 0.0.1 (Current): Initial release.
