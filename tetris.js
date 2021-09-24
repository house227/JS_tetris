let can = document.getElementById("canvas");
let con = can.getContext("2d");
//ブロックのセルサイズ
const block_size = 50;

//テトリスブロックのサイズ
const tetris_block = 4;

con.fillStyle="red";
//.fillRect()で正方形の作成。引数は(X座標,Y座標,X軸大きさ,Y軸大きさ) 変数も可
con.fillRect(0,0,block_size,block_size);

//テトリスブロックの作成。 2次元配列で4x4の16マスを作る
//0が余白 1がブロック部分
let tetris = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]