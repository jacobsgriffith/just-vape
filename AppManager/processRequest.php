<?php
	if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
		if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])/* && $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'GET'*/) {
			header('Access-Control-Allow-Origin: *');
			header('Access-Control-Allow-Headers: X-Requested-With');
		}
		exit;
	}
	$apiClass = new ReflectionClass(get_class($api));
	$methodName = $_SERVER['REQUEST_METHOD'];
	if ($apiClass->hasMethod($methodName)) {
		$method = $apiClass->getMethod($methodName);
		$method->invoke($api);
	}
	else {
		$api->notFound();
	}
?>