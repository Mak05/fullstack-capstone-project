# GiftLink User Stories

1. **As a** user  
   **I want to** create an account so I can access the app.  
   **So that** I can securely manage my listings and profile.

   ### Acceptance Criteria
   - [ ] A new user can register with a valid email and password.
   - [ ] The app stores the user information securely.
   - [ ] The user is redirected to the authenticated area after registration.

2. **As a** user  
   **I want to** log in securely so my data is protected.  
   **So that** only authorized users can access their account.

   ### Acceptance Criteria
   - [ ] A registered user can log in with their email and password.
   - [ ] The backend validates the credentials before granting access.
   - [ ] A JWT token is returned after a successful login.

3. **As a** user  
   **I want to** list household items so others can claim them.  
   **So that** I can give away items I no longer need.

   ### Acceptance Criteria
   - [ ] A logged-in user can add an item listing.
   - [ ] Each item includes item name, category, condition, and description.
   - [ ] The item is saved to the database for other users to view.

4. **As a** user  
   **I want to** search items by category so I can find what I need.  
   **So that** I can locate useful free items efficiently.

   ### Acceptance Criteria
   - [ ] The search API filters items by category.
   - [ ] Users can search by item name and category.
   - [ ] Matching results are returned in a readable JSON format.

5. **As a** user  
   **I want to** view item details so I can decide if it is suitable.  
   **So that** I can determine whether the item meets my needs.

   ### Acceptance Criteria
   - [ ] The system returns a detailed view for a single item.
   - [ ] The item detail includes the title, condition, description, and location.
   - [ ] If the item does not exist, the API returns a 404 error.

6. **As a** user  
   **I want to** comment on items so I can ask questions.  
   **So that** I can communicate with the poster before claiming an item.

   ### Acceptance Criteria
   - [ ] Users can add comments related to an item.
   - [ ] Comments are associated with the correct listing.
   - [ ] The comment data is saved and returned by the API.

7. **As a** user  
   **I want to** update my profile so my details stay current.  
   **So that** my account information remains accurate and useful.

   ### Acceptance Criteria
   - [ ] A user can update their first name, last name, or password.
   - [ ] The backend saves the updated profile information.
   - [ ] The API confirms the profile update was successful.

8. **As a** user  
   **I want to** recycle or claim free items so I can avoid buying new ones.  
   **So that** I can reduce waste and reuse household goods.

   ### Acceptance Criteria
   - [ ] Users can browse available donation or free listings.
   - [ ] The frontend and API clearly display item availability.
   - [ ] The experience supports sustainable consumption through reuse.
