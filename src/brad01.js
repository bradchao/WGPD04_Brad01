var Brad01Layer = cc.Layer.extend({
    sprite1:null,
    sprite2:null,
    sprite4:null,
    ctor:function () {
        this._super();
        var w = cc.winSize.width;
        var h = cc.winSize.height;
        cc.log(w + " x " + h);

        var title = new cc.LabelTTF("GuessNumber Game", "Arial", 38);
        title.x = cc.winSize.width / 2;
        title.y = cc.winSize.height * 6 / 7;
        title.setColor(cc.color(255,255,0));
        this.addChild(title, 5);

        this.initSprite();

        return true;
    },

    initSprite: function () {
        cc.spriteFrameCache.addSpriteFrames(res.number_plist, res.number_png);

        this.sprite1 = new cc.Sprite("#number1.png");
        this.sprite1.x = cc.winSize.width *2 /6;
        this.sprite1.y = cc.winSize.height *2 /7;
        this.addChild(this.sprite1, 0);

        this.sprite2 = new cc.Sprite("#number2.png");
        this.sprite2.x = cc.winSize.width *3 /6;
        this.sprite2.y = cc.winSize.height *2 /7;
        this.addChild(this.sprite2, 0);

        this.sprite4 = new cc.Sprite("#number4.png");
        this.sprite4.x = cc.winSize.width *2 /6;
        this.sprite4.y = cc.winSize.height *3 /7;
        this.addChild(this.sprite4, 0);


    },

});

var Brad01Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Brad01Layer();
        this.addChild(layer);
    }
});

