// Every `src: null` renders a replaceable placeholder.
// Put real images in assets/images/ and set `src` to the relative path.

// UI/UX and Figma work. `ratio` is each picture's width / height, so nothing is cropped.
// Frames of the GECAR Calendar 2027 souvenir, exported from the Figma file linked below.
// Links shown as buttons under the UI/UX gallery. Make sure each Figma file is set to
// "Anyone with the link can view", otherwise visitors cannot open it.
export const figmaLinks = [
  {
    label: 'View the GECAR Calendar in Figma',
    url: 'https://www.figma.com/design/InAAuf2NZPtaxlxlmFPmqG/GECAR-Calendar-2027--Souvenir-Design-By--Vheejay-Sugay',
  },
  {
    label: 'View Genesis in Figma',
    url: 'https://www.figma.com/design/rlpwnRL2JdkJ2pwwNyiK6u',
  },
  {
    label: 'View the MHIPCOR 2027 Calendar in Figma',
    url: 'https://www.figma.com/design/mdC5x6YniUIkYJZEvnhhtg/MHIPCOR-2027-Calendar?node-id=0-1&p=f',
  },
];

// Figma links shown as buttons above the Graphic Design gallery (print work).
// To bring the Mug Wraps button back, add this entry:
//   { label: 'View the Mug Wraps in Figma', url: 'https://www.figma.com/design/qbQdtQJVK7wWPJBZ7Qjevn/Untitled?node-id=1-1118' }
export const graphicFigmaLinks = [
  {
    label: 'View the Company Uniform & Merch Design in Figma',
    url: 'https://www.figma.com/design/gZo7pe6sMBaP0vQLP98mbs/Untitled?node-id=0-1&p=f',
  },
];

const calendarFrame = (name, label, ratio) => ({
  title: `GECAR Calendar 2027: ${label}`,
  src: `assets/images/ui-ux/gecar-calendar-${name}.jpg`,
  ratio,
});

export const uiuxShowcase = [
  calendarFrame('cover', 'cover', '514 / 298'),
  calendarFrame('january', 'January', '517 / 364'),
  calendarFrame('february', 'February', '514 / 364'),
  calendarFrame('march', 'March', '517 / 364'),
  calendarFrame('april', 'April', '517 / 364'),
  calendarFrame('may', 'May', '514 / 364'),
  calendarFrame('june', 'June', '517 / 364'),
  calendarFrame('july', 'July', '517 / 364'),
  calendarFrame('august', 'August', '514 / 364'),
  calendarFrame('september', 'September', '517 / 364'),
  calendarFrame('october', 'October', '517 / 364'),
  calendarFrame('november', 'November', '514 / 364'),
  calendarFrame('december', 'December', '514 / 364'),
];

// Graphic design works. `ratio` is each picture's width / height, so nothing is cropped.
export const graphicDesignShowcase = [
  { title: 'Profile banner', src: 'assets/images/graphics/profile-banner.jpg', ratio: '1400 / 467' },
  { title: 'Business card', src: 'assets/images/graphics/business-card.jpg', ratio: '1224 / 864' },
  { title: 'Matcha Berry poster', src: 'assets/images/graphics/matcha-berry-poster.jpg', ratio: '933 / 1400' },
  { title: 'T-bone steak ad', src: 'assets/images/graphics/tbone-steak-ad.jpg', ratio: '1400 / 904' },
  { title: 'BINI poster', src: 'assets/images/graphics/bini-poster.jpg', ratio: '872 / 1400' },
  { title: 'Bainary Studio poster', src: 'assets/images/graphics/bainary-studio-poster.jpg', ratio: '1400 / 1018' },
  { title: 'Divina Licious logo', src: 'assets/images/graphics/divina-licious-logo.jpg', ratio: '960 / 697' },
  { title: 'Divina Licious booth design', src: 'assets/images/graphics/divina-licious-booth.jpg', ratio: '720 / 551' },
  { title: 'Success quote', src: 'assets/images/graphics/success-quote.jpg', ratio: '933 / 1400' },
  { title: 'OJT cover', src: 'assets/images/graphics/ojt-cover.jpg', ratio: '933 / 1400' },
  { title: 'System Admin and Maintenance cover', src: 'assets/images/graphics/system-admin-cover.jpg', ratio: '933 / 1400' },
  { title: 'Line-art portrait 1', src: 'assets/images/graphics/line-art-portrait-1-clean.jpg', ratio: '928 / 1152' },
  { title: 'Line-art portrait 2', src: 'assets/images/graphics/line-art-portrait-2-clean.jpg', ratio: '928 / 1152' },
  { title: 'Open to work banner', src: 'assets/images/graphics/open-to-work-banner.webp', ratio: '2000 / 667' },
  { title: 'Birthday cartoon portrait', src: 'assets/images/graphics/birthday-cartoon.webp', ratio: '1086 / 1448' },
  { title: 'Varsity jacket portrait', src: 'assets/images/graphics/varsity-portrait.webp', ratio: '991 / 1587' },
  { title: 'Cry for Justice poster', src: 'assets/images/graphics/cry-for-justice-poster.jpg', ratio: '1414 / 2000' },
  { title: 'Mug Wrap: GECAR Machine Solutions', src: 'assets/images/graphics/mug-wrap-gecar.jpg', ratio: '2000 / 1535' },
  { title: 'Mug Wrap: MHIPCOR', src: 'assets/images/graphics/mug-wrap-mhipcor.jpg', ratio: '2000 / 1535' },
  { title: 'Mug Wrap: Genesis Hydraulics', src: 'assets/images/graphics/mug-wrap-genesis.jpg', ratio: '2000 / 1535' },
];

// Photos taken by Vheejay. Add more entries here.
// `ratio` is the picture's width / height, so the gallery shows each photo uncropped.
export const photographyShowcase = [
  { title: 'Sunset', src: 'assets/images/photography/sunset.jpg', ratio: '3 / 4' },
  { title: 'Sunset over the road', src: 'assets/images/photography/city-sunset.jpg', ratio: '1 / 1' },
  { title: 'Mountain view', src: 'assets/images/photography/mountain.jpg', ratio: '1600 / 670' },
  { title: 'Snail', src: 'assets/images/photography/snail.jpg', ratio: '3 / 4' },
  { title: 'Pendant lamps', src: 'assets/images/photography/pendant-lamps.jpg', ratio: '1 / 1' },
  { title: 'Pendant lamps in low light', src: 'assets/images/photography/pendant-lamps-low-light.jpg', ratio: '1 / 1' },
  { title: 'Woven pendant lamps', src: 'assets/images/photography/woven-pendant-lamps.jpg', ratio: '1 / 1' },
];

// IT support work photos. `ratio` is each picture's width / height, so nothing is cropped.
// (The ID badge in the laptop photo is pixelated on purpose.)
export const itSupportShowcase = [
  { title: 'Laptop opened for hardware maintenance', src: 'assets/images/it-support/laptop-internals.jpg', ratio: '1400 / 1050' },
  { title: 'Network rack with switches and patch panels', src: 'assets/images/it-support/network-rack.jpg', ratio: '1050 / 1400' },
  { title: 'Printer ink system and print head maintenance', src: 'assets/images/it-support/printer-ink-system.jpg', ratio: '1050 / 1400' },
  { title: 'Refilling a printer ink tank', src: 'assets/images/it-support/printer-ink-refill.jpg', ratio: '1050 / 1400' },
  { title: 'At the server room network rack', src: 'assets/images/it-support/server-room-workstation.jpg', ratio: '1400 / 1050' },
  { title: 'Server room cabling', src: 'assets/images/it-support/server-room-cabling.jpg', ratio: '1400 / 1050' },
  { title: 'Monitor on a mounting arm', src: 'assets/images/it-support/monitor-mount.jpg', ratio: '1050 / 1400' },
];
