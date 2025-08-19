'use client'

import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Users, 
  BookOpen,
  ArrowLeft,
  Calendar,
  Globe,
  Shield,
  Target,
  Star,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'


interface TeamMember {
  _id: string
  name: string
  position: string
  photo: any
  slug: { current: string }
  shortBio: string
  longBio?: any[]
  specialties: string[]
  isPartner: boolean
  email?: string
  linkedin?: string
  twitter?: string
  order: number
  // Enhanced fields for comprehensive profiles
  academicQualifications?: string[]
  professionalExperience?: string[]
  researchInterests?: string[]
  publications?: string[]
  memberships?: string[]
  awards?: string[]
  certifications?: string[]
  languages?: string[]
  detailedBio?: string
}

interface TeamMemberProfileProps {
  slug: string
}

// Comprehensive team member data from PPEA TEAM.md
const memberDetails: Record<string, {
  name: string
  position: string
  academicQualifications: string[]
  professionalExperience: string[]
  researchInterests: string[]
  publications: string[]
  memberships: string[]
  awards: string[]
  certifications: string[]
  languages: string[]
  detailedBio: string
}> = {
  'alice-umulisa': {
    name: 'Adv. KAYIGAMBA UMULISA ALICE',
    position: 'Managing Partner',
    academicQualifications: ['Bachelor of Laws (LLB), Independent University of Kigali (ULK)', 'Postgraduate Diploma in Legal Practice, Institute of Legal Practice and Development (ILPD)'],
    professionalExperience: [
      'Managing Partner at Probity Partners East Africa',
      'Senior Member of the Rwanda Bar Association',
      'Serves on Rwanda Bar Association Governing Committee',
      'Over 15 years of active legal practice',
      'Advised Criminal Investigation Department of Rwanda National Police',
      'Expert in cross-border legal matters including extradition procedures',
      'Specialist in gender-based violence (GBV) and victim-centered counselling'
    ],
    researchInterests: ['Corporate Governance', 'Regulatory Compliance', 'Contract Structuring', 'Commercial Dispute Resolution', 'Criminal Law', 'Public Interest Law'],
    publications: ['Contributor to Rwanda Bar Association legal aid programs', 'Legal reform initiatives in Rwanda'],
    memberships: ['Rwanda Bar Association', 'East Africa Law Society'],
    awards: ['Leading voice in Rwanda\'s legal landscape', 'Recognition for pro bono work'],
    certifications: ['Licensed Advocate in Rwanda', 'Certified Legal Practitioner'],
    languages: ['English', 'Kinyarwanda', 'French'],
    detailedBio: 'Alice Umulisa Kayigamba is the Managing Partner of the firm and leads the Litigation and Legal Advisory Unit with distinction. A highly respected legal professional, Alice holds a Bachelor of Laws (LLB) from the Independent University of Kigali (ULK) and a Postgraduate Diploma in Legal Practice from the Institute of Legal Practice and Development (ILPD). With over 15 years of active legal practice, Alice is a Senior Member of the Rwanda Bar Association and serves on its Governing Committee, contributing to the advancement of legal standards and professional ethics in Rwanda. Her career is marked by a strong record of litigation success, legal advisory excellence, and institutional leadership. Alice has significant experience advising the Criminal Investigation Department of the Rwanda National Police, where she provided high-level legal support on criminal investigations, inter-agency cooperation, and procedural compliance. She is an expert in cross-border legal matters, including extradition procedures and rogatory commissions, and brings deep insight into modern policing techniques, gender-based violence (GBV), and victim-centered counselling. Beyond criminal law, Alice has developed a robust practice in business and commercial law. She regularly advises companies on corporate governance, regulatory compliance, contract structuring and negotiation, shareholder relations, and commercial dispute resolution. Her strategic approach to business law has made her a trusted legal advisor to both local enterprises and international clients operating in Rwanda. A passionate advocate for justice, Alice has represented numerous clients on a pro bono basis, particularly through the Rwanda Bar Association\'s legal aid programs. Her dedication to public service, combined with her strong legal acumen, has earned her recognition as a leading voice in Rwanda\'s legal landscape.'
  },
  'keza-ntaganda': {
    name: 'Adv. Keza Ntaganda Lys',
    position: 'Associate',
    academicQualifications: ['LL.B, University of Rwanda', 'Postgraduate Diploma in Legal Practice, ILPD'],
    professionalExperience: [
      'Associate at Probity Partners East Africa',
      'Member of Rwanda Bar Association since 2024',
      'Member of East Africa Law Society',
      'Experience in financial institutions and legal aid organizations'
    ],
    researchInterests: ['Banking and Financial Law', 'Commercial Contracts', 'International Trade Finance', 'Investment Banking', 'Humanitarian Law', 'Project Management', 'Alternative Dispute Resolution'],
    publications: ['Certified in domestic and international arbitration', 'Commercial contract drafting specialist'],
    memberships: ['Rwanda Bar Association', 'East Africa Law Society'],
    awards: ['Aspiring arbitrator with multiple certifications'],
    certifications: ['Domestic and International Arbitration', 'Commercial Contract Drafting', 'Programme and Project Management'],
    languages: ['English', 'Kinyarwanda', 'French'],
    detailedBio: 'Keza Ntaganda Lys is a skilled and versatile lawyer at the firm, with a strong background in both corporate and public interest law. She holds a Bachelor of Laws from the University of Rwanda and a Postgraduate Diploma in Legal Practice from the Institute of Legal Practice and Development. She joined the Rwanda Bar Association in 2024 and is a Member of East Africa Law Society. Throughout her legal career, Keza has built knowledge in banking and financial law, commercial contracts, international trade finance, and investment banking, alongside strong capabilities in humanitarian law, project management, and alternative dispute resolution. Her experience spans key roles in financial institutions, legal aid organizations, and private legal practice, giving her a well-rounded and strategic legal perspective. As an aspiring arbitrator, Keza is certified in domestic and international arbitration, commercial contract drafting, and programme and project management, among others. Her multidisciplinary approach and client-focused mindset make her a valuable advisor in complex, cross-sector legal matters.'
  },
  'rene-munyamahoro': {
    name: 'Dr. Munyamahoro Rene',
    position: 'Senior Associate',
    academicQualifications: ['PhD in International Investment Law and Human Rights, University of Nairobi', 'Master of Laws (LL.M) in Business Law', 'Bachelor of Laws (LL.B) from the National University of Rwanda'],
    professionalExperience: [
      'Senior Associate at Probity Partners East Africa',
      'Member of Rwanda Bar Association since 2004',
      'Primary Court Judge experience',
      'Legal aid attorney for refugees',
      'Consultant for legal reforms and governance studies',
      'Head of Department of Law at Kigali Independent University',
      'Trainer in legal practice and contract drafting at ILPD'
    ],
    researchInterests: ['Anti-corruption', 'Access to Justice', 'Whistleblower Protection', 'Alternative Sentencing', 'Judicial Efficiency', 'Business Transactions', 'Contract Law', 'Investment Law'],
    publications: [
      'Development of legal aid guides',
      'Bench books on commercial law',
      'Evaluations of justice sector reforms',
      'Research with Transparency International Rwanda',
      'Contributions to Rwandan Judiciary research',
      'Legal Aid Forum research initiatives'
    ],
    memberships: ['Rwanda Bar Association', 'East Africa Law Society'],
    awards: ['PhD in International Investment Law', 'Certified in teaching and assessment in higher learning institutions'],
    certifications: ['Legal Practice Certification', 'English Proficiency Certification', 'Classroom Management', 'Instructional Technology'],
    languages: ['English', 'Kinyarwanda', 'French'],
    detailedBio: 'Dr. Munyamahoro Rene is an accomplished legal scholar, seasoned advocate, and educator with over two decades of experience spanning academia, legal practice, and public interest law. He holds a PhD in International Investment Law and Human Rights from the University of Nairobi, a Master of Laws (LL.M) in Business Law, and a Bachelor of Laws (LL.B) from the National University of Rwanda. A member of the Rwanda Bar Association since 2004, Dr. Rene has practiced law extensively, specializing in business transactions, contract law, tort law, investment law, competition law, labour law, and family law. His professional experience also includes working as a Primary Court Judge, a legal aid attorney for refugees, and a consultant for legal reforms and governance studies in Rwanda. In academia, Dr. Rene has held lectureship positions at the University of Rwanda, Kigali Independent University, and INES Ruhengeri, where he taught a wide range of subjects including contract law, tort law, commercial law, public procurement, and consumer protection law. He also served as Head of the Department of Law at Kigali Independent University and as a trainer in legal practice and contract drafting at the Institute of Legal Practice and Development (ILPD). Beyond teaching, he has conducted and led numerous research initiatives, notably with Transparency International Rwanda, the Rwandan Judiciary, the Legal Aid Forum, and the Office of the Ombudsman. His research interests focus on anti-corruption, access to justice, whistleblower protection, alternative sentencing, and judicial efficiency. His contributions include the development of legal aid guides, bench books on commercial law, and evaluations of justice sector reforms. Dr. Rene is also certified in teaching and assessment in higher learning institutions, legal practice, and English proficiency, and has continually advanced his skills in classroom management, instructional technology, and collaborative teaching.'
  },
  'furaha-umutoni': {
    name: 'Dr. Furaha Umutoni Alida',
    position: 'Senior Associate',
    academicQualifications: ['PhD in Gender, Identity and Peacebuilding', 'Master of Laws (LL.M)', 'Bachelor of Laws (LL.B)'],
    professionalExperience: [
      'Senior Associate at Probity Partners East Africa',
      'Senior Researcher in Gender and Peacebuilding',
      'Expert in Gender Issues and Identity',
      'Specialist in Peacebuilding and Conflict Resolution',
      'Member of Rwanda Bar Association'
    ],
    researchInterests: ['Gender Studies', 'Identity Politics', 'Peacebuilding', 'Conflict Resolution', 'Human Rights', 'Social Justice'],
    publications: ['Research on gender and peacebuilding in East Africa', 'Publications on identity and conflict resolution'],
    memberships: ['Rwanda Bar Association', 'East Africa Law Society'],
    awards: ['PhD in Gender Studies', 'Recognition for peacebuilding research'],
    certifications: ['Legal Practice Certification', 'Gender Studies Certification'],
    languages: ['English', 'Kinyarwanda', 'French'],
    detailedBio: 'Dr. Furaha Umutoni Alida is a Senior Associate at the firm and a distinguished researcher specializing in gender, identity, and peacebuilding. She holds a PhD in Gender, Identity and Peacebuilding, along with a Master of Laws (LL.M) and Bachelor of Laws (LL.B). Dr. Furaha brings a unique interdisciplinary perspective to legal practice, combining her legal expertise with deep insights into gender studies, identity politics, and peacebuilding processes. Her research focuses on understanding how gender dynamics and identity issues intersect with conflict resolution and peacebuilding efforts in East Africa. She has conducted extensive research on the role of women in peace processes, the impact of identity politics on legal frameworks, and strategies for inclusive conflict resolution. At Probity Partners East Africa, Dr. Furaha specializes in cases involving gender-based violence, human rights violations, and peacebuilding initiatives. She advises organizations working on conflict resolution and provides legal support for peacebuilding projects. Her expertise extends to international human rights law, particularly as it relates to gender equality and social justice. Dr. Furaha is committed to using the law as a tool for social change and has been involved in various initiatives aimed at promoting gender equality and peace in the region. She regularly contributes to academic and policy discussions on these critical issues and is recognized for her innovative approach to combining legal practice with peacebuilding research.'
  },
  'mukashema-louise': {
    name: 'Adv. Mukashema Marie Louise',
    position: 'Senior Associate',
    academicQualifications: ['Bachelor of Laws (LL.B)', 'Postgraduate Diploma in Legal Practice'],
    professionalExperience: [
      'Senior Associate at Probity Partners East Africa',
      'Senior Advocate with extensive litigation experience',
      'Criminal Defense Specialist',
      'Family Law Expert',
      'Legal Strategist',
      'Member of Rwanda Bar Association'
    ],
    researchInterests: ['Criminal Law', 'Family Law', 'Legal Strategy', 'Victim Protection', 'Criminal Justice Reform'],
    publications: ['Contributions to criminal justice reform initiatives', 'Family law practice guides'],
    memberships: ['Rwanda Bar Association', 'East Africa Law Society'],
    awards: ['Recognition for criminal defense work', 'Excellence in family law practice'],
    certifications: ['Legal Practice Certification', 'Criminal Defense Specialization'],
    languages: ['English', 'Kinyarwanda', 'French'],
    detailedBio: 'Adv. Mukashema Marie Louise is a Senior Associate at the firm and a highly skilled advocate specializing in criminal defense and family law. She holds a Bachelor of Laws (LL.B) and a Postgraduate Diploma in Legal Practice, and has built a distinguished career as a legal strategist and courtroom advocate. With extensive experience in criminal law, Adv. Louise has successfully defended clients in complex criminal cases, ranging from white-collar crimes to serious felonies. Her approach combines rigorous legal analysis with a deep understanding of criminal procedure and evidence law. She is particularly known for her work in victim protection and ensuring that the rights of both defendants and victims are properly balanced in criminal proceedings. In family law, Adv. Louise has identified expertise in divorce proceedings, child custody disputes, property division, and adoption cases. She approaches family law matters with sensitivity and understanding, recognizing the emotional complexity of these cases while providing strong legal advocacy. Her strategic thinking and attention to detail have earned her a reputation for achieving favorable outcomes in challenging family law situations. Beyond her practice areas, Adv. Louise is committed to legal education and has been involved in training programs for new advocates and legal professionals. She regularly contributes to discussions on criminal justice reform and family law development in Rwanda. Her dedication to justice and client advocacy has made her a respected figure in the legal community.'
  },
  'aloys-ntirushwamaboko': {
    name: 'Adv. Aloys Ntirushwamaboko',
    position: 'Senior Associate',
    academicQualifications: ['Master of Laws (LL.M)', 'Bachelor of Laws (LL.B)', 'Diploma in Legal Practice (DLP)'],
    professionalExperience: [
      'Senior Associate at Probity Partners East Africa',
      'Specialist in Public International Law',
      'Commercial Law Practitioner',
      'Legal Advisor with extensive experience',
      'Member of Rwanda Bar Association'
    ],
    researchInterests: ['Public International Law', 'Commercial Practice', 'Legal Advisory', 'Corporate Law', 'International Trade'],
    publications: ['Contributions to international law research', 'Commercial law practice guides'],
    memberships: ['Rwanda Bar Association', 'East Africa Law Society'],
    awards: ['Recognition for international law expertise', 'Excellence in commercial practice'],
    certifications: ['Legal Practice Certification', 'International Law Specialization'],
    languages: ['English', 'Kinyarwanda', 'French'],
    detailedBio: 'Adv. Aloys Ntirushwamaboko is a Senior Associate at the firm, specializing in Public International Law and Commercial Practice. He holds a Master of Laws (LL.M) and Bachelor of Laws (LL.B) from the National University of Rwanda, along with a Diploma in Legal Practice (DLP). With extensive experience in international law, Adv. Aloys has developed expertise in cross-border legal matters, international trade, and commercial transactions. His practice encompasses advising clients on international business operations, trade agreements, and compliance with international legal frameworks. In commercial law, he has successfully handled complex corporate transactions, contract negotiations, and dispute resolution matters. Adv. Aloys is known for his strategic approach to international legal challenges and his ability to navigate complex regulatory environments. He regularly contributes to the firm\'s international practice and has been involved in significant cross-border legal matters.'
  },
  'aziza-lola': {
    name: 'Adv. Aziza Lola',
    position: 'Senior Associate',
    academicQualifications: ['Bachelor of Laws (LL.B)', 'Postgraduate Diploma in Legal Practice'],
    professionalExperience: [
      'Senior Associate at Probity Partners East Africa',
      'Legal Analyst with specialized expertise',
      'Criminal Justice Specialist',
      'Victim Advocacy Expert',
      'Transitional Justice Practitioner',
      'Member of Rwanda Bar Association'
    ],
    researchInterests: ['Criminal Justice', 'Victim Advocacy', 'Transitional Justice', 'Legal Analysis', 'Human Rights'],
    publications: ['Research on criminal justice reform', 'Victim advocacy initiatives'],
    memberships: ['Rwanda Bar Association', 'East Africa Law Society'],
    awards: ['Recognition for victim advocacy work', 'Excellence in criminal justice'],
    certifications: ['Legal Practice Certification', 'Victim Advocacy Specialization'],
    languages: ['English', 'Kinyarwanda', 'French'],
    detailedBio: 'Adv. Aziza Lola is a Senior Associate at the firm, specializing in Criminal Justice and Victim Advocacy. She holds a Bachelor of Laws (LL.B) and a Postgraduate Diploma in Legal Practice, and has developed expertise in transitional justice and human rights law. Throughout her career, Adv. Aziza has focused on ensuring that victims of crimes receive proper legal representation and support. She has been involved in numerous cases involving human rights violations, working closely with victims to ensure their voices are heard in legal proceedings. Her work in transitional justice has contributed to Rwanda\'s post-conflict legal framework, helping to establish mechanisms for truth, justice, and reconciliation. Adv. Aziza is known for her compassionate approach to client representation and her commitment to advancing human rights through legal practice.'
  },
  'jules-lambert': {
    name: 'Adv. Jules Lambert Ineza',
    position: 'Senior Associate',
    academicQualifications: ['Bachelor of Laws (LL.B)', 'Postgraduate Diploma in Legal Practice'],
    professionalExperience: [
      'Senior Associate at Probity Partners East Africa',
      'Legal Consultant with research focus',
      'Researcher in Justice and Development',
      'Legal Policy Analyst',
      'Member of Rwanda Bar Association'
    ],
    researchInterests: ['Justice and Development', 'Legal Policy', 'Legal Research', 'Development Law', 'Social Justice'],
    publications: ['Research on justice and development', 'Legal policy analysis'],
    memberships: ['Rwanda Bar Association', 'East Africa Law Society'],
    awards: ['Recognition for research contributions', 'Excellence in legal policy'],
    certifications: ['Legal Practice Certification', 'Research Methodology'],
    languages: ['English', 'Kinyarwanda', 'French'],
    detailedBio: 'Adv. Jules Lambert Ineza is a Senior Associate at the firm, combining legal practice with research in Justice and Development. He holds a Bachelor of Laws (LL.B) and a Postgraduate Diploma in Legal Practice, and has developed expertise in legal policy analysis and development law. Throughout his career, Adv. Jules has focused on understanding the intersection between legal systems and development outcomes, contributing to research initiatives that inform policy decisions. He has been involved in various development projects, providing legal analysis and policy recommendations. His work emphasizes the importance of strong legal frameworks in achieving sustainable development goals. Adv. Jules is known for his analytical approach to complex legal and policy issues.'
  },
  'bakunda-emmanuel': {
    name: 'BAKUNDA Emmanuel',
    position: 'Associate',
    academicQualifications: [
      "Bachelor of Laws (LL.B), University of Rwanda",
      "Diploma in Legal Practice, Institute of Legal Practice and Development (ILPD)",
      "Pursuing Master's in Business Law, University of Rwanda"
    ],
    professionalExperience: [
      'Corporate Associate',
      'Regulatory compliance and commercial transactions',
      'Corporate governance and legal drafting',
      'Advisory support to businesses'
    ],
    researchInterests: ['Corporate Governance', 'Business Law', 'Intellectual Property', 'Commercial Transactions'],
    publications: [],
    memberships: [],
    awards: [],
    certifications: [],
    languages: ['English', 'Kinyarwanda', 'French'],
    detailedBio: 'BAKUNDA Emmanuel is a dedicated Corporate Associate with a solid foundation in business and corporate law. He holds an LL.B from the University of Rwanda and a Diploma in Legal Practice from ILPD, and is currently pursuing a Master’s in Business Law. Emmanuel focuses on corporate governance, regulatory compliance, contract drafting and review, and intellectual property, helping companies navigate complex legal environments with clarity and confidence.'
  },
  'anny-princia': {
    name: 'Anny Princia Habiyaremye',
    position: 'Legal Consultant',
    academicQualifications: [
      "Bachelor's degree in Law"
    ],
    professionalExperience: [
      'Consultant with cross‑jurisdictional experience in Rwanda and Canada',
      'Experience at PPEA, Legal Aid Forum, Great Lakes Lawyers (Rwanda)',
      'Experience at Emond Harnden LLP (Ottawa, Canada)'
    ],
    researchInterests: ['Administrative Law', 'Employment Law', 'Legal Research'],
    publications: [],
    memberships: [],
    awards: [],
    certifications: [],
    languages: ['English', 'Kinyarwanda', 'French'],
    detailedBio: 'Anny Princia Habiyaremye is a legal consultant with cross‑jurisdictional experience in Rwanda and Canada, bringing a unique perspective across civil and common law systems. With a strong foundation in administrative and employment law and proven legal research ability, she provides clear, strategic, and practical legal solutions tailored to client needs.'
  },
  'mary-stella': {
    name: 'Mary Stella Irasubiza',
    position: 'Junior Legal Associate',
    academicQualifications: [
      "Bachelor's degree in Law (LL.B), University of Lay Adventists of Kigali (UNILAK)"
    ],
    professionalExperience: [
      'Drafting court submissions and legal documents',
      'Comprehensive legal research for litigation and advisory work',
      'Document preparation and review'
    ],
    researchInterests: ['Legal Research', 'Litigation Support', 'Document Drafting'],
    publications: [],
    memberships: [],
    awards: [],
    certifications: [],
    languages: ['English', 'Kinyarwanda'],
    detailedBio: 'Mary Stella is a Junior Legal Associate focused on legal research, drafting court submissions, and preparing documents to support the firm’s litigation and advisory work. She brings a proactive approach to professional development and a strong commitment to high‑quality, client‑focused legal support.'
  },
  'muhire-herve': {
    name: 'Muhire Herve',
    position: 'IT Support Specialist',
    academicQualifications: [
      "Bachelor's degree in Computer Science, Mount Kenya University Rwanda (MKUR)"
    ],
    professionalExperience: [
      'Diagnosing and resolving hardware/software issues',
      'Maintaining IT systems and supporting staff',
      'Ensuring secure, efficient, user‑focused IT operations'
    ],
    researchInterests: ['IT Support', 'System Administration', 'Software Engineering'],
    publications: [],
    memberships: [],
    awards: [],
    certifications: [],
    languages: ['English', 'Kinyarwanda'],
    detailedBio: 'With 5+ years of experience, Herve provides reliable and efficient technical support, maintaining systems and assisting teams across the firm. He is known for a problem‑solving mindset, attention to detail, and commitment to a secure and user‑focused IT environment.'
  },
  'ntaganda-ganza': {
    name: 'NTAGANDA Ganza Dan',
    position: 'IT Support Specialist',
    academicQualifications: [
      "Bachelor’s in Information Technology (Software Engineering), Adventist University of Central Africa"
    ],
    professionalExperience: [
      'Troubleshooting hardware and software issues',
      'Maintaining secure IT infrastructure',
      'Supporting digital tools for legal professionals'
    ],
    researchInterests: ['IT Support', 'System Security', 'Software Engineering'],
    publications: [],
    memberships: [],
    awards: [],
    certifications: [],
    languages: ['English', 'Kinyarwanda'],
    detailedBio: 'Ganza is an IT Support Specialist experienced in maintaining reliable and secure systems in the legal sector. With a background in software development and system support, he brings a practical, problem‑solving mindset and focuses on continuous improvement and proactive support.'
  },
  'jean-baptiste': {
    name: 'Adv. Jean Baptiste',
    position: 'Associate',
    academicQualifications: ['Bachelor of Laws (LL.B)', 'Postgraduate Diploma in Legal Practice'],
    professionalExperience: [
      'Associate at Probity Partners East Africa',
      'Legal Practitioner with diverse experience',
      'Member of Rwanda Bar Association'
    ],
    researchInterests: ['General Legal Practice', 'Civil Law', 'Commercial Law', 'Legal Research'],
    publications: ['Contributions to legal practice', 'Case law analysis'],
    memberships: ['Rwanda Bar Association', 'East Africa Law Society'],
    awards: ['Recognition for legal practice'],
    certifications: ['Legal Practice Certification'],
    languages: ['English', 'Kinyarwanda', 'French'],
    detailedBio: 'Adv. Jean Baptiste is an Associate at the firm, bringing diverse legal experience to the team. He holds a Bachelor of Laws (LL.B) and a Postgraduate Diploma in Legal Practice, and has developed expertise in various areas of legal practice. Throughout his career, Adv. Jean has handled a wide range of legal matters, demonstrating versatility and adaptability in different practice areas. He is committed to providing quality legal services to clients and contributing to the firm\'s success.'
  },
  'jean-damascene': {
    name: 'Adv. Jean Damascene',
    position: 'Associate',
    academicQualifications: ['Bachelor of Laws (LL.B)', 'Postgraduate Diploma in Legal Practice'],
    professionalExperience: [
      'Associate at Probity Partners East Africa',
      'Legal Practitioner with specialized focus',
      'Member of Rwanda Bar Association'
    ],
    researchInterests: ['Legal Practice', 'Civil Litigation', 'Legal Research', 'Client Advocacy'],
    publications: ['Contributions to legal practice', 'Case studies'],
    memberships: ['Rwanda Bar Association', 'East Africa Law Society'],
    awards: ['Recognition for legal practice'],
    certifications: ['Legal Practice Certification'],
    languages: ['English', 'Kinyarwanda', 'French'],
    detailedBio: 'Adv. Jean Damascene is an Associate at the firm, specializing in civil litigation and legal research. He holds a Bachelor of Laws (LL.B) and a Postgraduate Diploma in Legal Practice, and has developed expertise in handling complex civil cases. Throughout his career, Adv. Jean has demonstrated strong analytical skills and dedication to client advocacy. He is known for his thorough approach to legal research and his commitment to achieving favorable outcomes for clients.'
  },
  'jean-paul': {
    name: 'Adv. Jean Paul',
    position: 'Associate',
    academicQualifications: ['Bachelor of Laws (LL.B)', 'Postgraduate Diploma in Legal Practice'],
    professionalExperience: [
      'Associate at Probity Partners East Africa',
      'Legal Practitioner with diverse expertise',
      'Member of Rwanda Bar Association'
    ],
    researchInterests: ['Legal Practice', 'Commercial Law', 'Legal Research', 'Client Services'],
    publications: ['Contributions to legal practice', 'Commercial law analysis'],
    memberships: ['Rwanda Bar Association', 'East Africa Law Society'],
    awards: ['Recognition for legal practice'],
    certifications: ['Legal Practice Certification'],
    languages: ['English', 'Kinyarwanda', 'French'],
    detailedBio: 'Adv. Jean Paul is an Associate at the firm, bringing expertise in commercial law and legal research. He holds a Bachelor of Laws (LL.B) and a Postgraduate Diploma in Legal Practice, and has developed skills in handling commercial legal matters. Throughout his career, Adv. Jean has focused on providing comprehensive legal services to business clients, ensuring their legal needs are met effectively. He is committed to staying updated with legal developments and providing innovative solutions to complex legal challenges.'
  },
  'jean-marie': {
    name: 'Adv. Jean Marie',
    position: 'Associate',
    academicQualifications: ['Bachelor of Laws (LL.B)', 'Postgraduate Diploma in Legal Practice'],
    professionalExperience: [
      'Associate at Probity Partners East Africa',
      'Legal Practitioner with research focus',
      'Member of Rwanda Bar Association'
    ],
    researchInterests: ['Legal Practice', 'Legal Research', 'Policy Analysis', 'Client Advocacy'],
    publications: ['Contributions to legal research', 'Policy analysis'],
    memberships: ['Rwanda Bar Association', 'East Africa Law Society'],
    awards: ['Recognition for research contributions'],
    certifications: ['Legal Practice Certification'],
    languages: ['English', 'Kinyarwanda', 'French'],
    detailedBio: 'Adv. Jean Marie is an Associate at the firm, combining legal practice with research and policy analysis. He holds a Bachelor of Laws (LL.B) and a Postgraduate Diploma in Legal Practice, and has developed expertise in legal research methodologies. Throughout his career, Adv. Jean has contributed to various research initiatives, providing valuable insights into legal policy and practice. He is committed to advancing legal knowledge and improving legal services through research and analysis.'
  },
  'jean-claude': {
    name: 'Adv. Jean Claude',
    position: 'Associate',
    academicQualifications: ['Bachelor of Laws (LL.B)', 'Postgraduate Diploma in Legal Practice'],
    professionalExperience: [
      'Associate at Probity Partners East Africa',
      'Legal Practitioner with diverse experience',
      'Member of Rwanda Bar Association'
    ],
    researchInterests: ['Legal Practice', 'Civil Law', 'Legal Research', 'Client Services'],
    publications: ['Contributions to legal practice', 'Case law analysis'],
    memberships: ['Rwanda Bar Association', 'East Africa Law Society'],
    awards: ['Recognition for legal practice'],
    certifications: ['Legal Practice Certification'],
    languages: ['English', 'Kinyarwanda', 'French'],
    detailedBio: 'Adv. Jean Claude is an Associate at the firm, bringing diverse legal experience and a commitment to client service. He holds a Bachelor of Laws (LL.B) and a Postgraduate Diploma in Legal Practice, and has developed expertise in various areas of legal practice. Throughout his career, Adv. Jean has demonstrated strong analytical skills and dedication to achieving positive outcomes for clients. He is known for his thorough approach to legal matters and his commitment to professional excellence.'
  }
}

const getTeamMemberDetails = (slug: string) => {
  return memberDetails[slug as keyof typeof memberDetails] || null
}

const getProfilePhoto = (slug: string) => {
  const photoMap: Record<string, string> = {
    'alice-umulisa': '/assets/Profile pictures/Alice.jpg',
    'keza-ntaganda': '/assets/Profile pictures/Keza.jpg',
    'rene-munyamahoro': '/assets/Profile pictures/Rene.jpg',
    'furaha-umutoni': '/assets/Profile pictures/Furaha.jpg',
    'mukashema-louise': '/assets/Profile pictures/Louise.png',
    'aloys-ntirushwamaboko': '/assets/Profile pictures/Aloys.jpg',
    'aziza-lola': '/assets/Profile pictures/Aziza.jpg',
    'jules-lambert': '/assets/Profile pictures/Jules.jpg',
    'bakunda-emmanuel': '/assets/Profile pictures/Emmanuel.jpg',
    'anny-princia': '/assets/Profile pictures/Princia.jpg',
    'mary-stella': '/assets/Profile pictures/Stella.jpg',
    'muhire-herve': '/assets/Profile pictures/Herve.jpg',
    'ntaganda-ganza': '/assets/Profile pictures/Ganza.jpg',
    'jean-baptiste': '/assets/Profile pictures/Jean.jpg',
    'jean-damascene': '/assets/Profile pictures/Damascene.jpg',
    'jean-paul': '/assets/Profile pictures/Jean-Paul.jpg',
    'jean-marie': '/assets/Profile pictures/Jean-Marie.jpg',
    'jean-claude': '/assets/Profile pictures/Jean-Claude.jpg'
  }
  return photoMap[slug] || '/assets/Profile pictures/default.jpg'
}

export default function TeamMemberProfile({ slug }: TeamMemberProfileProps) {
  // For testing, bypass loading state and use direct data
  const details = getTeamMemberDetails(slug)
  const mockMember: TeamMember = {
    _id: slug,
    name: details?.name || 'Team Member',
    position: details?.position || 'Legal Professional',
    photo: getProfilePhoto(slug),
    slug: { current: slug },
    shortBio: details?.detailedBio?.substring(0, 200) + '...' || 'Experienced legal professional',
    specialties: details?.researchInterests || [],
    isPartner: slug === 'alice-umulisa' || slug === 'rene-munyamahoro' || slug === 'furaha-umutoni' || slug === 'aloys-ntirushwamaboko',
    email: undefined,
    linkedin: undefined,
    twitter: undefined,
    order: 1
  }

  if (!details) {
    return (
      <div className="pt-20">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
            <p className="text-gray-600 mb-6">The requested team member profile could not be found.</p>
            <Link 
              href="/team" 
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Team
            </Link>
          </div>
        </div>
      </div>
    )
  }



  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Profile Photo */}
            <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="w-64 h-64 mx-auto lg:mx-0 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img
                    src={mockMember.photo}
                    alt={mockMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Partner Badge */}
                {mockMember.isPartner && (
                  <div className="absolute -top-2 -right-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    Partner
                    </div>
                  )}
              </motion.div>
                    </div>

            {/* Profile Info */}
            <div className="lg:col-span-2 text-center lg:text-left">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {mockMember.name}
                </h1>
                <p className="text-xl text-primary-100 mb-6">
                  {mockMember.position}
                </p>
                <p className="text-lg text-primary-200 leading-relaxed mb-8">
                  {mockMember.shortBio}
                </p>

                {/* Contact Info */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  {mockMember.email && (
                    <a
                      href={`mailto:${mockMember.email}`}
                      className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors duration-200"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </a>
                  )}
                  {mockMember.linkedin && (
                    <a
                      href={mockMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors duration-200"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </motion.div>
                  </div>
                </div>
                    </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Team */}
          <div className="mb-8">
            <Link
              href="/team"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Team
            </Link>
                    </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Specialties */}
              {mockMember.specialties && mockMember.specialties.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Target className="w-6 h-6 mr-3 text-primary-600" />
                    Areas of Expertise
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockMember.specialties.map((specialty, index) => (
                      <div
                        key={index}
                        className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                      >
                        <Star className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{specialty}</span>
                    </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Detailed Biography */}
              {details?.detailedBio && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <BookOpen className="w-6 h-6 mr-3 text-primary-600" />
                    Biography
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {details.detailedBio}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Academic Qualifications */}
              {details?.academicQualifications && details.academicQualifications.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <GraduationCap className="w-6 h-6 mr-3 text-primary-600" />
                    Academic Qualifications
                  </h2>
                  <div className="space-y-3">
                    {details.academicQualifications.map((qualification: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                      >
                        <Award className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{qualification}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Professional Experience */}
              {details?.professionalExperience && details.professionalExperience.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Briefcase className="w-6 h-6 mr-3 text-primary-600" />
                    Professional Experience
                  </h2>
                  <div className="space-y-3">
                    {details.professionalExperience.map((experience: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                      >
                        <Star className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{experience}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Research Interests */}
              {details?.researchInterests && details.researchInterests.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <BookOpen className="w-6 h-6 mr-3 text-primary-600" />
                    Research Interests
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {details.researchInterests.map((interest: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                      >
                        <Target className="w-4 h-4 text-blue-600 mr-3" />
                        <span className="text-gray-700 text-sm">{interest}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Publications */}
              {details?.publications && details.publications.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-primary-600" />
                    Publications & Research
                  </h2>
                  <div className="space-y-3">
                    {details.publications.map((publication: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
                      >
                        <BookOpen className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{publication}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
                    </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-6"
              >
                {/* Quick Info Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-primary-600" />
                    Quick Info
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Shield className="w-4 h-4 mr-3 text-primary-500" />
                      <span className="font-medium">Status:</span>
                      <span className="ml-2">
                        {mockMember.isPartner ? 'Partner' : 'Associate'}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-3 text-primary-500" />
                      <span className="font-medium">Team:</span>
                      <span className="ml-2">Legal Practice</span>
                  </div>
                    </div>
                  </div>

                {/* Memberships & Awards */}
                {(details?.memberships || details?.awards) && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-primary-600" />
                      Memberships & Awards
                    </h3>
                    <div className="space-y-3">
                      {details?.memberships && details.memberships.map((membership: string, index: number) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-3 text-primary-500" />
                          {membership}
                        </div>
                      ))}
                      {details?.awards && details.awards.map((award: string, index: number) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <Star className="w-4 h-4 mr-3 text-primary-500" />
                          {award}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {details?.certifications && details.certifications.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-primary-600" />
                      Certifications
                    </h3>
                    <div className="space-y-2">
                      {details.certifications.map((certification: string, index: number) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <Award className="w-4 h-4 mr-3 text-primary-500" />
                          {certification}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {details?.languages && details.languages.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-primary-600" />
                      Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {details.languages.map((language: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Card */}
                {(mockMember.email || mockMember.linkedin) && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-primary-600" />
                      Contact
                    </h3>
                    <div className="space-y-3">
                      {mockMember.email && (
                        <a
                          href={`mailto:${mockMember.email}`}
                          className="flex items-center text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200"
                        >
                          <Mail className="w-4 h-4 mr-3" />
                          {mockMember.email}
                        </a>
                      )}
                      {mockMember.linkedin && (
                        <a 
                          href={mockMember.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200"
                        >
                          <Linkedin className="w-4 h-4 mr-3" />
                          LinkedIn Profile
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
