export default {
  name: 'clientInquiry',
  title: 'Client Inquiry',
  type: 'document',
  fields: [
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'serviceRequired',
      title: 'Service Required',
      type: 'string',
      options: {
        list: [
          'Banking and Finance',
          'Insurance',
          'Labour and Administration',
          'Contracts',
          'Taxation',
          'Corporate and Commercial Law',
          'Energy and Infrastructure',
          'Human Rights Law',
          'Criminal and Civil Litigation',
          'Family Law',
          'Notarisation and Legalisation',
          'Intellectual Property',
          'Institutional Support & Development',
          'Other'
        ],
      },
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule: any) => Rule.required().max(1000),
    },
    {
      name: 'status',
      title: 'Inquiry Status',
      type: 'string',
      options: {
        list: [
          'New',
          'In Progress',
          'Contacted',
          'Consultation Scheduled',
          'Converted to Client',
          'Closed'
        ],
      },
      initialValue: 'New',
    },
    {
      name: 'priority',
      title: 'Priority Level',
      type: 'string',
      options: {
        list: [
          'Low',
          'Medium',
          'High',
          'Urgent'
        ],
      },
      initialValue: 'Medium',
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    },
    {
      name: 'assignedTo',
      title: 'Assigned To',
      type: 'reference',
      to: [{ type: 'teamMember' }],
    },
    {
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Internal notes for the legal team',
    },
    {
      name: 'followUpDate',
      title: 'Follow Up Date',
      type: 'datetime',
    },
    {
      name: 'source',
      title: 'Lead Source',
      type: 'string',
      options: {
        list: [
          'Website Contact Form',
          'Phone Call',
          'Email',
          'Referral',
          'Social Media',
          'Other'
        ],
      },
      initialValue: 'Website Contact Form',
    },
    {
      name: 'marketingConsent',
      title: 'Marketing Consent',
      type: 'boolean',
      description: 'Consent to receive marketing communications',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'firstName',
      subtitle: 'email',
      status: 'status',
      submittedAt: 'submittedAt',
    },
    prepare(selection: any) {
      const { title, subtitle, status, submittedAt } = selection
      return {
        title: `${title} ${selection.lastName || ''}`,
        subtitle: `${subtitle} - ${status} (${new Date(submittedAt).toLocaleDateString()})`,
        media: () => '📧',
      }
    },
  },
  orderings: [
    {
      title: 'Submission Date, New',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'Priority, High to Low',
      name: 'priorityDesc',
      by: [{ field: 'priority', direction: 'desc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
}
