// projects.js
// Add your real projects here. Each object maps to one ProjectCard.
// Fields: title, description, image, tags, liveUrl, githubUrl, featured

const projects = [
  {
    id: 1,
    title: "Farmer's World Wellbeing Web — FW3",
    description:
      'A platform bridging the gap between rural farmers and government resources. Helps farmers discover policies, access agricultural technology, and work more independently — bringing digital empowerment to grassroots India.',
    image: '',                        // add screenshot to src/assets/images/ and update path
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    liveUrl: '',
    githubUrl: 'https://github.com/atharva706/Farmer-World-Wellbeing-Web---FW3',
    featured: false,
  },
  {
    id: 2,
    title: 'CampusConnect',
    description:
      'A departmental web portal for Electronics & Telecommunication students. Peers can download study materials, explore faculty profiles, and access previous year question papers — all in one place.',
    image: '',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    liveUrl: '',
    githubUrl: '',                    // add GitHub link when ready
    featured: false,
  },
  {
    id: 3,
    title: 'NewsCom',
    description:
      'An API-driven news aggregator that surfaces stories across categories like sports, politics, tech, healthcare, and entertainment — giving users a clean, category-filtered reading experience.',
    image: '',
    tags: ['React', 'REST API'],
    liveUrl: '',
    githubUrl: '',                    // add GitHub link when ready
    featured: false,
  },
]

export default projects
