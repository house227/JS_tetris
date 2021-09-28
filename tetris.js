
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

const tetris_colors = [
    //0番 空
    "#000",
    //1番 水色
    "#6CF",
    //2番 オレンジ
    "#F92",
    //3番 青
    "#66F",
    //4番 ピンク
    "#C5C",
    //5番 黄色
    "#FD2",
    //6番 赤
    "#F44",
    //7番 緑
    "#5B5"
];


//<<テトリスブロックの作成。>>

//7種類のブロック情報を保存する3次元配列を作る。
    //その中に2次元配列で4x4の16マスを作る
    //中のデータは0が余白 1がブロック部分
const tetris_types = [
    //0番 空
    [],
    //1番 I型
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    //2番 L型
    [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    //3番 J型
    [
        [0,0,1,0],
        [0,0,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    //4番 T型
    [
        [0,1,0,0],
        [0,1,1,0],
        [0,1,0,0],
        [0,0,0,0]
    ],
    //5番 O型
    [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    //6番 Z
    [
        [0,0,0,0],
        [1,1,0,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    //7番 S
    [
        [0,0,0,0],
        [0,1,1,0],
        [1,1,0,0],
        [0,0,0,0]
    ]
];

const start_x = (field_col/2) - (tetris_block / 2);
const start_y = 0;

let tetris;


//<<テトリスブロックの座標を保存する（x軸、y軸）>>
//下記のキー入力イベントによって変動する
let tetris_x = start_x;
let tetris_y = start_y;

//テトリスの形の入った3次元配列の番号を入れる変数
let tetris_pickup;
//次のテトリス番号を入れる変数
let next_tetris;


//<<フィールドの作成>>
//上記のフィールドサイズに合わせた10x20の配列をfor文で作成
//JSは２次元配列の初期化が無いのでとりあえず１次元を定義しておく。
let field = [];

//テトリスの落下速度
let game_speed = 1000;

//ゲームオーバーフラグ
let over = false;





//イニシャライズにより初期化してスタート
init();


//<<デフォルト速度で1秒に一回drop_tetrisが実行される関数>>
setInterval( drop_tetris, game_speed )


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
    //最初のテトリスの為にネクストテトリスを初期化
    next_tetris = Math.floor(Math.random() * (tetris_types.length - 1) ) + 1;

    set_tetris();
    show_all();
}

function set_tetris(){
    //ネクストテトリスを現在のテトリスにする
    tetris_pickup = next_tetris;

    //ランダムで選ばれた番号の配列が代入される
    tetris = tetris_types[tetris_pickup];

    //テトリスの番号をランダム関数で1~7選択し変数に代入してする
    //ネクスト欄に入るテトリス番号をいれる。
    next_tetris = Math.floor(Math.random() * (tetris_types.length - 1) ) + 1;

    tetris_x = start_x;
    tetris_y = start_y;
}





//<<ブロックを一つ描画する関数>>

function show_block(i, j, c){
//〇フィールド表示での呼び出しでは、ブロックが移動する必要は無し。
    //よってi,jに座標は足されていない。
//〇ブロック表示での呼び出しでは、移動の度に差分を足された変数が渡される。
    //x軸の座標 テトリスブロックのⅩ座標が増えればその分横に移動する(tetris_x + j)
    //y軸の座標　テトリスブロックのY座標が増えればその分縦に移動する(tetris_y + i)
let print_x = j * block_size;
let print_y = i * block_size;

//ブロックの色はカラー配列から引数で渡されたブロックの種類番号に応じた色を代入
con.fillStyle = tetris_colors[c];

//.fillRect()で正方形の作成。引数は(X座標,Y座標,X軸大きさ,Y軸大きさ) 変数も可
//上記の座標に対して、サイズを当てはめる
con.fillRect(print_x,print_y,block_size,block_size);

//枠を書くメソッド "～"には色を指定
con.strokeStyle = "black";
//fillRect()と同じく座標を示すメソッド。枠線の座標を示す
con.strokeRect(print_x,print_y,block_size,block_size);
}


//<<フィールドの表示>>
function show_all(){
    //  テトリスが移動するたびに前のテトリスを一度contextから消す
    //.crearRect()の引数には(開始地点のX座標,Y座標,　終了地点のX軸大きさ,Y軸大きさ)を入れる
    con.clearRect(0,0,screen_width,screen_height);

    for(let i = 0; i < field_row; i++){
        for(let j = 0; j < field_col; j++){
            if(field[i][j]){
                show_block(i, j, field[i][j], );
            }
        }
    }


//<<テトリスブロックの表示>>

    //0が余白 1がブロック部分のtetris配列をforで回してブロックを表示させる
    for(let i = 0; i < tetris_block; i++){
        for(let j = 0; j < tetris_block; j++){
            //テトリス本体の描画
            if(tetris[i][j]){
                //tetris_x,yは4x4のテトリス配列の[0][0]の位置を示すので
                //iとjのデータを足してあげないといけない。
                show_block(tetris_y + i, tetris_x + j, tetris_pickup);
            }
        }
    }
    if(over){
        let s="GAME OVER";
        con.font = "40px 'ＭＳ ゴシック'";
        let w = con.measureText(s).width;
        let x = screen_width/2 - w/2;
        let y = screen_height/2 - 20;
        con.lineWidth = 4;
        con.strokeText(s,x,y);
        con.fillStyle="white";
        con.fillText(s,x,y);
    }
}
//<<ブロックの衝突判定関数>>
//引数は移動時では(移動後のⅩ軸, 移動後のＹ軸)、回転時は(現在の位置(0), 現在の位置(0), 回転後のテトリス配列)

function check_move(move_x, move_y, check_tetris){
    //移動時と回転時で引数の数が違うので、「check_tetrisが無ければ、tetris配列を入れる」というif文を置く
    if(check_tetris == undefined){
        check_tetris = tetris;
    }
    //現在のブロックの形をそのまま次の座標に入れてみて接触するかを確認する
    for(let i = 0; i < tetris_block; i++){
        for(let j = 0; j < tetris_block; j++){
            //自分ブロックがある所のフィールドにもブロックがあるか調べるif文
            if(check_tetris[i][j]){
                //new変数に次の座標の位置を入れる
                let new_x = tetris_x + move_x + j;
                let new_y = tetris_y + move_y + i;

                //移動先の座標にブロックがあればfalse
                if(new_y < 0 || new_x < 0 || new_y >= field_row || new_x >= field_col || 
                    field[new_y][new_x]){
                    return false;
                }
            }
        }
    }
    return true;
}

//<<回転時用の関数>>
function rotate(){
    //開店後のテトリスを入れる配列。2次元の初期化は出来ないのでまず１次元
    let new_tetris = [];

    //外がY軸内がX軸
    for(let i = 0; i < tetris_block; i++){
        //作った1次元配列の[i]番目に配列を入れ、2次元配列にする。
        new_tetris[i] = [];
        for(let j = 0; j < tetris_block; j++){
            //開店後の配列のデータを入れる。
            //（新しい位置の考え方）テトリスの新しい位置を決める為に、new_tetrisの[0][0]の位置から決めないといけない。
            //new_tetris[0][0]の位置へtetris配列からデータを移さないといけないが、そのまま移すと回転していないので、
              //テトリスのブロックの現在の位置と新しい位置を図に表してみて、現在の図を90°右へ回転してみる。
            //new_tetris[0][0]にコピーするべき場所の値はtetris[0][3]のデータであるとわかるので、
              //90°回転した後の位置データを代入していく。
            //90°回転後の数値を書き出すと…新( x(0),y(0) )→旧(y(3),x(0))。(1,0)→(3,1)。(2,0)→(3,2)。(3,0)→(3,3)。
              //(0,1)→(2,0)。…
            //図がテトリスが90°時計回りするので[ i(X軸), j(Y軸) ]が[ j(Y軸), i(X軸) ]になる。
              //Y軸はそのまま使えるがX軸は[ tetris_block(中身は4) - j - 1 ]で減らしていかないといけない。
              //-1する意味は、配列が0~3の為
            new_tetris[i][j] = tetris[tetris_block - j - 1][i];
        }
    }
    return new_tetris;
}

//<<ブロックを固定する関数>>
function fix_tetris(){
    for(let i = 0; i < tetris_block; i++){
        
        for(let j = 0; j < tetris_block; j++){
            //テトリスブロックがある時
            if(tetris[i][j]){
                //現在の位置(底着きした位置)のフィールドにブロックを置く
                field[tetris_y + i][tetris_x + j] = tetris_pickup;
            }
        }
    }
}

//ラインが揃ったかチェックして消す
function check_line(){
    
    //揃ったラインを数えるカウント変数
    let line_cnt = 0
    for(let i = 0; i < field_row; i++){
        
        //真偽を保存しておく変数
        let flag = true;

        //1行ずつフィールドにラインが揃った行が存在してるか調べる多重ループ
        for(let j = 0; j < field_col; j++){
            
            //i番目の行のブロックを1つずつ見て、全て1ならラインが揃っているので通り抜ける
            //0が含まれていればbreakで抜ける。
            if(!field[i][j]){
                flag = false;
                break;
            }
        }
        //ラインが揃っていた場合のみ通る
        if(flag){
            //揃ったラインの数をカウント
            line_cnt++;

            //ラインを消す処理
            for(let y = i; y > 0; y--){
                for(let x = 0; x < field_col; x++){
                    field[y][x] = field[y-1][x];
                }
            }
        }
    }
}



//<<テトリスが1コマ落ちる関数>>
function drop_tetris(){

    //もしゲームオーバーなら処理をスキップ
    if(over) {
        return;
    }
    //キーボードで下↓を押した時と同じ動き。
    //下へ動けるか確かめてから、下に落ちている
    if(check_move(0, 1)){
        tetris_y++;
        
    //下に動けない時(底に着いた時)のelse。
    }else{

        //底/ブロックに着いた時に固定する関数
        fix_tetris();
        check_line();
        
        //底着き後、新たに乱数でブロック種類を選択
        // tetris_pickup = Math.floor(Math.random() * (tetris_types.length - 1) ) + 1;
        // tetris = tetris_types[tetris_pickup];
        set_tetris();

        //底着き後、座標をスタート地点に戻す
        tetris_x = start_x;
        tetris_y = start_y;

        //天井に着いた時の処理。引数は現在位置(0,0)(スタート地点)
            if(!check_move(0,0)){
                over = true;
            }
    }
    show_all();
}



//<<キーボード操作によるイベントの発生>>

//onkeydownは押されたキーを検知し、イベントを実行・処理を指定する際に割り込みで実行する。
//キーボード入力された時引数(e)を持って呼び出される
document.onkeydown = function(e){

    //もしゲームオーバーなら処理をスキップ
    if(over){
        return;
    }

    //どのキーが押されたかをチェックする
    switch(e.keyCode){
        //check_move関数は動けるかどうかを確認する関数で引数は(移動後のⅩ軸, 移動後のＹ軸)

        //キーコード37は「←左」
        //入力されるとtetris_xの値がマイナスされ左に移動する。
        case 37:
            if(check_move(-1, 0)){
                tetris_x--;
            }
            break;

        //キーコード38は「↑上」
                //入力されるとtetris_yの値がマイナスされ上に移動する。
        case 38:
            if(check_move(0, -1)){
                tetris_y--;
            }
            break;

        //キーコード39は「→右」
        //入力されるとtetris_xの値がマイナスされ右に移動する。
        case 39:
            if(check_move(1, 0)){
            tetris_x++;
        }
            break;

        //キーコード37は「↓下」
        //入力されるとtetris_yの値がマイナスされ下に移動する。
        case 40:
            if(check_move(0, 1)){
            tetris_y++;
        }
            break;

        //キーコード32は「スペース」
        case 32:
            //回転して大丈夫かチェックする為にまず仮の変数に回転後のテトリス配列を入れる
            let rotate_cheak_tetris = rotate();
                //if文で「現在の位置で回転して大丈夫か」を上記の衝突判定関数で調べる
                //引数は(現在の位置(0), 現在の位置(0), 回転後のテトリス配列)
            if(check_move(0, 0, rotate_cheak_tetris)){
                tetris = rotate_cheak_tetris;
            }
            break;
    }
    show_all();
}