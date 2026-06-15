// static/js/ui.js - Core Layout UI Framework Logic

// ==========================================
// 1. SERVICE WORKER REGISTRATION (PWA Support)
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('Service Worker safely registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.error('Service Worker registration encountered an error:', error);
            });
    });
}

// ==========================================
// 2. PARALLEL ROLE-BASED NAVIGATION SYSTEM
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const navBarContainer = document.getElementById('dynamic-navigation-links');
    if (!navBarContainer) return; // Safely bypasses execution if on login/register pages

    const activeRole = localStorage.getItem('userRole') || "Student"; 

    // Fire both database requests at the exact same split second to cut down load lag
    Promise.all([
        fetch(`/api/navigation?role=${activeRole}`).then(res => res.json()),
        fetch('/api/categories').then(res => res.json())
    ])
    .then(([links, categories]) => {
        navBarContainer.innerHTML = ''; // Wipe loading indicator placeholder

        // 1. Build and append authorized links for this specific role
        links.forEach(linkObj => {
            const navLink = document.createElement('a');
            navLink.href = linkObj.path;
            navLink.innerText = linkObj.label;
            
            if (window.location.pathname.includes(linkObj.path)) {
                navLink.classList.add('active');
            }
            navBarContainer.appendChild(navLink);
        });

        // 2. Build Category Header Section
        const catHeader = document.createElement('div');
        catHeader.className = 'sidenav-section-header';
        catHeader.innerText = 'Menu Categories';
        navBarContainer.appendChild(catHeader);

        // 3. Inject category selections dynamically
        categories.forEach(category => {
            const catLink = document.createElement('a');
            catLink.href = `#${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            catLink.innerText = category;
            catLink.onclick = () => filterCategory(category);
            navBarContainer.appendChild(catLink);
        });

        // 4. Append the permanent, secure Logout button
        const logoutLink = document.createElement('a');
        logoutLink.href = "/logout";
        logoutLink.innerText = "Log Out";
        logoutLink.style.color = "#d9534f"; // Soft crimson red alert highlight
        
        logoutLink.onclick = (e) => {
            localStorage.clear();
            sessionStorage.clear();
            window.location.replace("/logout"); 
        };
        navBarContainer.appendChild(logoutLink);
    })
    .catch(err => console.error('Error handling parallel data initialization:', err));
});

// ==========================================
// 3. MENU SELECTION CARD FILTER GRID
// ==========================================
function filterCategory(categoryName) {
    console.log(`Filtering items for: ${categoryName}`);
    // Your item-sorting filter logic goes right here!
}