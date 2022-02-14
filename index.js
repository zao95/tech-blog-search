#!/usr/bin/env node

const fs = require('fs/promises')
const open = require('open')
const prompts = require('prompts')
const path = require('path')

const techBlogSearch = async () => {
    const response = await prompts([
        {
            type: 'multiselect',
            name: 'languages',
            message: 'Choose the language you want.',
            choices: [
                { title: 'English', value: 'en' },
                { title: 'Korean', value: 'kr' },
            ],
            hint: '- Space to select. Return to submit',
        },
        {
            type: 'text',
            name: 'searchWord',
            message: 'What do you want to search?',
        },
    ])

    const db = await fs.readFile(path.join(__dirname + 'db.json'), 'utf8')
    const data = JSON.parse(db)
    const toSearch = []
    for (const datum in data) {
        if (response.languages.includes(data[datum].lang)) {
            toSearch.push(data[datum].url)
        }
    }

    // Maximum query is 2048
    const searchWord = response.searchWord
    const query = toSearch.slice(1).reduce((prev, curr) => {
        const nextValue = prev + ` OR site:${curr}`
        if (searchWord.length + nextValue.length + 1 >= 2048) {
            return prev
        } else {
            return nextValue
        }
    }, `site:${toSearch[0]}`)

    open(encodeURI(`https://www.google.com/search?q=${searchWord} ${query}`))
}

;(async () => await techBlogSearch())()
