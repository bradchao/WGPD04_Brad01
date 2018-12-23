var Brad01Layer = cc.Layer.extend({
    nums: new Array(10),
    back: null,
    enter: null,
    input:null,
    mesg: null,
    answer : null,
    ctor:function () {
        this._super();
        var w = cc.winSize.width;
        var h = cc.winSize.height;
        cc.log(w + " x " + h);

        var title = new cc.LabelTTF("GuessNumber Game", "Arial", 38);
        title.x = cc.winSize.width / 2;
        title.y = cc.winSize.height * 7 / 8;
        title.setColor(cc.color(255,255,0));
        this.addChild(title, 5);

        this.initSprite();

        this.answer = createAnswer();

        this.myMouseListener();

        return true;
    },

    myMouseListener:function(){
        if ('mouse' in cc.sys.capabilities){
            var mouseListener = {
                event: cc.EventListener.MOUSE,
                onMouseDown: function (e) {
                    var ex = e.getLocationX();
                    var ey = e.getLocationY();

                    var point = new cc.Point(ex,ey);
                    var rect = new cc.Rect(2,3,4,5);
                    if (cc.rectContainsPoint(rect,point)){
                        cc.log("hit");
                    }

                },

            };
            cc.eventManager.addListener(mouseListener,this);
        }
    },


    initSprite: function () {
        cc.spriteFrameCache.addSpriteFrames(res.number_plist, res.number_png);

        for ( i = 0; i< this.nums.length; i++){
            this.nums[i] = new cc.Sprite("#number"+ i + ".png");

            var px, py;

            if (i == 0){
                px = 2;
                py = 1;
            }else{
                px = (i - 1) % 3 + 2;
                py = parseInt((i - 1) / 3) + 2
            }

            this.nums[i].x = cc.winSize.width * px /6;
            this.nums[i].y = cc.winSize.height * py /8;

            this.addChild(this.nums[i], 0);
        }

        this.back = new cc.Sprite(res.back_png);
        this.back.x = cc.winSize.width *3 /6;
        this.back.y = cc.winSize.height *1 /7;
        this.addChild(this.back, 0);

        this.enter = new cc.Sprite(res.enter_png);
        this.enter.x = cc.winSize.width *4 /6;
        this.enter.y = cc.winSize.height *1 /8;
        this.addChild(this.enter, 0);


        this.input = new cc.LabelTTF("", "Arial", 30);
        this.input.x = cc.winSize.width / 2;
        this.input.y = cc.winSize.height * 6 / 8;
        this.input.setColor(cc.color(255,255,255));
        this.addChild(this.input, 5);

        this.mesg = new cc.LabelTTF("", "Arial", 24);
        this.mesg.x = cc.winSize.width / 2;
        this.mesg.y = cc.winSize.height * 5 / 8;
        this.mesg.setColor(cc.color(0,255,0));
        this.addChild(this.mesg, 5);


    },

});

var Brad01Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Brad01Layer();
        this.addChild(layer);
    }
});

function createAnswer() {
    var poker = [0,1,2,3,4,5,6,7,8,9];
    poker = shuffle(poker);
    return '' + poker[0]+poker[1]+poker[2];
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}