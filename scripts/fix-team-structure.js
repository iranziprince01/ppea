const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Complete team data from PPEA TEAM.md
const teamMembersData = [
  {
    name: 'Adv. KAYIGAMBA UMULISA ALICE',
    position: 'Managing Partner',
    shortBio: 'Senior Lawyer | Legal Strategist | Legal Consultant | Legal Scholar | Expert in Human Rights | Specialist in Public International Law | Banking and Commercial Practice',
    slug: 'alice-umulisa',
    isPartner: true,
    order: 1,
    specialties: ['Corporate Law', 'Strategic Legal Counsel', 'Leadership', 'Human Rights', 'Public International Law', 'Banking and Commercial Practice'],
    photoPath: '/assets/Profile pictures/Alice.jpg'
  },
  {
    name: 'Adv. Keza Ntaganda Lys',
    position: 'Associate',
    shortBio: 'Corporate | Banking & Finance Law | Arbitration & Humanitarian Law Practitioner',
    slug: 'keza-ntaganda',
    isPartner: false,
    order: 2,
    specialties: ['Corporate Law', 'Banking & Finance', 'Arbitration', 'Humanitarian Law'],
    photoPath: '/assets/Profile pictures/Keza.jpg'
  },
  {
    name: 'Dr. Munyamahoro Rene',
    position: 'Senior Associate',
    shortBio: 'PhD, LLM, LL.B | Advocate | Legal Scholar | Expert in International Investment Law & Human Rights',
    slug: 'rene-munyamahoro',
    isPartner: true,
    order: 3,
    specialties: ['International Investment Law', 'Human Rights', 'Business Transactions', 'Contract Law'],
    photoPath: '/assets/Profile pictures/Rene.jpg'
  },
  {
    name: 'Dr Furaha Umutoni Alida',
    position: 'Senior Associate',
    shortBio: 'PhD, LLM, LL.B | Senior Researcher | Specialist in Gender, Identity & Peacebuilding',
    slug: 'furaha-umutoni',
    isPartner: true,
    order: 4,
    specialties: ['Gender Issues', 'Identity', 'Peacebuilding', 'Human Rights'],
    photoPath: '/assets/Profile pictures/Furaha.jpg'
  },
  {
    name: 'Adv. Mukashema Marie Louise',
    position: 'Senior Associate',
    shortBio: 'Senior Advocate | Criminal Defense & Family Law Specialist | Legal Strategist',
    slug: 'mukashema-louise',
    isPartner: true,
    order: 5,
    specialties: ['Criminal Defense', 'Family Law', 'Legal Strategy', 'Victim Protection'],
    photoPath: '/assets/Profile pictures/Louise.png'
  },
  {
    name: 'Adv. Aloys Ntirushwamaboko',
    position: 'Senior Associate',
    shortBio: 'LL.M, LL.B, DLP | Advocate | Legal Advisor | Specialist in Public International Law & Commercial Practice',
    slug: 'aloys-ntirushwamaboko',
    isPartner: true,
    order: 6,
    specialties: ['Public International Law', 'Commercial Practice', 'Legal Advisory', 'Corporate Law'],
    photoPath: '/assets/Profile pictures/Aloys.jpg'
  },
  {
    name: 'Adv. Aziza Lola',
    position: 'Senior Associate',
    shortBio: 'Legal Analyst | Specialist in Criminal Justice & Victim Advocacy',
    slug: 'aziza-lola',
    isPartner: true,
    order: 7,
    specialties: ['Criminal Justice', 'Victim Advocacy', 'Transitional Justice', 'Legal Analysis'],
    photoPath: '/assets/Profile pictures/Aziza.jpg'
  },
  {
    name: 'Adv. Jules Lambert Ineza',
    position: 'Senior Associate',
    shortBio: 'Advocate | Legal Consultant | Researcher in Justice and Development',
    slug: 'jules-lambert',
    isPartner: true,
    order: 8,
    specialties: ['Legal Research', 'Justice Development', 'Legal Aid', 'Policy Research'],
    photoPath: '/assets/Profile pictures/Jules.jpg'
  },
  {
    name: 'BAKUNDA Emmanuel',
    position: 'Associate',
    shortBio: 'Legal Advisor | IP & Business Law Enthusiast',
    slug: 'bakunda-emmanuel',
    isPartner: false,
    order: 9,
    specialties: ['Intellectual Property', 'Business Law', 'Corporate Governance', 'Legal Drafting'],
    photoPath: '/assets/Profile pictures/Emmanuel.jpg'
  },
  {
    name: 'Anny Princia Habiyaremye',
    position: 'Legal Consultant',
    shortBio: 'Administrative & Employment Law Specialist | Legal Professional',
    slug: 'anny-princia',
    isPartner: false,
    order: 10,
    specialties: ['Administrative Law', 'Employment Law', 'Legal Research', 'Cross-jurisdictional Practice'],
    photoPath: '/assets/Profile pictures/Princia.jpg'
  },
  {
    name: 'Mary Stella Irasubiza',
    position: 'Junior Legal Associate',
    shortBio: 'Legal Researcher | Court & Document Drafter',
    slug: 'mary-stella',
    isPartner: false,
    order: 11,
    specialties: ['Legal Research', 'Document Drafting', 'Court Submissions', 'Legal Support'],
    photoPath: '/assets/Profile pictures/Stella.jpg'
  },
  {
    name: 'Muhire Herve',
    position: 'IT Support Specialist',
    shortBio: 'IT support specialist / Software engineer / Passionate Graphic designer',
    slug: 'muhire-herve',
    isPartner: false,
    order: 12,
    specialties: ['IT Support', 'Software Engineering', 'Graphic Design', 'System Administration'],
    photoPath: '/assets/Profile pictures/Herve.jpg'
  },
  {
    name: 'NTAGANDA Ganza Dan',
    position: 'IT Support Specialist',
    shortBio: 'IT support specialist / Software engineer / Passionate Graphic designer',
    slug: 'ntaganda-ganza',
    isPartner: false,
    order: 13,
    specialties: ['IT Support', 'Software Engineering', 'System Security', 'Legal Sector IT'],
    photoPath: '/assets/Profile pictures/Ganza.jpg'
  }
]

async function fixTeamStructure() {
  try {
    console.log('🔧 Fixing team structure to match PPEA TEAM.md...')
    
    // Check if we have the required environment variables
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
      console.error('❌ Missing required environment variables')
      return
    }

    console.log('✅ Environment variables found')
    console.log(`📁 Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
    console.log(`📊 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`)

    // First, delete all existing team members
    console.log('\n🗑️  Removing existing team members...')
    const existingMembers = await client.fetch(`*[_type == "teamMember"]`)
    for (const member of existingMembers) {
      await client.delete(member._id)
      console.log(`🗑️  Deleted: ${member.name}`)
    }

    // Create new team members with correct data
    console.log('\n👥 Creating team members with correct structure...')
    let createdCount = 0

    for (const memberData of teamMembersData) {
      try {
        const teamMemberDoc = {
          _type: 'teamMember',
          name: memberData.name,
          position: memberData.position,
          shortBio: memberData.shortBio,
          slug: { current: memberData.slug },
          isPartner: memberData.isPartner,
          order: memberData.order,
          specialties: memberData.specialties,
          bio: `Experienced legal professional specializing in ${memberData.specialties.join(', ')}.`,
          contactInfo: {
            email: `${memberData.slug}@ppea.com`,
            phone: '+250 788 XXX XXX'
          }
        }

        await client.create(teamMemberDoc)
        console.log(`✅ Created: ${memberData.name} - ${memberData.position}`)
        createdCount++
      } catch (error) {
        console.error(`❌ Error creating ${memberData.name}:`, error.message)
      }
    }

    console.log(`\n🎉 Team structure fix completed!`)
    console.log(`📊 Successfully created: ${createdCount}/${teamMembersData.length} team members`)
    
    if (createdCount > 0) {
      console.log('\n📋 Next steps:')
      console.log('1. Refresh your website at http://localhost:3000/team')
      console.log('2. You should now see all team members with correct structure')
      console.log('3. Check Sanity Studio to verify the updates')
      
      // Update site settings to include new team members in preview
      console.log('\n🔄 Updating site settings...')
      try {
        await require('./update-site-settings.js')
        console.log('✅ Site settings updated')
      } catch (error) {
        console.log('⚠️  Could not update site settings automatically')
      }
    }

  } catch (error) {
    console.error('❌ Error during team structure fix:', error)
  }
}

// Run the script
fixTeamStructure()
