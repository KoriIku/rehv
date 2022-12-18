import React, { Suspense, useEffect } from 'react';

import cheerio from 'cheerio';
import { IndexListItemPorps } from './interface/gallery';

export function parseGallaryList(html: string) {
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

        item.uploader = $elem.find('.gl4c div:first-child').text();

        // 获取第三列第一个 <a> 标签的 href 属性
        const href = $elem.find('.gl3c a').first().attr('href')!;

        // 使用正则表达式从 href 中解析出 gid 和 gtoken 的值
        const matches = href.match(/g\/(\d+)\/([\w-]+)/);
        if (matches) {
            item.gid = matches[1];
            item.gtoken = matches[2];
        }
        items.push(item);
    });

    return items;
}

export function parseGallaryDetail(html: string) {
    const $ = cheerio.load(html);

    //获取预览页数
    const aElement = $('body div.gtb:first tr td:nth-last-of-type(2) a');
    console.log(aElement.attr("href"));
    console.log(aElement.text() + 'p preview');

    //获取画廊页数
    const element = $('#gdd > table > tbody > tr:nth-child(6) > td.gdt2');
    const text: string = element.text()!;
    const pages = parseInt(text!.match(/\d+/)![0], 10);
    console.log(pages+' pages');

    //获取每次预览的图片数
    const previewPrePage = $('#gdt > div.gdtm').length;
    console.log(previewPrePage+' pages pre preview');
}
