<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1KvMT1tAxClA0DWBUx2NdaReVq2FLjX-f

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create a `.env.local` file in the root directory and add your OpenRouter API key:
   ```
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```
   Note: The `VITE_` prefix is required for Vite to expose the variable to your app.
3. Run the app:
   `npm run dev`

## Deploy to Vercel

1. Push your code to GitHub (if not already done)
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repository
4. In the "Environment Variables" section, add:
   - **Name:** `VITE_OPENROUTER_API_KEY`
   - **Value:** Your OpenRouter API key
5. Click "Deploy"

## Getting an OpenRouter API Key

1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up or log in to your account
3. Navigate to the [API Keys](https://openrouter.ai/keys) section
4. Create a new API key
5. Copy the key and use it in your `.env.local` file (locally) or Vercel environment variables (production)
