// skills.js
// Grouped by category so the Skills section can render them in tabs or groups.
// icon: use a string name — the Skills section will map it to a react-icons component.

const skills = [
  {
    category: 'Languages',
    items: [
      { name: 'C++',        icon: 'SiCplusplus',   color: '#00599C' },
      { name: 'JavaScript', icon: 'SiJavascript',  color: '#F7DF1E' },
      { name: 'C',          icon: 'SiC',           color: '#A8B9CC' },
      { name: 'SQL',        icon: 'SiMysql',       color: '#4479A1' },
    ],
  },
  {
    category: 'Frameworks',
    items: [
      { name: 'React.js',   icon: 'SiReact',       color: '#61DAFB' },
      { name: 'Node.js',    icon: 'SiNodedotjs',   color: '#339933' },
      { name: 'Express.js', icon: 'SiExpress',     color: '#FFFFFF' },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'MySQL',      icon: 'SiMysql',       color: '#4479A1' },
      { name: 'MongoDB',    icon: 'SiMongodb',     color: '#47A248' },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git',        icon: 'SiGit',         color: '#F05032' },
      { name: 'GitHub',     icon: 'SiGithub',      color: '#FFFFFF' },
      { name: 'Postman',    icon: 'SiPostman',     color: '#FF6C37' },
      { name: 'Vercel',     icon: 'SiVercel',      color: '#FFFFFF' },
    ],
  },
  {
    category: 'Other',
    items: [
      { name: 'DSA',        icon: 'TbBinaryTree',  color: '#6C63FF' },
      { name: 'OOP',        icon: 'TbBoxModel',    color: '#6C63FF' },
    ],
  },
]

export default skills
