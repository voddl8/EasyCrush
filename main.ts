document.addEventListener('DOMContentLoaded',() =>{
    const grid = document.querySelector('.grid')
    const width :number = 8;
    const squares :HTMLDivElement[] =[];
    let score :number = 0;
    const candyColors :string[] = [
        'url(images/block_r.png)',
        'url(images/block_o.png)',
        'url(images/block_g.png)',
        'url(images/block_b.png)',
        'url(images/block_p.png)',
        'url(images/block_y.png)'
    ]


    //div 태그 생성
    function createBoard(){
        for(let i = 0; i<width*width; i++){     // 8*8 div생성
            const square :HTMLDivElement = document.createElement('div');
            square.setAttribute('draggable', 'true');
            square.setAttribute('id', ''+i);
            let randomColor :number = Math.floor(Math.random() * candyColors.length); // 랜덤 색상
            square.style.backgroundImage = candyColors[randomColor]
            if(grid instanceof HTMLElement){
                grid.appendChild(square);
                squares.push(square)
            }
            
        }
    }
    createBoard()

    let colorBeingDragged :string ;
    let colorBeingReplaced :string ;
    let squareIdBeingDragged :number ;
    let squareIdBeingReplaced :number ;



    // 모든 요소에 드래그 기능 추가
    squares.forEach(square => square.addEventListener('dragstart', dragStart));
    squares.forEach(square => square.addEventListener('dragend', dragEnd));
    squares.forEach(square => square.addEventListener('dragover', dragOver));
    squares.forEach(square => square.addEventListener('dragenter', dragEnter));
    squares.forEach(square => square.addEventListener('dragleave', dragLeave));
    squares.forEach(square => square.addEventListener('drop', dragDrop));

    function dragStart(this: HTMLElement){              // 드래그 시작시 이벤트 발생
        colorBeingDragged = this.style.backgroundImage
        squareIdBeingDragged = parseInt(this.id);
    }

    function dragEnd(this: HTMLElement){
        let validMoves = [
            squareIdBeingDragged -1,
            squareIdBeingDragged -width,
            squareIdBeingDragged +1,
            squareIdBeingDragged +width
        ]

        let validMove = validMoves.includes(squareIdBeingReplaced);

        if(squareIdBeingReplaced && validMove){
            squareIdBeingReplaced = 0;      //null 대신넣었음;
        }else if(squareIdBeingReplaced && !validMove){
            squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
        }else squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged

    }

    function dragOver(this: HTMLElement, e: DragEvent){     // 드래그한 마우스가 특정 위치에 도달할 경우 이벤트가 계속 발생
        e.preventDefault();
    }

    function dragEnter(this: HTMLElement){      // 드래그한 마우스가 특정 위치에 처음 도달할 때 이벤트 발생

    }

    function dragLeave(this: HTMLElement){      // 드래그한 마우스가 특정 위치에 처음 나갈 때 이벤트 발생

    }

    function dragDrop(this: HTMLElement){       // 드래그 후 마우스를 놓을 때 이벤트 발생
        colorBeingReplaced = this.style.backgroundImage
        squareIdBeingReplaced = parseInt(this.id);
        this.style.backgroundImage = colorBeingDragged;
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
    }

    //캔디 터트는 조건

    // 행기준 색 3개 같으면 지우기
    function checkRowForThree(){
        for(let i :number = 0; i<61; i++ ) {        // 8*8 = 64 , 64-3 = 61 
            let rowOfThree :number[] = [i, i+1, i+2]
            let decidedColor :string = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === '';
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]     //가장자리 제외
            if(notValid.includes(i)) continue;

            if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score +=3;
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundImage =''
                })
            }
        }   
    }

    // 열기준 색 3개 같으면 지우기
    function checkColumnForThree(){
        for(let i :number = 0; i<47; i++ ) {        
            let ColumnOfThree :number[] = [i, i+width, i+width*2]
            let decidedColor :string = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === '';

            if(ColumnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score +=3;
                ColumnOfThree.forEach(index => {
                    squares[index].style.backgroundImage =''
                })
            }
        }   
    }

    // 행기준 색 4개 같으면 지우기

    function checkRowForFour(){
        for(let i :number = 0; i<60; i++ ) {        // 8*8 = 64 , 64-4 = 60
            let rowOfFour :number[] = [i, i+1, i+2, i+3]
            let decidedColor :string = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === '';
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 54, 54, 55]     //가장자리 제외
            if(notValid.includes(i)) continue;

            if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score +=5;
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundImage =''
                })
            }
        }   
    }

    // 열기준 색 4개 같으면 지우기
    function checkColumnForFour(){
        for(let i :number = 0; i<39; i++ ) {        // 
            let ColumnOfFour :number[] = [i, i+width*2, i+width*3]
            let decidedColor :string = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === '';

            if(ColumnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score +=5;
                ColumnOfFour.forEach(index => {
                    squares[index].style.backgroundImage =''
                })
            }
        }   
    }

    // 캔디 떨어뜨리기

    function dropCandy(){
        for(let i :number =0; i < 55; i++ ){
            if(squares[i + width].style.backgroundImage === ''){
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
                squares[i].style.backgroundImage = '';

                const firstRow :number[] =[0,1,2,3,4,5,6,7];
                const isFirstRow :boolean = firstRow.includes(i);
                if (isFirstRow && squares[i].style.backgroundImage === ''){
                    let randomColor = Math.floor(Math.random() * candyColors.length);
                    squares[i].style.backgroundImage = candyColors[randomColor]
                }

            }
        }
    }


    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();

    window.setInterval(function(){
        dropCandy()
        checkRowForFour();
        checkColumnForFour();
        checkRowForThree();
        checkColumnForThree();
    }, 100);






})