# Lead Management System for Key Account Manager


This is a web application designed to facilitate the management of restaurant leads, orders, and interactions for Key Account Managers (KAMs) at Udaan. This platform enables KAMs to efficiently track and manage leads, record interactions, and monitor account performance.

## System Requirements

- **Node.js**: Version 14.x or higher
- **npm**: Version 6.x or higher

## Installation Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Surajvatsya/Udaan.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd Udaan
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

## Running Instructions

1. **Start the development server**:

   ```bash
   npm start
   ```

2. **Access the application**:

   Open your browser and navigate to `http://localhost:3000` to use the application.

---
## Directory Structure

<img width="576" alt="image" src="https://github.com/user-attachments/assets/bcc5107b-6f4c-4bfe-a054-51ccb3f20f97" />




## 📄 API Documentation

## 🔐 **Authentication APIs**

### **POST /auth/signup**

- **Description**: Register a new user.
- **Payload**:
    
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123",
      "role": "admin"
    }
    
    ```
    
- **Response**:
    
    ```json
    {
      "message": "User registered successfully",
      "token": "jwt_token"
    }
    
    ```
    

### **POST /auth/login**

- **Description**: Authenticate a user and provide a JWT token.
- **Payload**:
    
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    
    ```
    
- **Response**:
    
    ```json
    {
      "message": "Login successful",
      "token": "jwt_token"
    }
    
    ```
    

---

## 🍴 **Restaurant APIs**

### **POST /leads**

- **Description**: Create a new restaurant lead.
- **Authentication**: JWT token required.
- **Payload**:
    
    ```json
    {
      "name": "Kudla Restaurant",
      "location": "Bangalore",
      "cuisine_type": "Seafood",
      "lead_status": "New"
    }
    
    ```
    
- **Response**:
    
    ```json
    {
      "message": "Restaurant created successfully",
      "restaurant_id": 1
    }
    
    ```
    

### **GET /leads**

- **Description**: Retrieve all restaurant leads.
- **Authentication**: JWT token required.

### **GET /leads/revenue_contribution**

- **Description**: Get revenue contribution details for all restaurants.

### **GET /leads/stats**

- **Description**: Get statistical data for all restaurant leads.

### **GET /leads/data**

- **Description**: Get detailed statistics for restaurants.

### **GET /leads/perf**

- **Description**: Get account performance stats.

### **GET /leads/:lead_id**

- **Description**: Retrieve a specific restaurant by ID.

### **GET /leads/status/:lead_status**

- **Description**: Retrieve restaurants filtered by lead status.

---

## 📞 **Point of Contact (POC) APIs**

### **POST /contacts**

- **Description**: Create a new Point of Contact (POC).
- **Authentication**: JWT token required.
- **Payload**:
    
    ```json
    {
      "restaurant_id": 1,
      "name": "John Doe",
      "role": "Manager",
      "phone_number": "+1234567890",
      "email": "john.doe@example.com"
    }
    
    ```
    
- **Response**:
    
    ```json
    {
      "message": "POC created successfully",
      "poc_id": 1
    }
    
    ```
    

### **GET /contacts/:rId**

- **Description**: Retrieve all POCs for a specific restaurant by restaurant ID.

---

## 📋 **Interaction APIs**

### **POST /interactions**

- **Description**: Record a new interaction.
- **Authentication**: JWT token required.
- **Payload**:
    
    ```json
    {
      "restaurant_id": 1,
      "interaction_title": "Follow-up Meeting",
      "poc_id": 2,
      "interaction_type": "Meeting",
      "details": "Discussed the new menu options.",
      "outcome": "Scheduled another meeting next week.",
      "interaction_date": "2024-12-01T10:00:00Z",
      "follow_up_date": "2024-12-08T10:00:00Z"
    }
    
    ```
    
- **Response**:
    
    ```json
    {
      "message": "Interaction recorded successfully",
      "interaction_id": 1
    }
    
    ```
    

### **GET /interactions**

- **Description**: Retrieve all interaction calls.

### **GET /interactions/all**

- **Description**: Retrieve all interactions.

### **GET /interactions/today**

- **Description**: Retrieve follow-up interactions scheduled for today.

### **GET /interactions/:restaurant_id**

- **Description**: Retrieve interactions for a specific restaurant by restaurant ID.

---

## 📦 **Order APIs**

### **POST /orders**

- **Description**: Place a new order.
- **Authentication**: JWT token required.
- **Payload**:
    
    ```json
    {
      "restaurant_id": 1,
      "order_by": 2,
      "order_date": "2024-12-01T10:00:00Z",
      "order_status": "Pending",
      "items": [
        {
          "item_name": "Chicken Biryani",
          "quantity": 2,
          "price": 250.00,
          "instructions": "Extra spicy"
        },
        {
          "item_name": "Paneer Butter Masala",
          "quantity": 1,
          "price": 180.00,
          "instructions": "No onions"
        }
      ]
    }
    
    ```
    
- **Response**:
    
    ```json
    {
      "message": "Order placed successfully",
      "order_id": 1
    }
    
    ```
    

### **GET /orders/trends**

- **Description**: Retrieve order trends data.

### **GET /orders/heatmap/:restaurant_id**

- **Description**: Retrieve order counts and dates for a specific restaurant.

### **GET /orders/stats**

- **Description**: Retrieve general order statistics.

### **GET /orders/:restaurant_id**

- **Description**: Retrieve all orders for a specific restaurant.

### **GET /orders/get/:order_id**

- **Description**: Retrieve a specific order by order ID.

---

## ✅ **Sample Usage Example**

### **Creating a Restaurant Lead**

```bash
POST /leads
token : jwt_token
Content-Type: application/json
{
  "name": "Kudla Restaurant",
  "location": "Bangalore",
  "cuisine_type": "Seafood",
  "lead_status": "New"
}

```

**Response:**

```json
{
  "message": "Restaurant created successfully",
  "restaurant_id": 1
}

```

### **Getting All POCs for a Restaurant**

```bash
GET /contacts/1
token: jwt_token

```

**Response:**

```json
[
  {
    "poc_id": 1,
    "name": "John Doe",
    "role": "Manager",
    "phone_number": "+1234567890",
    "email": "john.doe@example.com"
  }
]

```

---

**Note**: All APIs are secured with JWT-based authentication. Ensure to include the token in the request headers for authenticated endpoints.

## Sample Usage Examples

- **Adding a New Order**:
  1. Select a restaurant from the dropdown.
  2. Choose the Point of Contact (POC) associated with the restaurant.
  3. Enter the phone number and select the interaction date.
  4. Add items to the order by specifying the item name, quantity, price, and any special instructions.
  5. Click "Place Order" to submit.

- **Fetching POCs for a Restaurant**:
  When a restaurant is selected, the application makes a `GET` request to `/api/contacts/:restaurantId` to retrieve and display the associated POCs.

*Note: Ensure that the backend services are running and properly configured to allow the frontend application to communicate with the APIs.* 
<img width="1728" alt="image" src="https://github.com/user-attachments/assets/0d6242de-5a7b-4d10-a6d5-726eea0d0f67" />
<img width="1728" alt="image" src="https://github.com/user-attachments/assets/c726319c-9bd6-4636-818a-8a202c2bb7f5" />
<img width="1728" alt="image" src="https://github.com/user-attachments/assets/a017bc7c-e28d-4b88-973e-f2f34ada7780" />
<img width="1728" alt="image" src="https://github.com/user-attachments/assets/361ef3bd-ea12-4058-80d4-7f472932d149" />
<img width="1728" alt="image" src="https://github.com/user-attachments/assets/5b5e3644-ed25-451c-a905-05e7b60e1de1" />
<img width="1728" alt="image" src="https://github.com/user-attachments/assets/f13e460f-26ec-48ba-b723-7308e17764c6" />
<img width="1726" alt="image" src="https://github.com/user-attachments/assets/9ec90741-a8e4-491b-81ae-5b42d3344391" />
<img width="1728" alt="image" src="https://github.com/user-attachments/assets/502333c2-16d9-40ed-96c1-a0ab5a5ef8af" />
<img width="1726" alt="image" src="https://github.com/user-attachments/assets/c66e93c0-051a-4f37-99dd-4db2b12e1bea" />
<img width="1728" alt="image" src="https://github.com/user-attachments/assets/b82e4fb4-1458-4fd2-9793-fbd368764deb" />
<img width="1727" alt="image" src="https://github.com/user-attachments/assets/b662a137-bd20-4b00-bc92-aeb8215640f0" />
<img width="1728" alt="image" src="https://github.com/user-attachments/assets/7dd566ef-8f5a-4a51-aeeb-fce8015564e1" />
<img width="1728" alt="image" src="https://github.com/user-attachments/assets/35b4a662-2c8d-4aeb-8ed2-b3f603b302d8" />







