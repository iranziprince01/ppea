import Link from 'next/link'

export default function InstitutionalSupportDevelopmentPage() {
  const serviceAreas = [
    {
      title: 'Access to Justice',
      description: 'Supporting institutions and individuals in ensuring equal access to legal services and justice systems.'
    },
    {
      title: 'Alternative Dispute Resolution',
      description: 'Facilitating mediation, arbitration, and other ADR methods for efficient conflict resolution.'
    },
    {
      title: 'Surveys and Research',
      description: 'Conducting comprehensive research in good governance, human rights, and institutional effectiveness.'
    },
    {
      title: 'Litigation Support',
      description: 'Providing legal representation and support across all fields of law for institutions and individuals.'
    },
    {
      title: 'Capacity Building & Institutional Development',
      description: 'Enhancing capabilities in access to justice, rule of law, human rights, good governance, case management, and advocacy.'
    },
    {
      title: 'Project Management',
      description: 'Overseeing and coordinating legal and governance projects from inception to completion.'
    },
    {
      title: 'Paralegal Programmes & Networks',
      description: 'Establishing and supporting paralegal networks to extend legal services to underserved communities.'
    },
    {
      title: 'Monitoring & Evaluation',
      description: 'Assessing the effectiveness of access to justice and legal aid projects and programmes.'
    },
    {
      title: 'Human Rights Education Materials',
      description: 'Developing comprehensive educational resources for human rights awareness and training.'
    },
    {
      title: 'Justice & Security Sector Reform',
      description: 'Supporting reforms in justice and security systems for better governance and service delivery.'
    },
    {
      title: 'Rwanda Law Reform Commission',
      description: 'Specialized support for the Rwanda Law Reform Commission in legal system improvements.'
    }
  ]

  const targetSectors = [
    'Government Institutions',
    'Civil Society Organizations (CSOs)',
    'Private Sector Organizations',
    'Individual Citizens',
    'International Organizations',
    'Development Partners'
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Institutional Support & Development
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-4xl mx-auto leading-relaxed">
              Comprehensive support for government institutions, CSOs, private sector, and individuals in building stronger legal and governance systems across East Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Building Stronger Institutions for Better Governance
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Our Institutional Support & Development service is designed to strengthen the capacity of organizations and institutions across East Africa. We work with government bodies, civil society organizations, private sector entities, and individuals to enhance their legal and governance capabilities.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                From access to justice initiatives to comprehensive institutional reforms, we provide the expertise, resources, and strategic guidance needed to build sustainable, effective, and accountable institutions.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {targetSectors.map((sector, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">💡</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Why Choose Our Institutional Support?
                  </h3>
                  <ul className="text-left space-y-3 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <span className="text-primary-600 mt-0.5 flex-shrink-0">✓</span>
                      <span>Proven track record in institutional development</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary-600 mt-0.5 flex-shrink-0">✓</span>
                      <span>Comprehensive approach to capacity building</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary-600 mt-0.5 flex-shrink-0">✓</span>
                      <span>Expertise in East African legal systems</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary-600 mt-0.5 flex-shrink-0">✓</span>
                      <span>Sustainable solutions for long-term impact</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Service Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support across all aspects of institutional development and legal capacity building
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary-600 font-bold text-lg">{index + 1}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {area.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach & Methodology */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Approach & Methodology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Systematic and proven methods for institutional development and capacity building
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Assessment</h3>
              <p className="text-gray-600">Comprehensive evaluation of current institutional capacity and needs</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Planning</h3>
              <p className="text-gray-600">Strategic development of customized institutional development plans</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Implementation</h3>
              <p className="text-gray-600">Systematic execution of capacity building and development programs</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Evaluation</h3>
              <p className="text-gray-600">Continuous monitoring and assessment of progress and impact</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Strengthen Your Institution?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Let us help you build stronger, more effective institutions that can better serve your communities and stakeholders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                             <Link
                 href="/#contact"
                 className="inline-flex items-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
               >
                 Get Started Today
               </Link>
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-700 transition-colors duration-200"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
