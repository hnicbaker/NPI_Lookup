## Description
Project is an React App that allows the user to create a new provider account. All information can be entered manually, or the user can enter a valid NPI number, and the form will auto-populate. NPI info is being called from the [NPPES NPI Registry
](https://npiregistry.cms.hhs.gov/registry/help-api). 

- Form will validate information and return error messages for invalid fields
- If NPI number is invalid or missing when the user tries to import information, the user will be alerted



## Process
Initially, I was going to create a strictly Front-End application using React, but when I tried to make an axios call to the NPI Registry, I recieved a CORS error. To get around, I created an Express server, and made the calls to the API from there. My React app could then access the information via the Express server. 




## Video 
[![Screenshot of account creation form](https://imgur.com/NdaQIZx.jpg)](https://youtu.be/QKw_m6wC6u4)
