import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyDataService } from '../services/my-data.service';

declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

    color_list  : any = [];
    color_name  : any;
    hex_code    : any;
    color_code  : any;
    isVersion1  : boolean = false;
    isVersion2  : boolean = false;

    constructor(private dataService: MyDataService) {}

    ngOnInit(): void {
        this.dataService.getData().subscribe(
            (data: any) => {
                if (Array.isArray(data) && data.length === 0) return;
    
                if (data.success) {
                    data.colors.sort(function(a: any, b: any) {
                        return a.order - b.order;
                    });

                    this.color_list = data.colors;
                    this.isVersion1 = true;
                }
            }
        );
    }

    onSetVersion(version: any) {
        this.color_name = '';
        this.hex_code = '';
        this.color_code = '';

        this.isVersion1 = false;
        this.isVersion2 = false;
        
        if (version == '1') {
            this.isVersion1 = true;
            this.isVersion2 = false;
        }   else {
            this.isVersion1 = false;
            this.isVersion2 = true;
        }
    }

    onPreviewColor(data: any) {
        this.color_name = data.name;
        this.hex_code = data.hex_code;
        this.color_code = data.color_code;

        $(".color-preview-box").css('background-color', "#"+this.hex_code);
        $(".color-preview-box").css('border-color', "#"+this.hex_code);

        var text_color = 'black';
        if (!this.wc_hex_is_light(data.hex_code)) {
            text_color = 'white';
        }

        $(".color-preview-box").css('color', text_color);
    }

    wc_hex_is_light(color: any) {
        const hex = color.replace('#', '');
        const c_r = parseInt(hex.substr(0, 2), 16);
        const c_g = parseInt(hex.substr(2, 2), 16);
        const c_b = parseInt(hex.substr(4, 2), 16);
        const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
        return brightness > 155;
    }

    ngOnDestroy(): void {
    }
}
