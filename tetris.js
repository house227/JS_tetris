//<<変数の定義>>

//ブロックのセルサイズ
const block_size = 30;

//テトリスブロックのサイズ
const tetris_block = 4;

//フィールドのサイズ　ゲームが動くフィールド
//横サイズ10行
const field_col = 10;
//縦サイズ20行
const field_row = 20;

//スクリーンのサイズ
const screen_width = 300;
const screen_height = 600;

//HTMLのcanvasのエレメント(idなど)の取得
let can = document.getElementById("canvas");
//canvasを取得したcanに対して描画する為の変数
let con = can.getContext("2d");

//HTMLのcanvas要素のプロパティにwidthとheightにキャンバスのサイズを代入
can.width = screen_width;
can.height = screen_height;
can.style.border = "4px solid #555"

//<<テトリスブロックの作成。>>

//2次元配列で4x4の16マスを作る
//0が余白 1がブロック部分
let tetris = [
    [0,0,0,0],
    [1,1,0,0],
    [0,1,1,0],
    [0,0,0,0]
];

//テトリスブロックの座標を保存する（x軸、y軸）
//下記のキー入力イベントによって変動する
let tetris_x = 0;
let tetris_y = 0;

//<<フィールドの作成>>
//上記のフィールドサイズに合わせた10x20の配列をfor文で作成
//JSは２次元配列の初期化が無いのでとりあえず１次元を定義しておく。
let field = [];

//フィールド本体の初期化関数
function init(){
    //10x20のフィールド配列のループ
    for(let i =0; i < field_row; i++){
        //1次元配列field[i]に配列を入れる事で2次元配列にする。
        field[i] = []; 
        for(let j = 0; j < field_col; j++){
            field[i][j] = 0;
        }
    }
}


init();
show_field();
move_tetris();



//<<ブロックを一つ描画する関数>>
function show_block(i, j){
//〇フィールド表示での呼び出しでは、ブロックが移動する必要は無し。
    //よってi,jに座標は足されていない。
//〇ブロック表示での呼び出しでは、移動の度に差分を足された変数が渡される。
    //x軸の座標 テトリスブロックのⅩ座標が増えればその分横に移動する(tetris_x + j)
    //y軸の座標　テトリスブロックのY座標が増えればその分縦に移動する(tetris_y + i)
let print_x = j * block_size;
let print_y = i * block_size;

con.fillStyle = "red";
//.fillRect()で正方形の作成。引数は(X座標,Y座標,X軸大きさ,Y軸大きさ) 変数も可
//上記の座標に対して、サイズを当てはめる
con.fillRect(print_x,print_y,block_size,block_size);

//枠を書くメソッド "～"には色を指定
con.strokeStyle = "black";
//fillRect()と同じく座標を示すメソッド。枠線の座標を示す
con.strokeRect(print_x,print_y,block_size,block_size);
}


//<<フィールドの表示>>
function show_field(){
    //  テトリスが移動するたびに前のテトリスを一度contextから消す
    //.crearRect()の引数には(開始地点のX座標,Y座標,　終了地点のX軸大きさ,Y軸大きさ)を入れる
    con.clearRect(0,0,screen_width,screen_height);

    for(let i = 0; i < field_row; i++){
        for(let j = 0; j < field_col; j++){
            if(field[i][j]){
                show_block(i, j);
            }
        }
    }
}

//<<テトリスブロックの表示>>
function move_tetris(){

    //0が余白 1がブロック部分のtetris配列をforで回してブロックを表示させる
    for(let i = 0; i < tetris.length; i++){
        for(let j = 0; j < tetris.length; j++){
            if(tetris[i][j] == 1){
                show_block(tetris_y+i, tetris_x+j);
            }
        }
    }
}
function check_move(move_x, move_y){
    //現在のブロックの形をそのまま次の座標に入れてみて接触するかを確認する
    for(let i = 0; i < tetris_block; i++){
        for(let j = 0; j < tetris_block; j++){
            //new変数に次の座標の位置を入れる
            let new_x = tetris_x + move_x + j;
            let new_y = tetris_y + move_y + i;
            //テトリスブロックがある時
            if(tetris[i][j]){
                //移動先の座標にブロックがあればfalse
                if(field[new_y][new_x])return false;
            }
        }
    }
    return true;
}


//<<キーボード操作によるイベントの発生>>

//onkeydownは押されたキーを検知し、イベントを実行・処理を指定する際に割り込みで実行する。
//キーボード入力された時引数(e)を持って呼び出される
document.onkeydown = function(e){

    //どのキーが押されたかをチェックする
    switch(e.keyCode){
        //check_move関数は動けるかどうかを確認する関数で引数は(移動するⅩ軸,　移動するＹ軸)

        //キーコード37は「←左」
        //入力されるとtetris_xの値がマイナスされ左に移動する。
        case 37:
            if(check_move(-1, 0))tetris_x--;
            break;

        //キーコード38は「↑上」
                //入力されるとtetris_yの値がマイナスされ上に移動する。
        case 38:
            if(check_move(0, -1))tetris_y--;
            break;

        //キーコード39は「→右」
        //入力されるとtetris_xの値がマイナスされ右に移動する。
        case 39:
            if(check_move(1, 0))tetris_x++;
            break;

        //キーコード37は「↓下」
        //入力されるとtetris_yの値がマイナスされ下に移動する。
        case 40:
            if(check_move(0, 1))tetris_y++;
            break;

        //キーコード32は「スペース」
        case 32:
            break;
    }
    show_field();
    move_tetris();
}