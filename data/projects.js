// Screenshot entries use `src: null` until real images are added to assets/images/.
// To replace a placeholder, set src to e.g. 'assets/images/projects/rbm-login.png'.
const screenshots = (count, label) =>
  Array.from({ length: count }, (_, index) => ({
    src: null,
    caption: `${label} ${index + 1}`,
  }));

export const projects = [
  {
    id: 'rbm-motorparts',
    number: '01',
    // Same title as the capstone paper.
    title: 'Development of a Web Application Sales & Inventory System for RBM Motorparts, Accessories, & Services',
    type: 'Capstone Project',
    role: 'Lead UI/UX Designer, Front-End Developer, Manual QA Tester, Technical Documentation',
    date: 'January 2025 – May 2026',
    overview:
      'A web-based sales and inventory system for RBM Motorparts, Accessories, & Services in Caloocan City, improving their manual and Excel-based processes. It handles barcode sales with automatic receipts, tracks inventory, controls employee access, logs system activity, and generates reports. Built by a five-member team using PHP and MySQL, following the Modified Waterfall Model.',
    tools: ['Figma', 'Canva', 'Adobe Photoshop', 'HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'XAMPP'],
    features: [
      'Login with user authentication.',
      'Dashboard with a monthly executive summary: products, low stock, out of stock, defective units, sales revenue, units sold, gross profit, and service profits.',
      'Product and inventory management: add, stock in, edit, adjust, defective units, and delete.',
      'Barcode-enabled sales transactions with automatic receipts.',
      'Service transactions.',
      'Refund processing from order details.',
      'Supplier records.',
      'Employee account management.',
      'User accounts with two-factor authentication.',
      'Sales, services, and inventory reports in PDF for a chosen date range.',
      'History of product and sales activity.',
      'System log with filters by user role, module, action type, and date.',
      'Data backup.',
    ],
    contributions: [
      'Designed nine system screens using Figma, Canva, and Adobe Photoshop.',
      'Prepared complete SDLC documentation, Chapters I–V.',
      'Created five system diagrams and supporting documentation.',
      'Developed a 19-table data dictionary.',
      'Conducted manual testing and supported ISO/IEC 25010 software quality evaluation.',
    ],
    achievement: 'Evaluated with the ISO/IEC 25010 software quality model: Overall Mean Rating of 5.0 (Acceptable).',
    // Optional: photos of the team and the presentation.
    photos: [
      { src: 'assets/images/rbm/defense-team-1.jpg', caption: 'Capstone 1 Defense' },
      { src: 'assets/images/rbm/defense-team-2.jpg', caption: 'Capstone 2 Defense' },
    ],
    // Screenshots taken from the capstone documentation.
    screenshots: [
      { src: 'assets/images/rbm/dashboard.png', caption: 'Dashboard: monthly executive summary' },
      { src: 'assets/images/rbm/login.jpg', caption: 'Login page' },
      { src: 'assets/images/rbm/products.png', caption: 'Products page and Add Product form' },
      { src: 'assets/images/rbm/sales-checkout.png', caption: 'Sales: barcode checkout' },
      { src: 'assets/images/rbm/refund-order-details.png', caption: 'Order details and refund' },
      { src: 'assets/images/rbm/history.png', caption: 'History: product activity' },
      { src: 'assets/images/rbm/report-generation.png', caption: 'Report generation page' },
      { src: 'assets/images/rbm/inventory-report.png', caption: 'Generated inventory report (PDF)' },
      { src: 'assets/images/rbm/system-log.png', caption: 'System log' },
    ],
  },
  {
    id: 'seafood-price-tracking',
    number: '02',
    title: 'Seafood Price Tracking System',
    type: null,
    role: 'UI Designer and Presenter',
    date: 'April 2025',
    overview:
      'An interactive website that lets Filipinos check the current prices of seafood from home. Prices of each fish and mollusk are updated daily, and the site is free to use. It was built by team ArchDevs for the GENNOTECH hackathon of the College of Computer Studies, Global Reciprocal Colleges.',
    tools: [],
    features: [
      'Price list of fish and seafood with a search box, a location filter, and a sort option.',
      'Pop-up for each fish with its Tagalog, English, and scientific names and a short description.',
      'Prices updated daily, with the date of the last update shown.',
      'Home, Description, Prices, and About pages.',
    ],
    contributions: [
      'Created eight mobile/web screens.',
      'Tested more than five key features.',
      'Helped design the interface and price-tracking features as part of a three-member team.',
      'Presented the platform to judges.',
    ],
    achievement: 'Top 5 Finalist — GENNOTECH Creativity Hackathon 2025.',
    // Screens of the website (cropped from the design view) and the hackathon poster.
    screenshots: [
      { src: 'assets/images/seafood/home.jpg', caption: 'Home page', ratio: '818 / 453' },
      { src: 'assets/images/seafood/prices.jpg', caption: 'Prices page', ratio: '818 / 453' },
      { src: 'assets/images/seafood/price-detail.jpg', caption: 'Fish details pop-up', ratio: '818 / 453' },
      { src: 'assets/images/seafood/description.jpg', caption: 'Description page', ratio: '818 / 453' },
      { src: 'assets/images/seafood/about.jpg', caption: 'About page', ratio: '818 / 453' },
      { src: 'assets/images/seafood/gennotech-poster.jpg', caption: 'GENNOTECH hackathon poster', ratio: '1200 / 1604' },
    ],
  },
  {
    id: 'automated-itemization-system',
    number: '03',
    title: 'Automated Itemization System (AIS)',
    type: null,
    role: 'UI Designer, Manual QA Tester, Technical Documentation, Hardware Installation',
    date: '2024–2025',
    overview:
      'An inventory-related system with features for tracking products, monitoring quantities, updating prices, and generating monthly reports.',
    tools: [],
    features: [
      'Product tracking.',
      'Quantity monitoring.',
      'Price updates.',
      'Monthly report generation.',
    ],
    contributions: [
      'Designed the front and back covers and page layouts of the AIS User Manual.',
      'Developed clear, step-by-step instructions for end users.',
      'Documented inventory tracking, product quantity monitoring, price updates, and monthly report generation.',
      'Prepared system documentation covering workflows, requirements, and functions, including five diagrams and flowcharts.',
    ],
    achievement: null,
    // `ratio` is width / height of each picture, so portrait photos are not squeezed into a wide box.
    screenshots: [
      { src: 'assets/images/ais/user-manual-cover.jpg', caption: 'User manual: front cover', ratio: '1236 / 1600' },
      { src: 'assets/images/ais/user-manual-back-cover.jpg', caption: 'User manual: back cover', ratio: '1236 / 1600' },
      { src: 'assets/images/ais/user-manual-printed.jpg', caption: 'Printed user manual: title page and cover', ratio: '1200 / 1600' },
      { src: 'assets/images/ais/mobile-menu.jpg', caption: 'System menu on mobile', ratio: '920 / 1600' },
      { src: 'assets/images/ais/add-product-scanner.jpg', caption: 'Barcode scanner and laptop running the system', ratio: '1200 / 1600' },
      { src: 'assets/images/ais/demo-table.jpg', caption: 'Barcode scanner, laptop, and printed manuals', ratio: '1200 / 1600' },
    ],
  },
  {
    id: 'peso-wifi-system',
    number: '04',
    title: 'PESO WiFi System',
    type: 'Ongoing project',
    role: 'UI/UX Design, Front-End Development, System Development Support',
    date: 'Ongoing',
    overview:
      'A community-based public WiFi management platform. This project is still in progress, so features, tools, and results will be added once it is completed.',
    tools: [],
    features: [],
    contributions: [],
    achievement: null,
    screenshots: screenshots(3, 'Screenshot'),
  },
];
