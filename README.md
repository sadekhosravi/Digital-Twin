
# Digital Twin

> An AI-powered digital twin integrated into a personal portfolio website, designed to represent me, answer questions about my background and experience, and maintain persistent memory.

## Overview

**Digital Twin** is a personal portfolio website with an integrated AI assistant that acts as a digital representation of me.

Instead of being a traditional static portfolio, the website allows visitors to interact with an AI-powered digital twin that can provide information about my background, experience, projects, skills, and professional interests.

The application is built as a serverless AWS architecture, separating the static frontend from the AI backend and persistent memory layer.

## Features

* 🤖 **AI Digital Twin** — An interactive AI representation of me.
* 🧠 **Persistent Memory** — Stores and retrieves relevant information using Amazon S3.
* 🌐 **Interactive Portfolio** — Combines a traditional portfolio with an AI conversational interface.
* ⚡ **Serverless Backend** — Backend logic runs through AWS Lambda.
* 🔌 **API Layer** — AWS API Gateway exposes the backend functionality to the frontend.
* ☁️ **Cloud-Native Frontend** — Static frontend assets are hosted on Amazon S3 and delivered through Amazon CloudFront.
* 🔐 **Separation of Concerns** — Frontend, API, backend logic, and memory are independently managed.
* 📦 **Scalable Architecture** — Uses managed AWS services instead of maintaining traditional servers.

## Architecture

The application consists of two main flows: the **AI backend and memory layer**, and the **static frontend delivery layer**.

### AI Backend

```text
┌──────────────┐
│   Browser    │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│   API Gateway    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   AWS Lambda     │
│    Backend       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│      AWS S3      │
│  Digital Twin    │
│     Memory       │
└──────────────────┘
```

The browser communicates with the backend through **Amazon API Gateway**. API Gateway invokes the **AWS Lambda** backend, which interacts with **Amazon S3** to retrieve and persist the digital twin's memory.

### Frontend Delivery

```text
┌──────────────────┐
│      AWS S3      │
│ Static Frontend  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  AWS CloudFront  │
│       CDN        │
└────────┬─────────┘
         │
         ▼
┌──────────────┐
│   Browser    │
└──────────────┘
```

The frontend is deployed as static assets to **Amazon S3** and distributed globally through **Amazon CloudFront**.

### Complete Architecture

```text
                         ┌──────────────────┐
                         │      Browser     │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
          ┌──────────────────┐        ┌──────────────────┐
          │  AWS CloudFront  │        │   API Gateway    │
          └────────┬─────────┘        └────────┬─────────┘
                   │                           │
                   ▼                           ▼
          ┌──────────────────┐        ┌──────────────────┐
          │      AWS S3      │        │   AWS Lambda     │
          │ Static Frontend  │        │     Backend      │
          └──────────────────┘        └────────┬─────────┘
                                               │
                                               ▼
                                      ┌──────────────────┐
                                      │      AWS S3      │
                                      │ Digital Twin     │
                                      │     Memory       │
                                      └──────────────────┘
```

## Technology Stack

### Frontend

* Static web application
* Amazon S3
* Amazon CloudFront

### Backend

* AWS Lambda
* AWS API Gateway
* Serverless architecture

### Memory

* Amazon S3
* Persistent digital twin memory

### Infrastructure

* Amazon Web Services (AWS)
* API Gateway
* Lambda
* S3
* CloudFront

## Project Structure

```text
Digital-Twin/
├── backend/
│   └── ...
│
├── frontend/
│   └── ...
│
└── .gitignore
```

The repository is separated into two primary components:

### `frontend/`

Contains the portfolio website and the user-facing digital twin interface.

The frontend is built as a static application and deployed to Amazon S3, with Amazon CloudFront used for content delivery.

### `backend/`

Contains the serverless backend responsible for handling API requests and interacting with the digital twin's persistent memory.

The backend is deployed through AWS Lambda and exposed through Amazon API Gateway.

## Request Flow

When a visitor interacts with the digital twin:

1. The visitor sends a request from the portfolio website.
2. The frontend sends the request to **AWS API Gateway**.
3. API Gateway invokes the **AWS Lambda** backend.
4. Lambda processes the request and accesses the digital twin's memory in **Amazon S3** when required.
5. The backend generates the response.
6. The response is returned through API Gateway to the browser.
7. The frontend displays the response to the visitor.

## Deployment

The project is designed around AWS managed services.

### Frontend

The frontend is deployed as static files to an Amazon S3 bucket and served to users through Amazon CloudFront.

```text
Frontend Build
      │
      ▼
   AWS S3
      │
      ▼
 AWS CloudFront
      │
      ▼
   Internet
```

### Backend

The backend is deployed as an AWS Lambda function and exposed through Amazon API Gateway.

```text
API Request
     │
     ▼
API Gateway
     │
     ▼
AWS Lambda
     │
     ▼
Amazon S3
```

## Environment Variables

Sensitive configuration should be provided through environment variables or AWS-managed configuration rather than committed to the repository.

Example:

```env
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
MEMORY_BUCKET=
API_ENDPOINT=
```

> **Never commit AWS credentials, API keys, secrets, or other sensitive configuration to Git.**

For deployed Lambda functions, prefer AWS IAM roles and least-privilege permissions instead of embedding long-lived AWS credentials.

## Security

The project follows a serverless architecture where the frontend does not directly manage the digital twin's persistent memory.

Recommended security practices include:

* Use IAM roles for Lambda access to S3.
* Grant only the minimum required S3 permissions.
* Keep AWS credentials out of source control.
* Store secrets using appropriate AWS-managed mechanisms.
* Configure API Gateway CORS for the intended frontend origin.
* Avoid making the memory bucket publicly writable.
* Enable logging and monitoring for backend operations.

## Why Serverless?

The project uses AWS serverless services to keep the infrastructure lightweight and scalable.

Instead of maintaining a dedicated backend server:

* **Lambda** handles backend execution.
* **API Gateway** handles API exposure.
* **S3** provides durable object storage for memory and static assets.
* **CloudFront** provides global content delivery.

This architecture reduces infrastructure management while allowing the application to scale with usage.

## Getting Started

### Prerequisites

Before running or deploying the project, you should have:

* An AWS account
* AWS CLI configured
* Appropriate IAM permissions
* Access to the required AI model/API
* Node.js and npm for the frontend, if required by the frontend implementation
* Python and pip, if required by the backend implementation

### Clone the Repository

```bash
git clone https://github.com/sadekhosravi/Digital-Twin.git
cd Digital-Twin
```

### Frontend

```bash
cd frontend
```

Install dependencies and run the frontend according to the project's frontend configuration.

### Backend

```bash
cd backend
```

Install the required dependencies and configure the AWS resources and environment variables before deploying the Lambda function.

> Deployment details may vary depending on the AWS environment and configuration used for the project.

## AWS Services

| Service                | Purpose                                                    |
| ---------------------- | ---------------------------------------------------------- |
| **Amazon S3**          | Static frontend hosting and persistent digital twin memory |
| **AWS CloudFront**     | CDN and global frontend delivery                           |
| **AWS Lambda**         | Serverless backend execution                               |
| **Amazon API Gateway** | API endpoint and communication layer                       |

## Design Goals

The main goal of the project is to explore how a personal portfolio can evolve from a static collection of information into an **interactive AI-powered representation**.

The project combines:

* AI
* Persistent memory
* Serverless architecture
* Cloud deployment
* API-driven communication
* Static web delivery

into a single production-oriented personal application.

## Live Project

**Portfolio:**
[Visit the Digital Twin](https://github.com/sadekhosravi/Digital-Twin)

**Source Code:**
[GitHub Repository](https://github.com/sadekhosravi/Digital-Twin)

## Author

**Sadegh Khosravi**

AI Engineer focused on AI agents, LLM applications, RAG, and production AI systems.

* GitHub: [@sadekhosravi](https://github.com/sadekhosravi)

## License

This project is intended primarily as a personal portfolio and demonstration project.

If you plan to reuse or redistribute parts of the project, please check the repository's license and individual component licenses first.
