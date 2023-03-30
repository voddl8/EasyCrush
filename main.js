"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const width = 8;
    const squares = [];
    let score = 0;
    const candyColors = [
        'url(images/block_r.png)',
        'url(images/block_o.png)',
        'url(images/block_g.png)',
        'url(images/block_b.png)',
        'url(images/block_p.png)',
        'url(images/block_y.png)'
    ];
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.setAttribute('draggable', 'true');
            square.setAttribute('id', '' + i);
            let randomColor = Math.floor(Math.random() * candyColors.length); // 0~5 랜덤
            square.style.backgroundImage = candyColors[randomColor];
            if (grid instanceof HTMLElement) {
                grid.appendChild(square);
                squares.push(square);
            }
        }
    }
    createBoard();
    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;
    // 드래그 기능
    squares.forEach(square => square.addEventListener('dragstart', dragStart));
    squares.forEach(square => square.addEventListener('dragend', dragEnd));
    squares.forEach(square => square.addEventListener('dragover', dragOver));
    squares.forEach(square => square.addEventListener('dragenter', dragEnter));
    squares.forEach(square => square.addEventListener('dragleave', dragLeave));
    squares.forEach(square => square.addEventListener('drop', dragDrop));
    function dragStart() {
        colorBeingDragged = this.style.backgroundImage;
        squareIdBeingDragged = parseInt(this.id);
        console.log(colorBeingDragged);
        console.log(this.id, 'dragstart');
    }
    function dragEnd() {
        console.log(this.id, 'dragend');
        let validMoves = [
            squareIdBeingDragged - 1,
            squareIdBeingDragged - width,
            squareIdBeingDragged + 1,
            squareIdBeingDragged + width
        ];
        let validMove = validMoves.includes(squareIdBeingReplaced);
        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = 0; //null 대신넣었음;
        }
        else if (squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
        }
        else
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    }
    function dragOver(e) {
        e.preventDefault();
        console.log(this.id, 'dragover');
    }
    function dragEnter() {
        console.log(this.id, 'dragenter');
    }
    function dragLeave() {
        console.log(this.id, 'dragleave');
    }
    function dragDrop() {
        console.log(this.id, 'drop');
        colorBeingReplaced = this.style.backgroundImage;
        squareIdBeingReplaced = parseInt(this.id);
        this.style.backgroundImage = colorBeingDragged;
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
    }
    //캔디 터트는 조건
    // 행기준 색 3개 같으면 지우기
    function checkRowForThree() {
        for (let i = 0; i < 61; i++) { // 8*8 = 64 , 64-3 = 61 
            let rowOfThree = [i, i + 1, i + 2];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === '';
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]; //가장자리 제외
            if (notValid.includes(i))
                continue;
            if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 3;
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundImage = '';
                });
            }
        }
    }
    // 열기준 색 3개 같으면 지우기
    function checkColumnForThree() {
        for (let i = 0; i < 47; i++) { // 8*8 = 64 , 64-3 = 61 
            let ColumnOfThree = [i, i + width, i + width * 2];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === '';
            if (ColumnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 3;
                ColumnOfThree.forEach(index => {
                    squares[index].style.backgroundImage = '';
                });
            }
        }
    }
    // 행기준 색 4개 같으면 지우기
    function checkRowForFour() {
        for (let i = 0; i < 60; i++) { // 8*8 = 64 , 64-3 = 61 
            let rowOfFour = [i, i + 1, i + 2, i + 3];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === '';
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 54, 54, 55]; //가장자리 제외
            if (notValid.includes(i))
                continue;
            if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 5;
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundImage = '';
                });
            }
        }
    }
    // 열기준 색 4개 같으면 지우기
    function checkColumnForFour() {
        for (let i = 0; i < 47; i++) { // 8*8 = 64 , 64-3 = 61 
            let ColumnOfFour = [i, i + width * 2, i + width * 3];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === '';
            if (ColumnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 5;
                ColumnOfFour.forEach(index => {
                    squares[index].style.backgroundImage = '';
                });
            }
        }
    }
    // 캔디 떨어뜨리기
    function dropCandy() {
        for (let i = 0; i < 55; i++) {
            if (squares[i + width].style.backgroundImage === '') {
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
                squares[i].style.backgroundImage = '';
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
                const isFirstRow = firstRow.includes(i);
                if (isFirstRow && squares[i].style.backgroundImage === '') {
                    let randomColor = Math.floor(Math.random() * candyColors.length);
                    squares[i].style.backgroundImage = candyColors[randomColor];
                }
            }
        }
    }
    checkRowForFour();
    //checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
    window.setInterval(function () {
        dropCandy();
        checkRowForFour();
        //checkColumnForFour();
        checkRowForThree();
        checkColumnForThree();
    }, 100);
});
