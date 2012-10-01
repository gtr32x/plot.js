(function () {
    var $, Plotter;

    $ = jQuery;

    Plotter = (function() {
        function Plotter(opts) {
            if (!(this instanceof Plotter)) return new Plotter(opts);
            this.opts = opts;
            this.zoom = 1;
            this.draw();
        }

        Plotter.prototype.draw = function() {
            var canvas = this.drawCanvas();
            var h = this.opts['height'];
            var w = this.opts['width'];
            // number of pixels between each grid line (both horizontal and vertical)
            var gridSpacing = Math.round(h / (20 / this.zoom));
            // number of horizontal blocks
            var hdivs = Math.floor(w / gridSpacing);
            // number of vertical blocks
            var vdivs = Math.floor(h / gridSpacing);
            var i, y;

            ctx = canvas.getContext('2d');
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.rect(0, 0, w, h);
            ctx.stroke();

            // grid lines

            ctx.strokeStyle = '#eee';
            ctx.lineWidth = 1;
            ctx.beginPath();

            var horizontal_offset = Math.floor((w - Math.floor(w / gridSpacing) * gridSpacing) / 2);
            var vertical_offset = Math.floor((h - Math.floor(h / gridSpacing) * gridSpacing) / 2);

            // horizontal lines
            i = 0;
            while (gridSpacing * i < h) {
                if (gridSpacing * i + 0.5 + vertical_offset != 0.5) {
                    ctx.moveTo(2.5, gridSpacing * i + 0.5 + vertical_offset);
                    ctx.lineTo(w - 1.5, gridSpacing * i + 0.5 + vertical_offset);
                }
                i++;
            }

            // vertical lines
            i = 0;
            while (gridSpacing * i < w) {
                if (gridSpacing * i + 0.5 + horizontal_offset != 0.5) {
                    ctx.moveTo(gridSpacing * i + 0.5 + horizontal_offset, 2.5);
                    ctx.lineTo(gridSpacing * i + 0.5 + horizontal_offset, h - 1.5);
                }
                i++;
            }
            ctx.stroke();

            // origin lines

            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.moveTo(1.5, gridSpacing * Math.round(vdivs / 2) + 0.5 + vertical_offset);
            ctx.lineTo(w - 0.5, gridSpacing * Math.round(vdivs / 2) + 0.5 + vertical_offset);

            ctx.moveTo(gridSpacing * Math.round(hdivs / 2) + 0.5 + horizontal_offset, 1.5);
            ctx.lineTo(gridSpacing * Math.round(hdivs / 2) + 0.5 + horizontal_offset, h - 0.5);
            ctx.stroke();

            var originx = gridSpacing * Math.round(hdivs / 2) + horizontal_offset;
            var originy = gridSpacing * Math.round(vdivs / 2) + vertical_offset;

            // graph
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            for (i = 0; i < w; i++) {
                x = (i - originx) / gridSpacing;
                y = Math.round(this.func(x) * gridSpacing);
                if (i == 0) {
                    ctx.moveTo(i, originy - y);
                } else {
                    ctx.lineTo(i, originy - y);
                }
            }
            ctx.stroke();
        };

        Plotter.prototype.drawCanvas = function() {
            var el = $('#' + this.opts['eid']);
            el.append('<canvas></canvas>');
            var canvas = el.find('canvas');
            canvas.attr('width', this.opts['width']);
            canvas.attr('height', this.opts['height']);
            return canvas[0];
        };

        Plotter.prototype.func = function(x) {
            return Math.exp(x);
        };

        return Plotter;
    })();

    window.Plotter = Plotter;
})();