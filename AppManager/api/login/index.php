<?php
	require_once("../../API.php");
	class Login extends API {
		public function GET() {
			$this->response('', 200);
		}
		public function POST() {
			$data = json_decode(file_get_contents("php://input"));
			if(isset($data->email) && $data->email == "Admin" && $data->password == "Seck") {
				$this->response('true', 200);
			} else {
				$this->response($data, 401);
			}
		}
	}
	$api = new Login();
	require_once("../../processRequest.php");
?>