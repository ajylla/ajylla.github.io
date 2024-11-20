/**
 *
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * Copyright (C) 2024  Aleksi Yli-Laurila
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

class GameBoard {

    board;

    constructor(board) {
        this.board = board;
    }

    get_board() {
        return this.board;
    }

    get_size() {
        return [this.board.length, this.board[0].length];
    }

    shift_positions(r, c) {
        let [len_r, len_c] = this.get_size();
        while(r < 0) {
            r += len_r;
        }
        while(r >= len_r) {
            r -= len_r
        }

        while(c < 0) {
            c += len_c
        }

        while(c >= len_c) {
            c -= len_c
        }
        return [r, c]
    }

    get_neighbours(r, c) {
        let n = 0;

        for(let i=r-1; i<=r+1; i++) {
            for(let j=c-1; j<=c+1; j++) {
                let [new_i, new_j] = this.shift_positions(i, j);
                if(this.board[new_i][new_j] == 1) {
                    n++;
                }
            }
        }

        if(this.board[r][c] == 1) {
            n -= 1;
        }

        return n;
    }

    update_cell(r, c) {
        let n_neighbours = this.get_neighbours(r, c);
        if(this.board[r][c] == 0) {
            if(n_neighbours == 3) {
                return 1;
            }
        }
        if(n_neighbours < 2 || n_neighbours > 3) {
            return 0;
        }
        return this.board[r][c];
    }

    tick() {
        let size = this.get_size();
        let temp_board = JSON.parse(JSON.stringify(this.board));
        for(let r=0; r<size[0]; r++) {
            for(let c=0; c<size[1]; c++) {
                temp_board[r][c] = this.update_cell(r, c);
            }
        }
        this.board = JSON.parse(JSON.stringify(temp_board));
        temp_board = null;
    }

}

function parse(text) {
    let lines = text.split('\n');
    for(let i=0; i<lines.length; i++) {
        lines[i] = lines[i].split(' ');
    }
    return lines;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const welcome_text = "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n0 0 0 1 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0\n0 0 0 1 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0\n0 0 0 1 0 0 0 1 0 0 1 1 0 0 1 0 0 0 1 1 0 0 0 0 0 0 0 1 1 1 1 0 0 0 1 1 0 0 1 0 0 0\n0 0 0 1 0 0 0 1 0 1 0 0 1 0 1 0 0 1 0 0 1 0 0 1 1 0 0 1 0 1 0 1 0 1 0 0 1 0 1 0 0 0\n0 0 0 1 0 1 0 1 0 1 1 1 1 0 1 0 0 1 0 0 0 0 1 0 0 1 0 1 0 1 0 1 0 1 1 1 1 0 1 0 0 0\n0 0 0 1 0 1 0 1 0 1 0 0 0 0 1 0 0 1 0 0 1 0 1 0 0 1 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0\n0 0 0 0 1 0 1 0 0 0 1 1 1 0 0 1 0 0 1 1 0 0 0 1 1 0 0 1 0 1 0 1 0 0 1 1 1 0 1 0 0 0\n0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"

const text_input = document.getElementById("game-input");
const button_load = document.getElementById("load");
const button_play = document.getElementById("play");
const button_pause = document.getElementById("pause");
const button_help = document.getElementById("help");
const game_area = document.getElementById("game-area");
const delay_slider = document.getElementById("delay-slider");
const delay_text = document.getElementById("delay-text");
const help_dialog = document.getElementById("help-dialog");
const close_dialog = document.getElementById("close-dialog");
let gb;
let run = false;
let delay = delay_slider.value;

function draw(board) {
    let [n_r, n_c] = gb.get_size();
    cell_width = Math.floor(game_area.offsetWidth/n_c);
    cell_height = Math.floor(game_area.offsetHeight/n_r);

    while (game_area.firstChild) {
        game_area.removeChild(game_area.firstChild);
    }
    
    for(let r=0; r<board.length; r++) {
        for(let c=0; c<board[0].length; c++) {
            const cell = document.createElement("div");
            cell.style.width = cell_width + "px";
            cell.style.height = cell_height + "px";
            cell.style.float = "left";
            if(board[r][c] == 1) {
                cell.classList.add("alive");
            } else if(board[r][c] == 0) {
                cell.classList.add("dead");
            } else {
                console.log("Input either 0 or 1, separated by spaces or newlines.");
            }
            game_area.appendChild(cell);
        }
        const br = document.createElement("br");
        game_area.appendChild(br);
    }
}

button_load.addEventListener("click", function () {
    gb = new GameBoard(parse(text_input.value));
    let board = gb.board;
    draw(board);
});

button_pause.addEventListener("click", function () {
    run = false;
});

button_play.addEventListener("click", function () {
    run = true;
    main();
});

delay_slider.oninput = function () {
    delay = delay_slider.value;
    delay_text.value = delay_slider.value;
}

delay_text.oninput = function () {
    delay = delay_text.value;
    delay_slider.value = delay_text.value;
}

button_help.addEventListener("click", function () {
    help_dialog.showModal();
});

close_dialog.addEventListener("click", function () {
    help_dialog.close();
});

async function main() {
    while(run) {
        while (game_area.firstChild) {
            game_area.removeChild(game_area.firstChild);
        }
        gb.tick();

        let board = gb.board;
        draw(board);

        await sleep(delay);
    };
}

function init() {
    text_input.textContent = welcome_text;
    delay_text.value = delay;
    gb = new GameBoard(parse(welcome_text));
    let board = gb.board;
    draw(board);
};

init();
