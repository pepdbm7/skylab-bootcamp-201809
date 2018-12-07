# planbe

This application is for a real breakfast preparation and delivery company of a friend, that allows the user to choose among different food products, specify the place and time he wants to have it and pay it.

In order to use the application, the user has to register and login.

The user can do other things with this app such as: to see his order history, to contact the company for inquiries with a form and to change any field of his profile

  ****

## Technologies

![used technologies logos](img\tech-logos.png)

### Backend

NodeJS, Express, MongoDB, Mongoose, Nodemailer, SendGrid, Mocha, JWT

### Frontend

ES6, React, Mdbreact, BEM, Mocha

**Others**: git & github, surge, heroku, creately, draw.io

  ****
  
## Functional description

### Description

#### Register

Fields to register:

- type of client: Individual or Corporate (just for statistics of the company)
- name
- surname
- username
- email
- password

(All fields are required)

#### Login

Fields to log in:

- username
- password

#### Home

This is where the user can see the products the company offers. Each product has a plus button to add so many of that product as wanted to the user's cart.

All the products are classified by type:

- sandwich
- juice
- yogurt
- fruit salad

Every product contains:

- name
- image
- description (ingredients)
- price

#### Cart

All the selected products from home still pending of purchase.

Each product has the same information as in Home and:

- minus button
- counter (counts the quantity and changes by clicking minus or plus buttons)

There is also a Total that sums all the price*quantity of each product. Only visible if there are products in the cart.

#### Dropping details

The user can specify the dropping details after clicking on the *Next* button of the *Cart* page

- place ***required*
- day, month, year ***required*
- time frame ***required*
- comments (extra information if wanted)

#### Payment

The user has to introduce the credit card details:

- Credit Card Holder
- Credit Card Number
- Expiry date
- CVC number

After, an email is sent to the user's email address with all the order's details (a popup informs about it as well)


#### Order History

It shows the orders of the user, each of them with these fields:

- Dropping time and time frame
- Dropping place
- products
    - name
    - type
    - price

#### Profile update

The user can modify all the fields of his profile

Same fields as in Register form and also:

- new password
- confirm new password

An email is sent to the user to inform about the changes


#### Contact

This section has a form with a subject and message fields, for any inquiry to the company

It also has a *where can you find us* part, which contains:

- post address
- link to planbe instagram
- email address
- phone number
- *google maps* map showing the location of planbe's office


### Use case

![use case diagram](img\Use-case.png)


## Technical description

### Blocks diagram

![Blocks-diagram](img\Blocks-diagram.png)

### API
**Postman Requests**

![postman](img\postman.png)

### Data model

![data-model](img\data-model.png)
