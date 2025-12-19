
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CKBox } from '@ckeditor/ckeditor5-ckbox';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Heading } from '@ckeditor/ckeditor5-heading';
// import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';

import {
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    PictureEditing,
    ImageResize

} from '@ckeditor/ckeditor5-image';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import {Highlight} from '@ckeditor/ckeditor5-highlight'
import { List } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { FontFamily, FontSize, FontColor } from '@ckeditor/ckeditor5-font';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';


import {
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
} from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { Undo } from '@ckeditor/ckeditor5-undo';
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends ClassicEditor {
    public static override builtinPlugins = [
        Autoformat,
        BlockQuote,
        Base64UploadAdapter,
        Bold,
        CKBox,
        CloudServices,
        Essentials,
        Heading,
        Image,
        ImageCaption,
        ImageStyle,
        ImageToolbar,
        ImageUpload,
        ImageResize,
        Indent,
        Italic,
        Link,
        List,
        MediaEmbed,
        Paragraph,
        PasteFromOffice,
        PictureEditing,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextTransformation,
        Undo,
        Highlight,
        FontFamily,
        FontSize,
        FontColor,
        HorizontalLine,
        HtmlEmbed,
        // SourceEditing
    ];

    public static override defaultConfig: EditorConfig = {
 
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'imageUpload',
                'htmlEmbed',
                // 'sourceEditing'
                'blockQuote',
                'undo',
                'redo',
                'highlight',
                'fontFamily',
            'fontSize', 
            'fontColor',
            'horizontalLine',
            '|',
            'insertTable', // اضافه کردن دکمه جدول
            'tableColumn', // اضافه کردن دکمه تنظیمات ستون
            'tableRow', // اضافه کردن دکمه تنظیمات ردیف
            'mergeTableCells', // اضافه کردن دکمه ادغام سلول‌ها
            'tableCellProperties', // اضافه کردن دکمه تنظیمات سلول
            'tableProperties', //
            ],

        },
        language: 'fa',
        image: {
            toolbar: [
                'imageTextAlternative',
                'toggleImageCaption',
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side'
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells',
                'tableCellProperties',
                'tableProperties'
            ]
        },
        link:{
            decorators:{
                isExternal: {
                    mode: 'manual',
                    label:'لینک خارجی'
                },
                isDownloadable: {
                    mode: 'manual',
                    label: 'قابل دانلود',
                    attributes: {
                        download: 'file.png',
                    }
                },
                nofollow: {
					mode: 'manual',
					label: 'تنظیم SEO No Follow',
					attributes: {
						rel: 'nofollow'
					}
				},
                sponsored: {
					mode: 'manual',
					label: 'تنظیم SEO Sponsored',
					attributes: {
						rel: 'sponsored'
					}
				}
                }
            
        },
        heading: {
            options: [
                { model: 'paragraph', title: 'پاراگراف', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'عنوان 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'عنوان 2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'عنوان 3', class: 'ck-heading_heading3' },
                { model: 'heading4', view: 'h4', title: 'عنوان 4', class: 'ck-heading_heading4' }, // Added h4
                { model: 'heading5', view: 'h5', title: 'عنوان 5', class: 'ck-heading_heading5' }, // Added h5
            ]
        }
       
}
}

export default Editor;
