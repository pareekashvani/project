const generateUsername = (name) => {
    // Safety check
    if (!name || typeof name !== 'string') {
        return `user${Math.floor(1000 + Math.random() * 9000)}`;
    }

    // Remove spaces & special characters, lowercase
    const cleanName = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    // Random 4-digit suffix
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);

    return `${cleanName}${randomSuffix}`;
};

module.exports = generateUsername;
