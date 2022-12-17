import React, { Suspense, useEffect } from 'react';

import cheerio from 'cheerio';
import { IndexListItemPorps } from './interface/gallery';

function parseTable(html: string) {
    const $ = cheerio.load(html);
    const items: IndexListItemPorps[] = [];
    
    $('tbody tr:first-child').remove();

    $('tr').each((i: number, elem: any) => {
        const $elem = $(elem);
        const item = {} as IndexListItemPorps;

        item.category = $elem.find('.gl1c.glcat div').text();

        var imgElement = $elem.find('.gl2c img');
        var src = (imgElement.attr('data-src') || imgElement.attr('src')) as string;
        item.thumb = src;
        
        item.title = $elem.find('.gl3c.glname .glink').text();
        const irElement = $elem.find('.gl2c .ir');
        if (irElement.length) {
            item.rating = parseInt(irElement.css('background-position').split(' ')[1], 10);
        }

        item.uploadtime = $elem.find('.gl2c div:nth-child(3) div:first-child').text();
        ;
        item.uploader = $elem.find('.gl4c div:first-child').text();

        items.push(item);
    });

    return items;
}

export default parseTable;