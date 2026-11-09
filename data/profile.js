export const profile = {
  name: 'Vheejay Delacruz Sugay',
  initials: 'VS',
  photo: 'assets/profile.jpg', // set to null to show the initials placeholder instead
  // Shown on the back of the portrait when it is clicked. Remove this line to turn the flip off.
  photoBack: {
    src: 'assets/profile-barong.jpg',
    alt: 'Portrait of Vheejay Delacruz Sugay in a barong',
    caption: 'In barong',
  },
  roles: ['Junior IT Specialist'],
  verse: { text: 'Commit your work to the Lord.', reference: 'Proverbs 16:3' },
  // Personal statement shown in the hero, under the verse.
  quote: {
    text: 'Success, for me, is about what you have done to help others, your community, and your family to improve their lives. It’s not about having the things that I have. It’s about making them proud as time goes by and creating a positive change in their lives. That, for me, is the true meaning of success. You are successful because you helped them on their journey and contributed to their growth and achievements.',
    author: 'Vheejay Sugay',
  },
  location: 'Caloocan City, Philippines',
  email: 'sugayvheejay7@gmail.com',
  phone: '0919-764-3393',
  phoneHref: '+639197643393',
  linkedin: {
    label: 'VheejayDelacruzSugay',
    url: 'https://www.linkedin.com/in/VheejayDelacruzSugay',
  },
  // Add the real GitHub profile URL here when available. Leave null to show a placeholder.
  github: { label: 'JayAncoraimparo24', url: 'https://github.com/JayAncoraimparo24' },
  summary:
    'Information Technology professional with 1 year of experience in IT assistance, web development, and UI/UX. Builds user-friendly websites and writes technical documentation. Has led IT team projects and works well with different teams. Communicates in both English and Filipino. Fast learner, detail-oriented, adaptable, and responsible, with a willingness to learn new technologies.',
};

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];
