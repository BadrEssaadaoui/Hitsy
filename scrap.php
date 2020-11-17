<?php
require 'vendor/autoload.php';
$httpClient = new \GuzzleHttp\Client();
$search="";
if(isset($_GET["singer"])){
  $search = $_GET["singer"];
}
$response = $httpClient->get('https://jango-index.ml/?search='.$search);

$htmlString = (string) $response->getBody();

// HTML is often wonky, this suppresses a lot of warnings
libxml_use_internal_errors(true);

$doc = new DOMDocument();
$doc->loadHTML($htmlString);
$paragraphs = $doc->getElementsByTagName('table');

//-----------------------------------------------------------------------------------

    // echo "Content of first paragraph: {$paragraphs->length}\n";
    // foreach($paragraphs->item(1)->childNodes as $node){
    //     echo $node->nodeValue;
    //     echo "\n";
    // }
  /*  
    for($i=1;$i<$paragraphs->length;$i++){
//Artist name
// echo "Artist: {$paragraphs->item(1)->childNodes->item(3)->childNodes->length}\n";
echo "Artist: {$paragraphs->item($i)->childNodes->item(3)->childNodes->item(2)->nodeValue}\n";
//song
// echo "song title: {$paragraphs->item(1)->childNodes->item(5)->childNodes->length}\n";
echo "song title: {$paragraphs->item($i)->childNodes->item(5)->childNodes->item(2)->nodeValue}\n";
//url
// echo "+++++++: {$paragraphs->item(1)->childNodes->item(1)->childNodes->length}\n";
echo "url: {$paragraphs->item($i)->childNodes->item(1)->childNodes->item(4)->nodeValue}\n";
}
*/
//------------------------------------------------------------------------
$arr=array();
for($i=1;$i<$paragraphs->length;$i++){
    array_push($arr,array(
        "song"=>$paragraphs->item($i)->childNodes->item(5)->childNodes->item(2)->nodeValue,
         "artist"=>$paragraphs->item($i)->childNodes->item(3)->childNodes->item(2)->nodeValue,
          "url"=>$paragraphs->item($i)->childNodes->item(1)->childNodes->item(4)->nodeValue));
}
echo'{"data":'. json_encode($arr).'}';