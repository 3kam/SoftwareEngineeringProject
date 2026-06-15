// orders/roleManager.js

const ROLE_NAVIGATION = {
    Student: [
        { label: "View Menu Grid", path: "menu.html" },
        { label: "My Active Orders", path: "myorders.html" }
    ],
    Staff: [
        { label: "Kitchen Dashboard", path: "manage_items.html" }
    ],
    Admin: [
        { label: "Administrator Dashboard", path: "edit_account.html" }
    ],
    Universal: [
        { label: "About", path: "about.html" },
        { label: "Settings", path: "setting.html" }
    ]
};

/**
 * Generates the clean array of navigation links based on user role
 * @param {string} role - Student, Staff, or Admin
 */
function getNavigationForRole(role) {
    const specificLinks = ROLE_NAVIGATION[role] || [];
    const universalLinks = ROLE_NAVIGATION.Universal;
    return [...specificLinks, ...universalLinks];
}

module.exports = { getNavigationForRole };