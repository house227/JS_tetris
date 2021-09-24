let can = document.getElementById("canvas");
let con = can.getContext("2d");
//ブロックのセルサイズ
const block_size = 50;

//テトリスブロックのサイズ
const tetris_block = 4;



//テトリスブロックの作成。 2次元配列で4x4の16マスを作る
//0が余白 1がブロック部分
let tetris = [
    [0,0,0,0],
    [1,1,0,0],
    [0,1,1,0],
    [0,0,0,0]
]

//0が余白 1がブロック部分のtetris配列をfor回してブロックを表示させる
for(let i = 0; i < tetris.length; i++){
    for(let j = 0; j < tetris.length; j++){
        if(tetris[i][j] == 1){
            //x軸の座標
            let print_x = j * block_size;
            //y軸の座標
            let print_y = i * block_size;

            con.fillStyle="red";
            //.fillRect()で正方形の作成。引数は(X座標,Y座標,X軸大きさ,Y軸大きさ) 変数も可
            con.fillRect(print_x,print_y,block_size,block_size);
        }
        
    }
}