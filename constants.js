const defaultData = {
    'weaponsmithing': 0,
    'armoring': 0,
    'engineering': 0,
    'jewelcrafting': 0,
    'arcana': 0,
    'cooking': 0,
    'furnishing': 0,
    'smelting': 0,
    'woodworking': 0,
    'leatherworking': 0,
    'weaving': 0,
    'stonecutting': 0
};

module.exports = {
    skills: Object.keys(defaultData).map(key => key),
    defaultData
};
