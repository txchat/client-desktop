const conflictingClasses = [
    // flex must be treated separately
    'order-first',
    'order-last',
    'cursor-not-alowed',
    'cursor-pointer',
    'block',
    'inline-block',
    'text-justify',
    'hidden',
    'invisible',
    'overflow-auto',
    'overflow-hidden',
    'bg-white',
]

const removeObj = {
    ...Object.fromEntries(conflictingClasses.map((cc) => [`.${cc}`, '*'])), // Removes all properties from conflicting classes
    body: ['font-family', 'font-size'], // You can also remove things like fonts and colors.
    '.row,.column,.flex': 'flex-wrap', // for production
    '.row, .column, .flex': 'flex-wrap', // for development
}

module.exports = {
    plugins: {
        'postcss-remove-declaration': { remove: removeObj },
        tailwindcss: {},
    },
    conflictingClasses,
}
