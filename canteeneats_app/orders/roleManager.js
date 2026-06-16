// orders/roleManager.js

export const getAuthorizedLinks = (role) => {
    const baseLinks = [
        { name: "About", path: "/about" },
        { name: "Setting", path: "/setting" },
        { name: "Logout", path: "/auth/logout" }
    ];

    switch (role) {
        case "admin":
            return [...baseLinks, { name: "Edit Account", path: "/edit_account" }];
        case "canteenstaff":
            return [...baseLinks, { name: "Manage Orders", path: "/manage_orders" }];
        case "student":
            return [
                { name: "Menu", path: "/menu" },
                { name: "My Orders", path: "/my_orders" },
                ...baseLinks
            ];
        default:
            return baseLinks;
    }
};