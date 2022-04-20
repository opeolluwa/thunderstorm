const prompt = require('multiselect-prompt')
 
const colors = [
    {title: 'red',    value: '#f00'},
    {title: 'yellow', value: '#ff0'},
    {title: 'green',  value: '#0f0'},
    {title: 'blue',   value: '#00f', selected: true},
    {title: 'black',  value: '#000'},
    {title: 'white',  value: '#fff'}
]
 
const selected = (items) => items
    .filter((item) => item.selected)
    .map((item) => item.value)
 
// All these options are optional
const opts = {
    cursor: 1,     // Initial position of the cursor, defaults to 0 (first entry)
    maxChoices: 3, // Maximum number of selectable options (defaults to Infinity)
    // The message to display as hint if enabled, below is the default value
    hint: '– Space to select. Return to submit.'
}

prompt('Which colors do you like?', colors, opts)
.on('data', (data) => console.log('Changed to', selected(data.value)))
.on('abort', (items) => console.log('Aborted with', selected(items)))
.on('submit', (items) => console.log('Submitted with', selected(items)))