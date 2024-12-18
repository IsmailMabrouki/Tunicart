# TunisiCart

## Description

TunisiCart is an e-commerce platform that connects multiple sellers and buyers. This project is built using Angular and Spring Boot.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Diagrams](#diagrams)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/username/tunisi-cart.git
```

2. Navigate to the project directory: (open your backend in intellij IDEA to avoid issues)

```bash
   cd TuniCart
```

3. Install dependencies:

```bash
   mvn install
```

```bash
   cd ../TunicartUI
   npm install
```

### 5. **Usage**

-instructions on how to run the project, including any commands.

## Usage

To start the development server, run:

1.  Run Docker Desktop

2.  In your backend Terminal, run:

```bash
docker-compose up
```

Result sohuld be something like this ! :

```bash
[+] Running 2/0
 ✔ Container tunisicart-mysql-1  Running                                                                                                                                       0.0s
 ✔ Container mail-dev-trz        Created                                                                                                                                       0.0s
Attaching to mail-dev-trz, mysql-1
mail-dev-trz  | MailDev using directory /tmp/maildev-1
mail-dev-trz  | MailDev webapp running at http://0.0.0.0:1080/
mail-dev-trz  | MailDev SMTP Server running at 0.0.0.0:1025

```

3.  Run Spring boot backend

```bash
mvn spring-boot:run
```

Or Simply click the Run button in intellij IDEA

4.  Run the frontend application:

in you frontend Terminal, run:

```bash
    npx ng serve -o
```

5.  Open your browser and navigate to http://localhost:4200/

## Diagrams

1. class diagram

![Diagrams](https://github.com/IsmailMabrouki/Tunicart/blob/7b22e98e7d6c184f4ba2e548dea26cfa6befd5b0/images/classdiagram.png)

---

2. use case diagram

![Diagrams](https://github.com/IsmailMabrouki/Tunicart/blob/main/images/Usecasesdiagram.png)

---

## Demo

1. Homepage

![Demo](https://github.com/IsmailMabrouki/Tunicart/blob/main/images/homepage.png)

---

2. Profile

![Demo](https://github.com/IsmailMabrouki/Tunicart/blob/7b22e98e7d6c184f4ba2e548dea26cfa6befd5b0/images/profile2.png)

---

3. product list

![Demo](https://github.com/IsmailMabrouki/Tunicart/blob/7b22e98e7d6c184f4ba2e548dea26cfa6befd5b0/images/ProductsList.png)

4. product details

![Demo](https://github.com/IsmailMabrouki/Tunicart/blob/7b22e98e7d6c184f4ba2e548dea26cfa6befd5b0/images/ProductDetails.png)

5. cart

![Demo](https://github.com/IsmailMabrouki/Tunicart/blob/7b22e98e7d6c184f4ba2e548dea26cfa6befd5b0/images/cart.png)

6. checkout

![Demo](https://github.com/IsmailMabrouki/Tunicart/blob/7b22e98e7d6c184f4ba2e548dea26cfa6befd5b0/images/checkout.png)
