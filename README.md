# Content Compass - AI-Powered Content Marketing Assistant

Content Compass is a powerful, AI-driven application designed to streamline your content marketing workflow. From ideation to performance analysis, this tool provides the features you need to create, manage, and optimize your content strategy. Built with Next.js, Genkit, and ShadCN UI, it offers a modern, responsive, and performant experience.

## ✨ Key Features

-   **Dashboard**: Get a comprehensive overview of your content performance with insightful charts and key metrics. Track views, shares, and conversions to understand what resonates with your audience.
-   **Editorial Calendar**: Visualize and manage your content schedule. Drag-and-drop content pieces across different statuses (`Backlog`, `Scheduled`, `In Progress`, `Published`) to keep your pipeline organized.
-   **AI Content Ideation**: Overcome writer's block by generating creative content ideas based on keywords. Let the AI provide you with engaging titles and topics.
-   **AI CTA Generator**: Craft compelling calls-to-action tailored to your content topic, target audience, and product. Maximize conversions with AI-powered suggestions.
-   **Audience Personas**: Define and manage your target audience profiles. Keep a clear focus on who you're creating content for to improve relevance and impact.

## 🚀 Getting Started

To get started with this application, you can simply run it in a development environment.

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

### Installation & Running the App

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Set up your environment variables:**
    Create a `.env` file in the root of your project and add your Genkit/Google AI API keys.
    ```
    GEMINI_API_KEY=your_google_ai_api_key
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the Next.js application on `http://localhost:9002`.

4.  **Run the Genkit development server (in a separate terminal):**
    ```bash
    npm run genkit:dev
    ```
    This allows the AI flows to be tested and run locally.

## 🛠️ Built With

-   **[Next.js](https://nextjs.org/)**: The React framework for building full-stack web applications.
-   **[Genkit](https://firebase.google.com/docs/genkit)**: A framework for building AI-powered features.
-   **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
-   **[TypeScript](https://www.typescriptlang.org/)**: A typed superset of JavaScript that compiles to plain JavaScript.
-   **[ShadCN UI](https://ui.shadcn.com/)**: A collection of beautifully designed, accessible, and reusable components.
-   **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
-   **[Lucide React](https://lucide.dev/)**: A beautiful and consistent icon library.

---

Built by Girish Lade — https://ladestack.in
