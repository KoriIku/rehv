import React, { Suspense, useEffect } from 'react';

import cheerio from 'cheerio';
import { IndexListItemPorps, normalPreview } from '../interface/gallery';

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
        const href = $elem.find('.gl3c a').first().attr('href');

        if (href !== undefined) {
            // 使用正则表达式从 href 中解析出 gid 和 gtoken 的值
            const matches = href!.match(/g\/(\d+)\/([\w-]+)/);
            if (matches) {
                item.gid = matches[1];
                item.gtoken = matches[2];
            }
        }

        items.push(item);
    });

    return items;
}

// 定义正则表达式
const PATTERN_NORMAL_PREVIEW = /<div[^<>]*width:(\d+)[^<>]*height:(\d+)[^<>]*\((.+?)\)[^<>]*-(\d+)px[^<>]*><a[^<>]*href="(.+?)"[^<>]*><img alt="([\d,]+)"/;

export function parseGallaryDetail(html: string) {
    const $ = cheerio.load(html);

    //获取预览页数
    const aElement = $('body div.gtb:first tr td:nth-last-of-type(2) a');
    console.log(aElement.text() + 'p preview');

    //获取画廊页数
    const element = $('#gdd > table > tbody > tr:nth-child(6) > td.gdt2');
    const text: string = element.text()!;
    const pages = parseInt(text!.match(/\d+/)![0], 10);
    console.log(pages + ' pages');

    //获取每次预览的图片数
    const previewPrePage = $('#gdt > div.gdtm').length;
    console.log(previewPrePage + ' pages pre preview');

    // 获取预览图片
    const elements: normalPreview[] = [];

    $('#gdt > .gdtm').each((i, element) => {
        const link = $(element).find('a').attr('href')!.trim()

        var matchlink = link.match(/\/s\/([^/]+)\/([^-]+)-([^-]+)/)!;
        const pToken = matchlink[1];// ff8aad84c6
        const galleryNo = matchlink[2];// 2433508
        const pageNo = matchlink[3];// 17

        // 获取元素的HTML代码
        const elementHtml = $(element).html()!;

        // 匹配正则表达式
        const match = elementHtml.match(PATTERN_NORMAL_PREVIEW)!;

        // 如果匹配成功，则提取信息

        const position = parseInt(match[6], 10) - 1;
        const imageUrl = match[3].trim();
        const xOffset = parseInt(match[4], 10);
        const yOffset = 0;
        const width = parseInt(match[1], 10);
        const height = parseInt(match[2], 10);

        elements.push({ link, pToken, galleryNo, pageNo, imageUrl, xOffset, yOffset, width, height, position });
    });
    return elements;
}

function getComicInWhichPreviewPage(comicPage: number, previewPrePage: number): [number, number] {
    const page = comicPage / previewPrePage;
    const no = comicPage % previewPrePage;
    return [page, no];
}