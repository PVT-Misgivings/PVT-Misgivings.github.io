import{p as e}from"./phaser-C2_wa_Fb.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const i of e)if("childList"===i.type)for(const e of i.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();class t extends e.Scene{constructor(){super("Boot")}preload(){this.load.image("background","assets/bg.png")}create(){this.scene.start("Preloader")}}let i,o,l,s,r=0,n=1;class a extends e.Scene{constructor(){super("Game")}create(){const e=this.add.container(0,0),t=this.add.rectangle(400,30,800,60,0).setOrigin(.5);e.add(t),e.sendToBack(t),this.cameras.main.setBackgroundColor(6278628),o=this.make.tilemap({tileWidth:200,tileHeight:200,width:200,height:200});const a=[];["grassTile","treeTile","desertTile","oasisTile"].forEach((e=>a.push(o.addTilesetImage(e,void 0,void 0,void 0,void 0,void 0,a.length)))),["house1Blue","house1Pink"].forEach((e=>a.push(o.addTilesetImage(e,void 0,100,100,void 0,void 0,a.length,{x:-50,y:-50}))));let d=o.createBlankLayer("ground",a);o.putTileAt(0,100,100),o.createBlankLayer("building",a),s=o.createBlankLayer("temp",a),s.setAlpha(.75),o.setLayer(d);const c=this.cameras.main;let h,g,u=o.tileToWorldXY(100,100);c.centerOn(u.x+100,u.y+100),c.zoom=.5;let p=!1;this.input.on("pointerdown",(()=>{h=c.scrollX,g=c.scrollY,p=!0})),this.input.on("pointermove",(e=>{p=!1,e.isDown&&(c.scrollX=h+(e.downX-e.x)/c.zoom,c.scrollY=g+(e.downY-e.y)/c.zoom)})),this.input.on("wheel",((e,t,i,o,l)=>{const s=c.getWorldPoint(e.x,e.y),r=c.zoom-.001*c.zoom*o;c.zoom=Phaser.Math.Clamp(r,.1,3),c.preRender();const n=c.getWorldPoint(e.x,e.y);c.scrollX-=n.x-s.x,c.scrollY-=n.y-s.y})),this.input.on("pointerup",(()=>{if(p){const e=this.input.activePointer,t=o.getTileAtWorldXY(e.worldX,e.worldY,!0),i=o.getTileAtWorldXY(e.worldX,e.worldY,!0,void 0,"building");if(!t)return;const s=[[1,0],[-1,0],[0,1],[0,-1]].map((([e,i])=>o.getTileAt(t.x+e,t.y+i,!0))).filter((e=>e&&-1!==e.index)).length>0;r<4&&-1===t.index&&s?(o.putTileAt(r,t.x,t.y),n++):void 0===r||-1!==i.index||0!==t.index&&2!==t.index?0===l&&-1!==t.index&&n>1&&(o.removeTileAt(t.x,t.y,!1),console.log(o.getTileAt(t.x,t.y)),o.removeTileAt(t.x,t.y,!1,void 0,"building"),n--):o.putTileAt(r,t.x,t.y,void 0,"building"),console.log(n)}})),i=this.add.graphics()}update(){const e=this.input.activePointer,t=o.worldToTileXY(e.worldX,e.worldY),s=o.getTileAtWorldXY(e.worldX,e.worldY,!0),a=o.getTileAtWorldXY(e.worldX,e.worldY,!0,void 0,"building");if(!s)return;const d=[[1,0],[-1,0],[0,1],[0,-1]].map((([e,t])=>o.getTileAt(s.x+e,s.y+t,!0))).filter((e=>e&&-1!==e.index)).length>0;i.clear(),i.lineStyle(1,16777215,1),i.strokeRect(0,0,200*o.tileWidth,200*o.tileHeight),o.fill(-1,0,0,200,200,void 0,"temp"),r<4?-1===s.index&&d&&(i.lineStyle(5,16777215,.5),i.strokeRect(t.x*o.tileWidth,t.y*o.tileHeight,o.tileWidth,o.tileHeight),o.putTileAt(r,t.x,t.y,void 0,"temp")):void 0===r||-1!==a.index||0!==s.index&&2!==s.index?0===l&&-1!==s.index&&n>1&&(i.lineStyle(5,16711680,.5),i.strokeRect(t.x*o.tileWidth,t.y*o.tileHeight,o.tileWidth,o.tileHeight)):(i.lineStyle(5,16777215,.5),i.strokeRect(t.x*o.tileWidth+o.tileWidth/4,t.y*o.tileHeight+o.tileHeight/4,o.tileWidth/2,o.tileHeight/2),o.putTileAt(r,t.x,t.y,void 0,"temp"))}}class d extends e.Scene{constructor(){super("GameOver")}create(){this.cameras.main.setBackgroundColor(16711680),this.add.image(512,384,"background").setAlpha(.5),this.add.text(512,384,"Game Over",{fontFamily:"Arial Black",fontSize:64,color:"#ffffff",stroke:"#000000",strokeThickness:8,align:"center"}).setOrigin(.5),this.input.once("pointerdown",(()=>{this.scene.start("MainMenu")}))}}class c extends e.Scene{constructor(){super("MainMenu")}create(){this.add.image(512,384,"background"),this.add.image(512,300,"logo"),this.add.text(512,460,"Main Menu",{fontFamily:"Arial Black",fontSize:38,color:"#ffffff",stroke:"#000000",strokeThickness:8,align:"center"}).setOrigin(.5),this.input.once("pointerdown",(()=>{this.scene.start("Game")}))}}class h extends e.Scene{constructor(){super("Preloader")}init(){this.add.image(512,384,"background"),this.add.rectangle(512,384,468,32).setStrokeStyle(1,16777215);const e=this.add.rectangle(282,384,4,28,16777215);this.load.on("progress",(t=>{e.width=4+460*t}))}preload(){this.load.setPath("assets"),this.load.image("logo","logo.png"),this.load.image("grassTile","tiles/Grass tile.png"),this.load.image("desertTile","tiles/Desert tile.png"),this.load.image("oasisTile","tiles/Oasis tile.png"),this.load.image("treeTile","tiles/Tree tile.png"),this.load.image("house1Pink","buildings/House1 pink.png"),this.load.image("house1Blue","buildings/House1 blue.png")}create(){this.scene.start("MainMenu")}}const g={type:Phaser.AUTO,width:1024,height:768,parent:"game-container",backgroundColor:"#028af8",scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:[t,h,c,a,d]};window.switchTile=(e,t)=>{document.querySelectorAll(".tileSelector").forEach((e=>e.classList.remove("selected"))),e.target.classList.add("selected"),function(e){r=e,l=void 0}(t)},window.switchTool=(e,t)=>{document.querySelectorAll(".tileSelector").forEach((e=>e.classList.remove("selected"))),e.target.classList.add("selected"),function(e){r=void 0,l=e}(t)},new Phaser.Game(g);