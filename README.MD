# To-Do List Manager - SBA 316

A dynamic, feature-rich task management application built with vanilla JavaScript and DOM manipulation techniques.

## 🎯 Project Overview

This project demonstrates proficiency in:
- DOM manipulation and traversal
- Event-driven programming
- Form validation (HTML + JavaScript)
- Browser Object Model (BOM)
- Template-based rendering
- Local storage persistence

## ✨ Features

- ✅ **Add Tasks** with title, priority, and due date
- ✏️ **Edit Tasks** inline
- 🗑️ **Delete Tasks** with one click
- ✔️ **Mark Complete** with checkbox
- 🔍 **Filter by Priority** (All, High, Medium, Low)
- 💾 **Auto-save** to localStorage
- 📊 **Task Counter** showing total and completed tasks
- 📱 **Responsive Design** for mobile and desktop

## 🛠️ Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Core functionality
- **DOM API** - Element manipulation
- **BOM** - localStorage and window events
- **Template Elements** - Efficient rendering

## 📋 SBA 316 Requirements Checklist

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| getElementById | ✅ | Multiple elements cached |
| querySelector/querySelectorAll | ✅ | Used throughout |
| Parent-child-sibling navigation | ✅ | Delete function uses parentNode, nextElementSibling |
| Iterate over collection | ✅ | Filter function iterates all tasks |
| createElement | ✅ | Filter buttons created dynamically |
| appendChild/prepend | ✅ | Tasks added to list, filters prepended |
| DocumentFragment/cloneNode | ✅ | Template cloning for tasks |
| Modify innerHTML/textContent | ✅ | Task text and badges updated |
| Modify style/classList | ✅ | Completed tasks styled, filter buttons |
| Modify attributes | ✅ | data-editing attribute on submit button |
| Event listeners (≥2) | ✅ | Submit, checkbox, edit, delete, filter |
| BOM properties (≥2) | ✅ | localStorage, window.addEventListener |
| HTML validation | ✅ | required, minlength, maxlength |
| DOM event validation | ✅ | validateForm() function |
| Git commits | ✅ | Frequent commits |
| README | ✅ | This file |

## 🚀 How to Run

1. Clone the repository
```bash
git clone [your-repo-url]
```

2. Open `index.html` in your browser

3. Start managing your tasks!

## 📂 Project Structure
```
todo-list-manager/
│
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Styling
├── js/
│   └── app.js          # JavaScript logic
└── README.md           # Documentation
```

## 💡 Key Learning Outcomes

- Mastered DOM manipulation techniques
- Implemented event-driven architecture
- Created reusable template-based components
- Handled form validation client-side
- Utilized browser storage for data persistence
- Applied modern CSS techniques for UX

## 🎨 Future Enhancements

- Search functionality
- Drag-and-drop task reordering
- Categories/tags for tasks
- Export tasks to JSON/CSV
- Dark mode toggle
- Task statistics dashboard

## 👤 Author

Noemi Delgadillo roldan
SBA 316: The Document Object Model  
02/03/2026

---
