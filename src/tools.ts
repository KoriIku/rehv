import React, { Suspense, useEffect } from 'react';

import cheerio from 'cheerio';

function parseTable(html: string) {
    const $ = cheerio.load(html);
    const items: {
        category: string;
        cover: string;
        title: string;
        rating?: number;
        time: string;
        author: string;
    }[] = [];

    $('tr').each((i: number, elem: any) => {
        const $elem = $(elem);
        const item: {
            category: string;
            cover: string;
            title: string;
            rating?: number;
            time: string;
            author: string;
        } = {
            category: '',
            cover: '',
            title: '',
            time: '',
            author: ''
        };

        item.category = $elem.find('.gl1c.glcat div').text();

        var imgElement = $elem.find('.gl2c img');
        var src = (imgElement.attr('data-src') || imgElement.attr('src')) as string;
        item.cover = src;
        
        item.title = $elem.find('.gl3c.glname .glink').text();
        const irElement = $elem.find('.gl2c .ir');
        if (irElement.length) {
            item.rating = parseInt(irElement.css('background-position').split(' ')[1], 10);
        }

        item.time = $elem.find('.gl2c div[onClick]').text();
        item.author = $elem.find('.gl3c:last-child div:first-child').text();

        items.push(item);
    });

    return items;
}

export default parseTable;