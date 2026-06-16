export const getAuthorizedLinks = (role) => {
    const baseLinks = [
        { name: "About", path: "/about" },
        { name: "Setting", path: "/setting" },
        { name: "Logout", path: "/auth/logout" }
    ];

    // Normalize the role input to lowercase to avoid case-sensitivity bugs
    const normalizedRole = role ? role.toLowerCase() : 'student';

    switch (normalizedRole) {
        case "administrator": // Matches "Administrator" from DB
            return [...baseLinks, { name: "Edit Account", path: "/edit_account" }];
        case "staff":         // Matches "Staff" from DB
            return [...baseLinks, { name: "Manage Orders", path: "/manage_orders" }];
        case "student":       // Matches "Student" from DB
            return [
                { name: "Menu", path: "/menu" },
                { name: "My Orders", path: "/my_orders" },
                ...baseLinks
            ];
        default:
            return baseLinks;
    }
};