<?php
	if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
		if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])/* && $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'GET'*/) {
			header("Pragma: no-cache");
			header("Access-Control-Allow-Origin: *");
			header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
			header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
		}
		exit;
	}
	require_once("../../Rest.inc.php");
	require_once("../../dbConnection.php");
	abstract class API extends REST {
		public $data = "";
		public $dbConnection;
		
		public function __construct() {
			parent::__construct();
			$this->dbConnection = new dbConnection();
		}
		
		public function notFound() {
			$this->response('', 404);
		}
		
		public function bind_result_array($stmt) {
			$meta = $stmt->result_metadata();
			$result = array();
			while ($field = $meta->fetch_field())
			{
				$result[$field->name] = NULL;
				$params[] = &$result[$field->name];
			}
		 
			call_user_func_array(array($stmt, 'bind_result'), $params);
			return $result;
		}
		
		public function getCopy($row) {
			return array_map(create_function('$a', 'return $a;'), $row);
		}
		
		abstract public function GET();
		
		abstract public function POST();
	}
?>