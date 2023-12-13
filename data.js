const questions = {
  1: {
    id: "1",
    title: 'What is a time you went above and beyond for a customer?',
    category: 'Customer Obsession',
    author: 'Admin',
    date: formatDateTime(new Date()),
},
  2: {
    id: "2",
    title: 'Tell me about a time you had to make a decision without all the information you needed.',
    category: 'Dive Deep',
    author: 'Admin',
    date: formatDateTime(new Date()),
},
  3: {
    id: "3",
    title: 'Describe a tough situation in which you had to step into a leadership role.',
    category: 'Ownership',
    author: 'Admin',
    date: formatDateTime(new Date()),
},
  4: {
    id: "4",
    title: 'Describe a time you had to come up with a creative solution to a problem.',
    category: 'Invent and Simplify',
    author: 'Admin',
    date: formatDateTime(new Date()),
},
  5: {
    id: "5",
    title: 'Tell us about a time when you had to make sacrifices in your personal life to complete an arduous project.',
    category: 'Bias for Action',
    author: 'Admin',
    date: formatDateTime(new Date()),
},
  6: {
    id: "6",
    title: 'Tell us about a time when you had to acquire a new skill, dislodging you from your zone of comfort.',
    category: 'Learn and Be Curious',
    author: 'Admin',
    date: formatDateTime(new Date()),
},
};


function formatDateTime(date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}

module.exports = {
  questions,
  formatDateTime,
};