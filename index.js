#!/usr/bin/env node

const fs = require('fs/promises')
const open = require('open')
const prompts = require('prompts')

const techBlogSearch = async () => {
    const response = (
        await prompts({
            type: 'multiselect',
            name: 'value',
            message: 'Choose the language you want.',
            choices: [
                { title: 'English', value: 'en' },
                { title: 'Korean', value: 'kr' },
            ],
            hint: '- Space to select. Return to submit',
        })
    ).value

    const db = await fs.readFile('./db.json', 'utf8')
    const data = JSON.parse(db)
    const toSearch = []
    for (const datum in data) {
        if (response.includes(data[datum].lang)) {
            toSearch.push(data[datum].url)
        }
    }
    console.log('toSearch', toSearch)

    // Maximum query is 2048
    const searchWork
    const query = 'react site:d2.naver.com OR site:blogs.dropbox.com/tech/'
    // open(encodeURI(`https://www.google.com/search?q=${query}`))
}

;(async () => await techBlogSearch())()
