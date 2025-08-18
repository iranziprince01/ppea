import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Create Sanity client only if environment variables are available
const client = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && 
               process.env.NEXT_PUBLIC_SANITY_DATASET && 
               process.env.SANITY_API_TOKEN ? 
  createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: false, // Set to false for real-time updates
    token: process.env.SANITY_API_TOKEN,
  }) : null

// Log client status for debugging
if (!client) {
  console.log('⚠️ Sanity client not initialized - using fallback data. Set environment variables to enable Sanity CMS.')
}

// Image URL builder
const builder = client ? imageUrlBuilder(client) : null

export const urlFor = (source: any) => {
  if (!builder || !source) return { url: () => '' }
  return builder.image(source)
}

// Fallback client for when Sanity is not available
const fallbackClient = {
  fetch: async (query: string) => {
    // Only provide fallback data for blog-related queries
    if (query.includes('blogPost')) {
      return [
        {
          _id: '1',
          title: 'Understanding Corporate Governance in East Africa',
          slug: { current: 'corporate-governance-east-africa' },
          excerpt: 'A comprehensive guide to corporate governance practices and regulations across East African markets.',
          author: { name: 'Aloys Ntirushwamaboko', photo: '/assets/Aloys Ntirushwamaboko.jpg', position: 'Senior Partner' },
          mainImage: '/assets/corporate.jpg',
          publishedAt: '2024-01-15T10:00:00Z',
          categories: ['Corporate Law'],
          tags: ['Governance', 'Regulations', 'East Africa'],
          featured: true,
          readingTime: 8,
          status: 'published',
          body: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Corporate governance is a critical aspect of business operations in East Africa...'
                }
              ]
            }
          ]
        },
        { 
          _id: '2', 
          title: 'Recent Changes in Employment Law: What Employers Need to Know', 
          excerpt: 'Key updates to employment legislation and their implications for businesses and employees.', 
          publishedAt: '2024-01-10T14:30:00Z', 
          author: { name: 'Aloys Ntirushwamaboko', photo: '/assets/Aloys Ntirushwamaboko.jpg', position: 'Senior Partner' }, 
          slug: { current: 'employment-law-changes-2024' },
          mainImage: '/assets/employment.jpg',
          categories: ['Employment Law'],
          tags: ['Employment', 'Legislation', 'Business'],
          featured: false,
          readingTime: 6,
          status: 'published',
          body: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'The employment law landscape in East Africa is evolving rapidly...'
                }
              ]
            }
          ]
        },
        { 
          _id: '3', 
          title: 'Real Estate Investment: Legal Considerations for Foreign Investors', 
          excerpt: 'Essential legal aspects foreign investors should understand when investing in East African real estate.', 
          publishedAt: '2024-01-05T09:15:00Z', 
          author: { name: 'Evode Kayitana', photo: '/assets/KAYITANA Evode.jpeg', position: 'Partner' }, 
          slug: { current: 'real-estate-foreign-investment' },
          mainImage: '/assets/real estate.jpg',
          categories: ['Real Estate'],
          tags: ['Real Estate', 'Investment', 'Foreign Investors'],
          featured: true,
          readingTime: 10,
          status: 'published',
          body: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'East Africa presents significant opportunities for real estate investment...'
                }
              ]
            }
          ]
        }
      ]
    }
    
    if (query.includes('siteSettings')) {
      return {
        title: 'Probity Partners East Africa',
        description: 'Leading law firm in East Africa providing expert legal services across multiple practice areas.',
        contactInfo: {
          address: 'Kigali, Rwanda',
          phone: '+250791676618 / +250788561313',
          email: 'probitypartnersea1@gmail.com',
          workingHours: 'Mon - Fri: 8:00 AM - 6:00 PM'
        },
        socialMedia: {
          facebook: 'https://facebook.com/probitypartners',
          twitter: 'https://twitter.com/probitypartners',
          linkedin: 'https://linkedin.com/company/probitypartners',
          instagram: 'https://instagram.com/probitypartners'
        },
        contactSection: {
          heading: 'Get In Touch',
          description: 'Ready to discuss your legal needs? Contact us today for a consultation. Our team is here to help you navigate your legal challenges with confidence and expertise.',
          contactForm: [
            { fieldName: 'Name', fieldType: 'text', required: true },
            { fieldName: 'Email', fieldType: 'email', required: true },
            { fieldName: 'Phone', fieldType: 'text', required: false },
            { fieldName: 'Service', fieldType: 'select', required: false, options: ['Corporate Law', 'Litigation', 'Real Estate', 'Employment Law', 'Tax Law', 'Intellectual Property'] },
            { fieldName: 'Message', fieldType: 'textarea', required: true }
          ]
        },
        teamPreview: {
          heading: 'Meet Our Attorneys',
          description: 'Our experienced legal professionals are dedicated to providing exceptional service and achieving the best possible outcomes for our clients.',
          teamMembers: [
            {
              _id: 'teamMember-1',
              name: 'Me Alice Umulisa Kayigamba',
              position: 'Managing Partner',
              shortBio: 'Leading our firm with over 15 years of experience in corporate law and strategic legal counsel.',
              photo: '/assets/Profile pictures/Alice.jpg',
              slug: { current: 'alice-umulisa' }
            },
            {
              _id: 'teamMember-2',
              name: 'Aloys Ntirushwamaboko',
              position: 'Senior Partner',
              shortBio: 'Specializing in litigation and dispute resolution with a track record of successful case outcomes.',
              photo: '/assets/Profile pictures/Aloys.jpg',
              slug: { current: 'aloys-ntirushwamaboko' }
            },
            {
              _id: 'teamMember-3',
              name: 'Evode Kayitana',
              position: 'Partner',
              shortBio: 'Expert in real estate law and corporate transactions, providing strategic legal solutions.',
              photo: '/assets/Profile pictures/Keza.jpg',
              slug: { current: 'evode-kayitana' }
            }
          ]
        }
      }
    }
    
    if (query.includes('teamMember') || query.includes('_type == "teamMember"')) {
      return [
        {
          _id: 'teamMember-1',
          name: 'Adv. KAYIGAMBA UMULISA ALICE',
          position: 'Managing Partner',
          shortBio: 'Senior Lawyer | Legal Strategist | Legal Consultant | Legal Scholar | Expert in Human Rights | Specialist in Public International Law | Banking and Commercial Practice',
          photo: '/assets/Profile pictures/Alice.jpg',
          slug: { current: 'alice-umulisa' },
          isPartner: true,
          specialties: ['Corporate Law', 'Strategic Legal Counsel', 'Leadership', 'Human Rights', 'Public International Law', 'Banking and Commercial Practice'],
          order: 1
        },
        {
          _id: 'teamMember-2',
          name: 'Adv. Keza Ntaganda Lys',
          position: 'Associate',
          shortBio: 'Corporate | Banking & Finance Law | Arbitration & Humanitarian Law Practitioner',
          photo: '/assets/Profile pictures/Keza.jpg',
          slug: { current: 'keza-ntaganda' },
          isPartner: false,
          specialties: ['Corporate Law', 'Banking & Finance', 'Arbitration', 'Humanitarian Law'],
          order: 2
        },
        {
          _id: 'teamMember-3',
          name: 'Dr. Munyamahoro Rene',
          position: 'Senior Associate',
          shortBio: 'PhD, LLM, LL.B | Advocate | Legal Scholar | Expert in International Investment Law & Human Rights',
          photo: '/assets/Profile pictures/Rene.jpg',
          slug: { current: 'rene-munyamahoro' },
          isPartner: true,
          specialties: ['International Investment Law', 'Human Rights', 'Business Transactions', 'Contract Law'],
          order: 3
        },
        {
          _id: 'teamMember-4',
          name: 'Dr Furaha Umutoni Alida',
          position: 'Senior Associate',
          shortBio: 'PhD, LLM, LL.B | Senior Researcher | Specialist in Gender, Identity & Peacebuilding',
          photo: '/assets/Profile pictures/Furaha.jpg',
          slug: { current: 'furaha-umutoni' },
          isPartner: true,
          specialties: ['Gender Issues', 'Identity', 'Peacebuilding', 'Human Rights'],
          order: 4
        },
        {
          _id: 'teamMember-5',
          name: 'Adv. Mukashema Marie Louise',
          position: 'Senior Associate',
          shortBio: 'Senior Advocate | Criminal Defense & Family Law Specialist | Legal Strategist',
          photo: '/assets/Profile pictures/Louise.png',
          slug: { current: 'mukashema-louise' },
          isPartner: true,
          specialties: ['Criminal Defense', 'Family Law', 'Legal Strategy', 'Victim Protection'],
          order: 5
        },
        {
          _id: 'teamMember-6',
          name: 'Adv. Aloys Ntirushwamaboko',
          position: 'Senior Associate',
          shortBio: 'LL.M, LL.B, DLP | Advocate | Legal Advisor | Specialist in Public International Law & Commercial Practice',
          photo: '/assets/Profile pictures/Aloys.jpg',
          slug: { current: 'aloys-ntirushwamaboko' },
          isPartner: true,
          specialties: ['Public International Law', 'Commercial Practice', 'Legal Advisory', 'Corporate Law'],
          order: 6
        },
        {
          _id: 'teamMember-7',
          name: 'Adv. Aziza Lola',
          position: 'Senior Associate',
          shortBio: 'Legal Analyst | Specialist in Criminal Justice & Victim Advocacy',
          photo: '/assets/Profile pictures/Aziza.jpg',
          slug: { current: 'aziza-lola' },
          isPartner: true,
          specialties: ['Criminal Justice', 'Victim Advocacy', 'Transitional Justice', 'Legal Analysis'],
          order: 7
        },
        {
          _id: 'teamMember-8',
          name: 'Adv. Jules Lambert Ineza',
          position: 'Senior Associate',
          shortBio: 'Advocate | Legal Consultant | Researcher in Justice and Development',
          photo: '/assets/Profile pictures/Jules.jpg',
          slug: { current: 'jules-lambert' },
          isPartner: true,
          specialties: ['Legal Research', 'Justice Development', 'Legal Aid', 'Policy Research'],
          order: 8
        },
        {
          _id: 'teamMember-9',
          name: 'BAKUNDA Emmanuel',
          position: 'Associate',
          shortBio: 'Legal Advisor | IP & Business Law Enthusiast',
          photo: '/assets/Profile pictures/Emmanuel.jpg',
          slug: { current: 'bakunda-emmanuel' },
          isPartner: false,
          specialties: ['Intellectual Property', 'Business Law', 'Corporate Governance', 'Legal Drafting'],
          order: 9
        },
        {
          _id: 'teamMember-10',
          name: 'Anny Princia Habiyaremye',
          position: 'Legal Consultant',
          shortBio: 'Administrative & Employment Law Specialist | Legal Professional',
          photo: '/assets/Profile pictures/Princia.jpg',
          slug: { current: 'anny-princia' },
          isPartner: false,
          specialties: ['Administrative Law', 'Employment Law', 'Legal Research', 'Cross-jurisdictional Practice'],
          order: 10
        },
        {
          _id: 'teamMember-11',
          name: 'Mary Stella Irasubiza',
          position: 'Junior Legal Associate',
          shortBio: 'Legal Researcher | Court & Document Drafter',
          photo: '/assets/Profile pictures/Stella.jpg',
          slug: { current: 'mary-stella' },
          isPartner: false,
          specialties: ['Legal Research', 'Document Drafting', 'Court Submissions', 'Legal Support'],
          order: 11
        },
        {
          _id: 'teamMember-12',
          name: 'Muhire Herve',
          position: 'IT Support Specialist',
          shortBio: 'IT support specialist / Software engineer / Passionate Graphic designer',
          photo: '/assets/Profile pictures/Herve.jpg',
          slug: { current: 'muhire-herve' },
          isPartner: false,
          specialties: ['IT Support', 'Software Engineering', 'Graphic Design', 'System Administration'],
          order: 12
        },
        {
          _id: 'teamMember-13',
          name: 'NTAGANDA Ganza Dan',
          position: 'IT Support Specialist',
          shortBio: 'IT support specialist / Software engineer / Passionate Graphic designer',
          photo: '/assets/Profile pictures/Ganza.jpg',
          slug: { current: 'ntaganda-ganza' },
          isPartner: false,
          specialties: ['IT Support', 'Software Engineering', 'System Security', 'Legal Sector IT'],
          order: 13
        }
      ]
    }
    
    return null
  }
}

// Export the client to use (either real or fallback)
export const activeClient = client || fallbackClient

// GROQ Queries - Only for dynamic content (blogs)
export const blogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc)`
export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0]`
export const teamMembersQuery = `*[_type == "teamMember"] | order(order asc)`
export const siteSettingsQuery = `*[_type == "siteSettings"][0]`
export const clientInquiriesQuery = `*[_type == "clientInquiry"] | order(submittedAt desc)`
export const homePageQuery = `*[_type == "siteSettings"][0]`