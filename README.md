# Probity Partners East Africa - Legal Website

A modern, responsive website for Probity Partners East Africa, a leading law firm in East Africa. Built with Next.js 14, TypeScript, Tailwind CSS, and Sanity CMS for content management.

Deployed version: [click here](https://probitypartnersea.com)

## 🚀 Features

- **Modern Design**: Clean, professional design optimized for legal services
- **Content Management**: Full Sanity CMS integration for easy content editing
- **Responsive**: Mobile-first design that works on all devices
- **Performance**: Optimized for speed and SEO
- **Blog System**: Complete blog functionality with categories and search
- **Team Management**: Dynamic team member profiles
- **Contact Forms**: Functional contact forms with email integration
- **SEO Optimized**: Built-in SEO features and meta tags

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **CMS**: Sanity.io
- **Deployment**: Vercel (recommended)
- **Icons**: Lucide React
- **Forms**: Next.js API routes

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Sanity.io account

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ppea
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp env.example .env.local
```

Edit `.env.local` and add your Sanity credentials:

```env
# Sanity.io Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Get your Sanity credentials from:**
1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Create a new project or select existing one
3. Go to API section
4. Copy Project ID and create a new API token with write permissions

### 4. Populate Sanity with Initial Content

Run the population script to create initial blog posts and team members:

```bash
npm run sanity:populate
```

### 5. Start Development Servers

**Option A: Use the setup script (recommended)**
```bash
chmod +x setup.sh
./setup.sh
```

**Option B: Start manually**
```bash
# Terminal 1: Start Sanity Studio
npm run studio

# Terminal 2: Start Next.js
npm run dev
```

### 6. Access Your Application

- **Website**: http://localhost:3000
- **Sanity Studio**: http://localhost:3333

## 📝 Content Management

### Sanity Studio

Access Sanity Studio at `http://localhost:3333` to manage your content:

- **Blog Posts**: Create, edit, and manage blog content
- **Team Members**: Add and update team member profiles
- **Site Settings**: Configure site-wide settings
- **Client Inquiries**: View contact form submissions

### Content Types

1. **Blog Posts**
   - Title, excerpt, and full content
   - Author assignment (links to team members)
   - Categories and tags
   - Featured image and SEO settings
   - Publication status and reading time

2. **Team Members**
   - Name, position, and bio
   - Profile photo
   - Specialties and order
   - Partner status

3. **Site Settings**
   - Site title and description
   - Contact information
   - Social media links

## 🎨 Customization

### Styling

The website uses Tailwind CSS for styling. Main configuration files:

- `tailwind.config.js` - Tailwind configuration
- `app/globals.css` - Global styles
- Component-specific styles in individual component files

### Components

All components are located in the `components/` directory:

- `Header.tsx` - Navigation header
- `Footer.tsx` - Site footer
- `HeroSection.tsx` - Homepage hero
- `BlogsGridSection.tsx` - Blog listing
- `TeamGridSection.tsx` - Team member grid
- And more...

### Pages

Pages are located in the `app/` directory using Next.js 13+ app router:

- `app/page.tsx` - Homepage
- `app/blogs/page.tsx` - Blog listing
- `app/blogs/[slug]/page.tsx` - Individual blog posts
- `app/team/page.tsx` - Team page
- `app/about/page.tsx` - About page
- `app/services/page.tsx` - Services page

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start Next.js development server
npm run studio           # Start Sanity Studio
npm run setup            # Run setup script

# Content Management
npm run sanity:populate  # Populate Sanity with initial content
npm run sanity:deploy    # Deploy Sanity Studio
npm run sanity:export    # Export Sanity dataset
npm run sanity:import    # Import Sanity dataset

# Building
npm run build            # Build for production
npm run start            # Start production server
npm run studio:build     # Build Sanity Studio

# Utilities
npm run favicon:generate # Generate favicons
npm run test:contact     # Test contact form
npm run lint             # Run ESLint
```

## 📁 Project Structure

```
ppea/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── blogs/             # Blog pages
│   ├── team/              # Team pages
│   ├── services/          # Service pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
├── lib/                   # Utility libraries
│   ├── sanity.client.ts   # Sanity client configuration
│   └── auth.ts            # Authentication utilities
├── schemas/               # Sanity schemas
├── scripts/               # Utility scripts
├── public/                # Static assets
├── sanity.config.ts       # Sanity configuration
└── package.json           # Dependencies and scripts
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to set these in your production environment:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 🔒 Security

- API tokens are kept secure and not exposed to the client
- Contact form submissions are validated server-side
- CORS is configured for production domains
- Environment variables are properly managed

## 📞 Support

For support or questions:

1. Check the [Sanity documentation](https://www.sanity.io/docs)
2. Review [Next.js documentation](https://nextjs.org/docs)
3. Open an issue in this repository

## 📄 License

This project is proprietary to Probity Partners East Africa.

## 🎯 Next Steps

After initial setup:

1. **Upload Images**: Add team member photos and blog images through Sanity Studio
2. **Customize Content**: Edit blog posts, team profiles, and site settings
3. **Configure SEO**: Update meta titles and descriptions for better search visibility
4. **Test Forms**: Ensure contact forms are working properly
5. **Deploy**: Deploy to production and configure custom domain
