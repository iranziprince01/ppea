#!/bin/bash

echo "🚀 Setting up Probity Partners East Africa - Sanity CMS Integration"
echo "================================================================"

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    echo "📝 Creating .env.local from template..."
    cp env.example .env.local
    echo "✅ Created .env.local"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env.local and add your Sanity credentials:"
    echo "   - NEXT_PUBLIC_SANITY_PROJECT_ID"
    echo "   - NEXT_PUBLIC_SANITY_DATASET (default: production)"
    echo "   - SANITY_API_TOKEN"
    echo ""
    echo "🔗 Get these from: https://www.sanity.io/manage"
    echo ""
    read -p "Press Enter after you've updated .env.local..."
fi

# Check if environment variables are set
if ! grep -q "NEXT_PUBLIC_SANITY_PROJECT_ID" .env.local || ! grep -q "SANITY_API_TOKEN" .env.local; then
    echo "❌ Sanity environment variables not configured!"
    echo "Please update .env.local with your Sanity credentials."
    exit 1
fi

echo "✅ Environment variables configured"

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if Sanity CLI is installed
if ! command -v sanity &> /dev/null; then
    echo "📦 Installing Sanity CLI..."
    npm install -g @sanity/cli
fi

echo "✅ Dependencies installed"

# Start Sanity Studio
echo "🎨 Starting Sanity Studio..."
echo "📱 Sanity Studio will be available at: http://localhost:3333"
echo "🌐 Your website will be available at: http://localhost:3000"
echo ""
echo "📋 Next steps:"
echo "1. Open Sanity Studio in your browser"
echo "2. Run the population script: npm run populate-sanity"
echo "3. Upload images for team members and blog posts"
echo "4. Edit content as needed"
echo "5. Your website will automatically reflect changes"
echo ""

# Start both Next.js and Sanity Studio
echo "🚀 Starting development servers..."
echo "Press Ctrl+C to stop both servers"
echo ""

# Start Sanity Studio in background
sanity dev --port 3333 &
SANITY_PID=$!

# Start Next.js
npm run dev &
NEXT_PID=$!

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $SANITY_PID 2>/dev/null
    kill $NEXT_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait
