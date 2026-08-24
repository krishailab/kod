const fs = require('fs');
const path = require('path');

const certDir = path.join(__dirname, 'downloaded_certificates');
const files = fs.readdirSync(certDir).filter(f => f.endsWith('.pdf'));

const uniqueMembers = new Map();

for (const file of files) {
  // Format: KDRS2025786-903 - Shivam Patel.pdf
  const match = file.match(/^([A-Z0-9-]+)\s*-\s*(.+)\.pdf$/i);
  if (match) {
    const certId = match[1];
    let name = match[2].trim();
    // Normalize name (Title Case)
    name = name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

    if (!uniqueMembers.has(name.toLowerCase())) {
        if(name.toLowerCase() !== 'krish bhagat' && name.toLowerCase() !== 'shivam patel') {
             uniqueMembers.set(name.toLowerCase(), { name, certId });
        }
    }
  }
}

const teamArray = [
  {
    name: "Krish Bhagat",
    role: "Founder & CEO/Executive Lead",
    certId: "KDRS",
    description: "Krish Bhagat is a skilled AI/ML and web developer, founder of KodRish, FastAPI developer, and AI prompting engineer, specializing in sign language translators and real-time analytics.",
    image: "",
  },
  {
    name: "Shivam Patel",
    role: "Python Developer (Data Science Team)",
    certId: "KDRS25-001",
    description: "A strong passion for machine learning, deep learning, and Python programming. Involved with Kodrish Innovation and Solution, where I provide cutting-edge Python apps & machine learning solutions.",
    image: "",
  }
];

for (const member of uniqueMembers.values()) {
    teamArray.push({
        name: member.name,
        role: "Intern",
        certId: member.certId,
        description: "",
        image: ""
    });
}

const teamSectionPath = path.join(__dirname, 'components/about/team-section.tsx');
let content = fs.readFileSync(teamSectionPath, 'utf8');

const regex = /const team = \[[\s\S]*?\];/;
content = content.replace(regex, `const team = ${JSON.stringify(teamArray, null, 2)};`);

fs.writeFileSync(teamSectionPath, content);
console.log("Updated team section with " + uniqueMembers.size + " interns!");
