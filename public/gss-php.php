<?php

const GSSID = "17emL3haHaFgGzw8B8C_lXHTZIK_9K9zE0nILAPJn7-0";

// $request_data_arr = $_GET;
if (!empty($_GET) || !empty($_GET["sheetName"])) {
  // URL文字列を日本語にデコード
  $sheetName = urldecode($_GET["sheetName"]);
  $sheet_data_json_obj = getJSONfromGSS($sheetName, $_GET, GSSID);
  response_json($sheet_data_json_obj);
} else {
  response_json(null);
}


// Google Sheets API v3 を利用
// 指定したスプレッドシートIDのスプレッドシートの指定したシートのセル情報をJSONで引っこ抜く。WEBに公開が必要。共有設定は不要。
function getJSONfromGSS($sheetName, $request_data_arr, $gssid) {
  // 未入力処理
  if (empty($sheetName) || empty($gssid)) return false;

  $url = "https://spreadsheets.google.com/feeds/worksheets/" . $gssid . "/public/basic?alt=json";
  $json_str = file_get_contents($url);
  // エラー処理
  if (empty($json_str)) return false;

  // 文字エンコード処理後、JSON文字列をPHPオブジェクトへ変換
  $json_str = mb_convert_encoding($json_str, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
  $json_obj = json_decode($json_str);

  // オブジェクト内の必要なデータ(entry)を取り出す
  $entry = $json_obj->feed->entry;

  // ターゲット($sheetName)になってる名前のシートのシートIDが入っているURIを調べる
  $targetSheetIdURI = null;
  foreach ($entry as $sheet) {
    if ($sheet->title->{'$t'} === $sheetName) {
      $targetSheetIdURI = $sheet->id->{'$t'};
      // echo "success<hr>";
      break;
    }
  }

  // エラー処理
  if (!$targetSheetIdURI) {
    // echo "not found<hr>";
    return false;
  }

  // URIから最後の '/' の後のstring (sheetID に当たる文字列) をとる
  $targetSheetId = substr(strrchr($targetSheetIdURI, '/'), 1);
  // echo $targetSheetId;

  // ターゲットのシートからセル情報を取得
  $url = 'https://spreadsheets.google.com/feeds/list/' . $gssid . '/' . $targetSheetId . '/public/values?alt=json';
  $json_str = file_get_contents($url);
  // エラー処理
  if (empty($json_str)) return false;

  // 文字エンコード処理後、JSON文字列をPHPオブジェクトへ変換
  $json_str = mb_convert_encoding($json_str, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
  $json_obj = json_decode($json_str);

  // オブジェクト内の必要なデータ(entry)を取り出す
  $entry = $json_obj->feed->entry;

  $gsx_arr = [];
  foreach ($request_data_arr as $key => $none_value) {
    // $gsx_key = 'gsx$' . $key;
    // $gsx_arr[$gsx_key] = '';
    $gsx_arr[$key] = 'gsx$' . $key;
  }

  // $request_data_arr (どのプロパティ(カラム)が欲しいかの配列) を元にレスポンスする情報群を生成
  $modified_rows = [];
  foreach ($entry as $entry_row) {
    $modified_row = [];
    foreach ($gsx_arr as $original_key => $gsx_key) {
      if (empty($entry_row->$gsx_key)) continue;
      $modified_row[$original_key] = $entry_row->$gsx_key->{'$t'};
    }
    if (empty($modified_row)) continue;
    array_push($modified_rows, $modified_row);
  }

  // 空の場合要求したものが一つも無かったということなので、エラー処理
  if (empty($modified_rows)) return false;

  // そうでなければ配列を返す
  return $modified_rows;

} // function getJSONfromGSS


// 与えられた object をもとに json string をレスポンスする
function response_json($obj) {
  if (!empty($obj)) {

    http_response_code(200);
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($obj);

  } else {
    http_response_code(404);
  }
}
