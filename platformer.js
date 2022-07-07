// # Quintus platformer example
//
// [Run the example](../quintus/examples/platformer/index.html)
// WARNING: this game must be run from a non-file:// url
// as it loads a level json file.
//
// This is the example from the website homepage, it consists
// a simple, non-animated platformer with some enemies and a 
// target for the player.
window.addEventListener("load", function () {

// Set up an instance of the Quintus engine  and include
// the Sprites, Scenes, Input and 2D module. The 2D module
// includes the `TileLayer` class as well as the `2d` componet.
    var Q = window.Q = Quintus()
        .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI")
        // Maximize this game to whatever the size of the browser is
        .setup({maximize: true})
        // And turn on default input controls and touch input (for UI)
        .controls().touch()
    Q.touch(Q.SPRITE_ALL);
    Q.debug = true;

    Q.Sprite.extend("Coin", {
        init: function (p) {
            this._super(p, {sheet: 'coin'});
            this.on("touchEnd");
            this.on("hit", this, "collision");
        },
        touchEnd: function (col) {
            //校验下方和右方是否有硬币
            //下方增加一个新的
            if(this.stage.items.filter(item => (item.p.x == this.p.x && item.p.y == this.p.y + 32) || (item.p.x == this.p.x + 32 && item.p.y == this.p.y)) != 0){
                // Q.stageScene("endGame",1, { label: "右方和下方有硬币" });
                return;
            }
            this.stage.insert(new Q.Coin({x: this.p.x, y: this.p.y + 32}));
            this.stage.insert(new Q.Coin({x: this.p.x + 32, y: this.p.y}));
            this.destroy();
            //移动当前到右方一格
            // this.p.x = this.p.x + 32;
        },
        collision: function(col){
            this.destroy();
        }
    });
// ## Level1 scene
// Create a new scene called level 1
    Q.scene("level1", function (stage) {

        // Add in a repeater for a little parallax action
        stage.insert(new Q.Repeater({sheet: "tiles", speedX: 1, speedY: 1}));

        // Add in a tile layer, and make it the collision layer
        // stage.collisionLayer(new Q.GameTiles());
        stage.insert(new Q.Coin({ x: 16, y: 16 }));
        stage.insert(new Q.Coin({ x: 48, y: 16 }));
        stage.insert(new Q.Coin({ x: 16, y: 48 }));

    });
// To display a game over / game won popup box,
// create a endGame scene that takes in a `label` option
// to control the displayed message.
    Q.scene('endGame', function (stage) {
        // var container = stage.insert(new Q.UI.Container({
        //   x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
        // }));

        // var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
        //                                                 label: "Play Again" }))
        // var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
        //                                                  label: stage.options.label }));
        // When the button is clicked, clear all the stages
        // and restart the game.
        // button.on("click",function() {
        //   Q.clearStages();
        //   Q.stageScene('level1');
        // });

        // Expand the container to visibily fit it's contents
        // (with a padding of 20 pixels)
        // container.fit(20);
    });

// ## Asset Loading and Game Launch
// Q.load can be called at any time to load additional assets
// assets that are already loaded will be skipped
// The callback will be triggered when everything is loaded
    Q.load("level.json, coin_bak.jpg, tiles_b.png", function () {
        // Sprites sheets can be created manually
        Q.sheet("tiles", "tiles_b.png", {tilew: 32, tileh: 32});
        Q.sheet("coin", "coin_bak.jpg", {tilew: 32, tileh: 32});

        // Finally, call stageScene to run the game
        Q.stageScene("level1");
    });
// ## Possible Experimentations:
// 
// The are lots of things to try out here.
// 
// 1. Modify level.json to change the level around and add in some more enemies.
// 2. Add in a second level by creating a level2.json and a level2 scene that gets
//    loaded after level 1 is complete.
// 3. Add in a title screen
// 4. Add in a hud and points for jumping on enemies.
// 5. Add in a `Repeater` behind the TileLayer to create a paralax scrolling effect.

});
