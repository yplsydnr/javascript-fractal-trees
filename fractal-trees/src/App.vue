<template>
  <div class="tree">
    <canvas class = "canvas" id="tree-canvas"></canvas>
    <button id="generate-tree-button" @click="newTree()">new tree</button>
  </div>
</template>
<script>
export default {
    name: 'Tree',
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
        newTree() {
            this.$router.go(0);
        },
        randomRGB() {
            let o = Math.round, r = Math.random, s = 255;
            return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
        },
        //A is alpha, or opacity from 0 to 1
        randomRGBA() {
            let o = Math.round, r = Math.random, s = 255;
            return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
        },
        drawTree(ctx, startX, startY, len, angle, branchWidth, lenDiff, widDiff, lenMin) {
            ctx.beginPath();
            ctx.save();
            ctx.lineWidth = (Math.random()+.35) * branchWidth;
            //move origin of canvas element to the startX and startY arguments, then rotate it by quasi-angle
            ctx.translate(startX, startY);
            ctx.rotate(angle * Math.PI/(Math.random()*20+55));
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -len - (Math.random()*10-2));
            ctx.stroke();

            /*------- adds wavy curves to branch segments, somewhat interesting, but it takes too long to load.--------
            if (angle>0){ ctx.bezierCurveTo(10, -len/2, 10, -len/2, 0, -len); } 
            else{ ctx.bezierCurveTo(10, -len/2, -10, -len/2, 0, -len); } */
            /* -----randomised wavy curves--------
            if (angle>0){ ctx.bezierCurveTo(10, -len/(Math.random()*2+1), 10, -len/(Math.random()*2+1), 0, -len); } 
            else { ctx.bezierCurveTo(10, -len/(Math.random()*2+1), -10, -len/(Math.random()*2+1), 0, -len); } */
            
            //leaf drawing executes once branch length in pixels is small enough, and returns, ending the drawTree function
            if (len <= lenMin) {
                ctx.beginPath();
                ctx.arc(0, -len, Math.random()*6+1, 0, Math.PI/(Math.random()*3+1));
                ctx.fill();
                ctx.restore();
                return;
            }

            //these functions draw the two branches that offshoot the current branch
            this.drawTree(ctx, 0, -len-(Math.random()*4+2), len*lenDiff, angle+(Math.random()*16-6), branchWidth * widDiff, lenDiff, widDiff, lenMin);
            this.drawTree(ctx, 0, -len-(Math.random()*4+2), len*lenDiff, angle-(Math.random()*16-6), branchWidth * widDiff, lenDiff, widDiff, lenMin);
            ctx.restore();
        },
    },
    mounted() {
        const canvas = document.getElementById('tree-canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
        ctx.shadowBlur = Math.random()*5;
        ctx.shadowColor = this.randomRGB();
        ctx.strokeStyle = this.randomRGB();
        ctx.fillStyle = this.randomRGBA();
        this.drawTree(
            ctx, //context
            canvas.width/2, //start X
            canvas.height/1.2, //start Y
            canvas.height/7, //branch length
            Math.random()*2-1, //angle
            Math.random()*15+6, //branch width
            .82-Math.random()/10, //amount the branch length is reduced per iteration
            .78-Math.random()/10, //amount the branch width is reduced per iteration
            Math.round(Math.random()*8+4), //branch length, in pixels, at which leaves begin rendering
        );
    }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f3efec;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: beige;
}
#tree-canvas {
    position: relative;
    background: beige;
    height: 100%;
}
#generate-tree-button {
    position: absolute;
    left: 0;
    top: 93%;
    z-index: 10;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 8px 8px;
    border-radius: 30px;
    background: grey;
    border-color: darkred;
    color: black;
    font-size: 15px;
    overflow: hidden;
}
</style>
