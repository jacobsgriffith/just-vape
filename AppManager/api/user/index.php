<?php
	require_once("../../API.php");
	class User extends API {
		public function GET() {
			$user = array();
			$user['name'] = 'Admin';
			$this->response($this->json($user), 200);
		}
		public function POST() {
		}
	}
	$api = new User();
	require_once("../../processRequest.php");
?>