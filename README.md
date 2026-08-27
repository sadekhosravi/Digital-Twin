===============================================================================
                             DIGITAL TWIN PORTFOLIO
===============================================================================

An interactive personal portfolio website featuring an AI Digital Twin that 
represents Sade Khosravi. Built on a serverless AWS architecture with 
persistent memory storage and edge content delivery.


-------------------------------------------------------------------------------
1. OVERVIEW
-------------------------------------------------------------------------------
This project serves dual purposes:
1. Showcase engineering work, projects, and research publications.
2. Provide an interactive AI Digital Twin capable of conversing with visitors,
   answering questions about experience/background, and maintaining contextual 
   memory across interactions.


-------------------------------------------------------------------------------
2. ARCHITECTURE & SYSTEM FLOW
-------------------------------------------------------------------------------
The infrastructure is 100% serverless and hosted on Amazon Web Services (AWS).

[ Data & Backend Flow ]
AWS S3 (Memory / Context Storage)
    └──> AWS Lambda (Backend Logic & AI Processing)
            └──> AWS API Gateway (REST API Endpoint)
                    └──> Browser (Client Interface)

[ Frontend Delivery Flow ]
AWS S3 (Static Asset Bucket)
    └──> AWS CloudFront (CDN & SSL Termination)
            └──> Browser (Client Interface)


-------------------------------------------------------------------------------
3. TECH STACK
-------------------------------------------------------------------------------
- Frontend:          React / Next.js, Tailwind CSS, HTML5/JS
- Edge CDN:          AWS CloudFront
- Static Hosting:    AWS S3 (Bucket hosting)
- API Management:    AWS API Gateway
- Serverless Compute: AWS Lambda (Node.js / Python)
- Memory & Context:  AWS S3 (State management, context files, and logs)


-------------------------------------------------------------------------------
4. KEY FEATURES
-------------------------------------------------------------------------------
- AI Digital Twin: Interactive AI agent persona trained on developer profile,
  projects, and domain expertise.
- Persistent Memory: External state and interaction history stored in S3 for
  dynamic context retrieval during interactions.
- Serverless Backend: Auto-scaling API endpoints managed by API Gateway and 
  Lambda functions to minimize compute overhead and cost.
- Global Edge Delivery: CloudFront CDN distribution ensuring fast global load
  times, HTTPS encryption, and low-latency asset serving.


-------------------------------------------------------------------------------
5. REPOSITORY STRUCTURE
-------------------------------------------------------------------------------
├── frontend/             # Static web applications & UI components
├── backend/              # AWS Lambda function handlers & core AI logic
├── infrastructure/       # CloudFormation / Terraform / SAM deployment scripts
├── memory/               # Context schemas, knowledge base files, prompt templates
└── README.txt            # Project documentation


-------------------------------------------------------------------------------
6. DEPLOYMENT & SETUP
-------------------------------------------------------------------------------
1. Backend Setup:
   - Deploy backend code to AWS Lambda.
   - Configure S3 buckets for memory/context persistence.
   - Set up AWS API Gateway endpoints to trigger Lambda functions.

2. Frontend Deployment:
   - Build static frontend assets.
   - Upload build artifacts to the static S3 hosting bucket.
   - Invalidate AWS CloudFront cache to propagate the latest updates.

3. Environment Variables:
   - Configure API key secrets and AWS IAM permissions for Lambda-to-S3 access.


-------------------------------------------------------------------------------
7. AUTHOR & CONTACT
-------------------------------------------------------------------------------
Sade Khosravi
GitHub: https://github.com/sadekhosravi
Repository: https://github.com/sadekhosravi/Digital-Twin
