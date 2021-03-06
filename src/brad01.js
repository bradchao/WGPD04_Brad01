var Brad01Layer = cc.Layer.extend({
    nums: new Array(10),
    rects: new Array(10),
    backRect: null,
    enterRect: null,
    back: null,
    enter: null,
    input:null,
    inputString: '',
    mesg: null,
    answer : null,
    winner: null,
    loser: null,
    counter:0,
    dx: 4,
    ctor:function () {
        this._super();
        var w = cc.winSize.width;
        var h = cc.winSize.height;
        cc.log(w + " x " + h);

        var title = new cc.LabelTTF("GuessNumber Game", "Arial", 38);
        title.x = cc.winSize.width / 2;
        title.y = cc.winSize.height * 7 / 8;
        title.setColor(cc.color(255,255,0));
        this.addChild(title, 5, "mytitle");

        this.initSprite();

        this.answer = createAnswer();

        this.myMouseListener(this);

        this.scheduleUpdate();

        return true;
    },


    update: function() {
        //cc.log(this.temp++);
        var mytitle = this.getChildByName("mytitle");
        if (mytitle.x + mytitle.width/2 >= cc.winSize.width ||
            mytitle.x - mytitle.width/2 <= 0){
            this.dx *= -1;
        }
        mytitle.x += this.dx;


    },

    myMouseListener:function(layer){
        if ('mouse' in cc.sys.capabilities){
            var mouseListener = {
                event: cc.EventListener.MOUSE,
                onMouseDown: function (e) {
                    var ex = e.getLocationX();
                    var ey = e.getLocationY();

                    var point = new cc.Point(ex,ey);

                    if (layer.inputString.length>0){
                        // back
                        if (cc.rectContainsPoint(layer.backRect, point)){
                            layer.inputString =
                                layer.inputString.substr(0, layer.inputString.length-1);
                            layer.input.setString(layer.inputString);
                            layer.input.setColor(cc.color(255,255,255));
                            return;
                        }
                    }

                    if (layer.inputString.length == 3){
                        // enter
                        if (cc.rectContainsPoint(layer.enterRect, point)){
                            var result = checkAB(layer.answer, layer.inputString);
                            layer.mesg.setString(result);
                            layer.counter++;

                            if (result == '3A0B'){
                                // winner
                                layer.winner.setVisible(true);
                            }else if (layer.counter == 10){
                                // loser
                                layer.loser.setVisible(true);
                            }

                            layer.inputString = '';
                            layer.input.setColor(cc.color(255,255,255));

                            return;
                        }
                    }else{
                        // Number
                        for (i=0; i<layer.rects.length; i++){
                            if (cc.rectContainsPoint(layer.rects[i], point) &&
                                layer.inputString.indexOf(''+i) == -1){
                                cc.log(i);
                                layer.inputString += i;
                                layer.input.setString(layer.inputString);
                                break;
                            }
                        }

                        if (layer.inputString.length == 3){
                            layer.input.setColor(cc.color(255,255,0));
                        }

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

            this.rects[i] = new cc.Rect(
                this.nums[i].x - this.nums[i].width/2,
                this.nums[i].y - this.nums[i].height/2,
                this.nums[i].width,
                this.nums[i].height
            );



            this.addChild(this.nums[i], 0);
        }

        this.back = new cc.Sprite(res.back_png);
        this.back.x = cc.winSize.width *3 /6;
        this.back.y = cc.winSize.height *1 /7;
        this.backRect = new cc.Rect(
            this.back.x - this.back.width/2,
            this.back.y - this.back.height/2,
            this.back.width,
            this.back.height
        );
        this.addChild(this.back, 0);

        this.enter = new cc.Sprite(res.enter_png);
        this.enter.x = cc.winSize.width *4 /6;
        this.enter.y = cc.winSize.height *1 /8;
        this.enterRect = new cc.Rect(
            this.enter.x - this.enter.width/2,
            this.enter.y - this.enter.height/2,
            this.enter.width,
            this.enter.height
        );
        this.addChild(this.enter, 0);


        this.input = new cc.LabelTTF(this.inputString, "Arial", 30);
        this.input.x = cc.winSize.width / 2;
        this.input.y = cc.winSize.height * 6 / 8;
        this.input.setColor(cc.color(255,255,255));
        this.addChild(this.input, 5);

        this.mesg = new cc.LabelTTF("", "Arial", 24);
        this.mesg.x = cc.winSize.width / 2;
        this.mesg.y = cc.winSize.height * 5 / 8;
        this.mesg.setColor(cc.color(0,255,0));
        this.addChild(this.mesg, 5);

        this.winner = new cc.Sprite(res.winner_png);
        this.winner.attr({
            x : cc.winSize.width /2,
            y : cc.winSize.height /2
        });
        this.addChild(this.winner);
        this.winner.setVisible(false);

        this.loser = new cc.Sprite(res.loser_png);
        this.loser.attr({
            x : cc.winSize.width /2,
            y : cc.winSize.height /2
        });
        this.addChild(this.loser);
        this.loser.setVisible(false);


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

function checkAB(ans, guess) {
    var a = 0, b = 0;
    for (i=0; i<ans.length; i++){
        if (guess.charAt(i) == ans.charAt(i)){
            a++;
        }else if (ans.indexOf(guess.charAt(i)) != -1){
            b++;
        }
    }
    return a + "A" + b + "B";
}
