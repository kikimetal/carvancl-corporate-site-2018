<?php
// root となる url の設定
$http_protocol = empty($_SERVER["HTTPS"]) ? "http://" : "https://";
$root_url = $http_protocol . $_SERVER["HTTP_HOST"];
$root_uri = '/';

// 許可する URL
if ($_SERVER["HTTP_HOST"] === 'www.carvancl.co.jp' || $_SERVER["HTTP_HOST"] === 'carvancl.co.jp') {
  $root_url = $http_protocol . 'www.carvancl.co.jp';
  $root_uri = '/hpv2/';
}
if ($_SERVER["HTTP_HOST"] === 'www.kikimetal.com' || $_SERVER["HTTP_HOST"] === 'kikimetal.com') {
  $root_url = $http_protocol . 'www.kikimetal.com';
  $root_uri = '/hpv2/';
}

// assets ディレクトリの設定
$assets_url = $root_url . $root_uri . 'assets';

// echo "assets_url: " . $assets_url . "<br>"; // TODO: remove this

// ルーティング情報を引き出す
$routes = file_get_contents("./assets/routes.json");
$routes = mb_convert_encoding($routes, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
$routes_array = json_decode($routes, true); // 配列へ
// アクセスされたPathを取得

$request_uri = null;
if ($_SERVER["REQUEST_URI"] === $root_uri) {
  $request_uri = "/";
} else {
  // rootディレクトリ以外へのアクセスは、末尾の "/" は除去
  // $request_uri = rtrim($_SERVER["REQUEST_URI"], "/");
  $request_uri = $_SERVER["REQUEST_URI"];
  // REQUEST_URI には host 以降すべてが含まれるので ($root_uri (basename) の長さ - 1文字 ("/")) を削除
  $request_uri = substr($request_uri, (strlen($root_uri) - 1) );
}

// echo "request_uri: " . $request_uri . "<br>"; // TODO: remove this

// ルーティング。ステータスコードも返す。
$route = null;
// if (isset($routes_array[$request_uri])) {
foreach ($routes_array as $page => $value) {
  if (isset($page["uri"]) && $page["uri"] === $request_uri) {
    $route = $page;
    break;
  }
}

// ルート確立 or 失敗
if ($route) {
  http_response_code(200);
} else {
  http_response_code(404);
}

?>

<!DOCTYPE html>
<html lang="ja">
<head>
  <!-- TODO remove env production-->
  <!-- <script src="http://localhost:8097"></script> -->

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <link rel="shortcut icon" href="<?= $assets_url ?>/img/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="<?= $assets_url ?>/img/apple-touch-icon-180x180.png">
  <!-- apple-web-app -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <!-- react-helmet context meta -->
  <title><?= $route["title"] ?></title>
  <meta name="description" content="<?= $route["description"] ?>" data-react-helmet="true" />
  <link rel="canonical" href="<?= $route["canonical"] ?>" data-react-helmet="true" />

  <!-- TODO remove env production-->
    <style media="screen">
      .develop-now{
        display: block;
        position: fixed;
        right: 0;
        bottom: 0;
        width: 120px;
        height: 30px;
        background: crimson;
        color: white;
        font-size: 11px;
        font-family: Arial;
        text-align: center;
        line-height: 30px;
        border-top-left-radius: 5px;
        z-index: 999999999999999;
      }
    </style>
    <style>
    @import url('https://fonts.googleapis.com/css?family=Emblema+One|Katibeh|Vesper+Libre:900');
    body{
      /* font-family: 'Katibeh', cursive; */
      /* font-family: 'Vesper Libre', serif; */
      font-family: 'Emblema One', serif, "Helvetica Neue", Helvetica, arial, freesans, clean, sans-serif;
    }
    </style>
  <!-- TODO remove env production-->

</head>
<body>

  <!-- TODO remove env production-->
    <!-- <div class="develop-now">現在改装中です</div> -->
  <!-- TODO remove env production-->

  <div id="app"></div>
  <div id="loader">
    <div class="loader-bg-img"></div>
    <span class="loader-text">LOADING</span>
    <span class="loader-circle"></span>
  </div>

  <!-- stylesheet -->
  <!-- <link href="https://fonts.googleapis.com/css?family=Bungee+Hairline|Codystar:300,400|Fascinate|Fredericka+the+Great|Libre+Barcode+128+Text|Londrina+Outline" rel="stylesheet"> -->
  <link rel="stylesheet" href="<?= $assets_url ?>/css/bundle.css">

  <script>
    window.__ROUTES__ = <?= $routes ?>;
    window.__BASENAME__ = "<?= $root_uri ?>";
    window.__ASSETS__ = "<?= $assets_url ?>";
  </script>

  <!-- <script defer src="<?= $assets_url ?>/vender/fontawesome-all.min.js"></script> -->
  <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/all.js" integrity="sha384-xymdQtn1n3lH2wcu0qhcdaOpQwyoarkgLVxC/wZ5q7h9gHtxICrpcaSUfygqZGOe" crossorigin="anonymous"></script>

  <script defer src="<?= $assets_url ?>/js/bundle.js"></script>

</body>
</html>
