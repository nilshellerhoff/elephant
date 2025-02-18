<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://www.reddit.com/api/v1/access_token',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => file_get_contents('php://input'),
  CURLOPT_HTTPHEADER => array(
    'User-Agent: elephant-app',
    'Content-Type: application/x-www-form-urlencoded',
    'Accept-Encoding: gzip, deflate, br',
    "Authorization: {$_SERVER['HTTP_AUTHORIZATION']}",
  ),
));

$response = curl_exec($curl);
curl_close($curl);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: *');

echo $response;