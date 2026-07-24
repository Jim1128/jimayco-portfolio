/* Real projects, sourced from resume + existing project files. No fabricated metrics. */
window.PORTFOLIO_PROJECTS = [
    {
        id: 'enki',
        title: 'Enki.AI Automation Work',
        category: 'automation',
        featured: true,
        logo: 'Pictures/profile%20img/Jim%20Profile.jpg', // replaced by text tile in renderers
        textLogo: 'enki',
        tags: ['n8n', 'API Integration', 'AI Automation', 'Workflow'],
        short: 'Production AI automation and workflow solutions for lead generation, email campaigns, and API integrations.',
        problem: 'Business operations relied on repetitive manual outreach, tracking, and data entry across several disconnected tools.',
        built: [
            'Designed and maintained production n8n workflows for business operations.',
            'Built lead-generation, email-campaign, validation, follow-up, and click-tracking automation.',
            'Integrated Gmail, Google Sheets, HubSpot, and other APIs for automated data movement.',
            'Tested, monitored, and improved workflow reliability and campaign output.'
        ],
        stack: ['n8n', 'REST APIs', 'Gmail API', 'Google Sheets', 'HubSpot', 'JSON', 'Webhooks']
    },
    {
        id: 'laag',
        title: 'La-ag Smart Tourism Platform',
        category: 'mobile',
        featured: true,
        logo: 'Pictures/Laag/LAAG.png',
        tags: ['React Native', 'Expo', 'Node.js', 'Firebase', 'MySQL'],
        short: 'A mobile & web tourism platform with maps, geofencing, QR tracking, reviews, and destination content.',
        problem: 'Tourists lacked a unified planning tool, while site owners and administrators had no structured way to track reviews and visitor activity.',
        built: [
            'Created a mobile tourism platform with maps, geofencing, QR tracking, reviews, and ratings.',
            'Added smart recommendations, itinerary support, badges, rewards, and tourism analytics.',
            'Built web admin views for content, monitoring, and analytics.'
        ],
        stack: ['React Native', 'Expo', 'Node.js', 'Firebase', 'MySQL'],
        gallery: {
            mobile: ['Pictures/Laag/Tour/LOGIN.jpg', 'Pictures/Laag/Tour/DASHBOARD.jpg', 'Pictures/Laag/Tour/GEOMAP.jpg', 'Pictures/Laag/Tour/Preferences.jpg', 'Pictures/Laag/Tour/QRCODE.jpg', 'Pictures/Laag/Tour/QRSCAN.jpg', 'Pictures/Laag/Tour/SiteProfile.jpg', 'Pictures/Laag/Tour/Reviews.jpg', 'Pictures/Laag/Tour/SOCIALS.jpg', 'Pictures/Laag/Tour/MESSAGES.jpg'],
            web: ['Pictures/Laag/SubA/LOG.png', 'Pictures/Laag/SubA/DBD.png', 'Pictures/Laag/SubA/DBM.png', 'Pictures/Laag/SubA/DBA.png', 'Pictures/Laag/SA/LOG.png', 'Pictures/Laag/SA/DBA.png', 'Pictures/Laag/SA/SM.png']
        }
    },
    {
        id: 'eraj',
        title: 'Emergency Response Application',
        category: 'mobile',
        featured: true,
        logo: 'Pictures/images.jpg',
        tags: ['React Native', 'Firebase', 'REST API', 'Google Maps'],
        short: 'Emergency reporting app with geofencing, live incident mapping, SOS functionality, and responder assignment.',
        problem: 'Responders needed faster incident reporting and clearer coordination during emergencies.',
        built: [
            'Developed emergency reporting with geofencing, live incident mapping, and SOS functionality.',
            'Added automatic responder assignment based on incident location.',
            'Designed mobile interfaces to submit incidents and view response status.'
        ],
        stack: ['React Native', 'Firebase', 'REST API', 'Google Maps']
    },
    {
        id: 'barangay',
        title: 'Barangay Resident Portal',
        category: 'web',
        featured: true,
        logo: 'Pictures/BRP/BG23.png',
        tags: ['PHP', 'MySQL', 'QR Code', 'JavaScript'],
        short: 'A web portal for resident records, certificate requests, appointments, announcements, and reports.',
        problem: 'Local administrative processes were manual and paper-based, causing delays and tracking errors.',
        built: [
            'Built a web-based resident management system for profiles, certificate requests, appointments, announcements, and reports.',
            'Implemented QR-based processes, role-based access, and administrative monitoring features.'
        ],
        stack: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS']
    },
    {
        id: 'veggieshop',
        title: 'VeggieShop Marketplace',
        category: 'web',
        featured: true,
        logo: 'Pictures/VeggieShop/Logo.png',
        tags: ['JavaScript', 'HTML5', 'CSS3', 'Firebase'],
        short: 'An e-commerce marketplace connecting farmers and buyers through listings, cart, chat, and payments.',
        problem: 'Farmers lost margins to brokers, and buyers had limited direct access to fresh produce.',
        built: [
            'Built an e-commerce marketplace connecting farmers and buyers through product listings, cart, chat, and payments.',
            'Designed responsive buyer and seller interfaces for product and order management.'
        ],
        stack: ['JavaScript', 'HTML5', 'CSS3', 'Firebase']
    },
    {
        id: 'cdrrmo',
        title: 'CDRRMO Information System',
        category: 'web',
        featured: false,
        logo: 'Pictures/CDDRMO/LOGO.jpg',
        tags: ['PHP', 'MySQL', 'JavaScript'],
        short: 'A disaster coordination system for incident reports, responder deployment tracking, and log records.',
        problem: 'Disaster risk coordinators lacked unified tools to track incidents and compile reports.',
        built: [
            'Centralized incident report indexing and responder deployment tracking.',
            'Built dashboard summaries and downloadable report sheets.'
        ],
        stack: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS']
    },
    {
        id: 'mabels',
        title: "Mabel's Management System",
        category: 'web',
        featured: false,
        logo: 'Pictures/Mabels/Logo.png',
        tags: ['PHP', 'MySQL', 'JavaScript'],
        short: 'A business inventory and ledger management system with stock and daily sales tracking.',
        problem: 'Small business operators tracked inventory and sales manually, leading to discrepancies.',
        built: [
            'Built product ledger databases and inventory check indicators.',
            'Tracked daily cash, sales logs, and transaction audits.'
        ],
        stack: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS']
    }
];
