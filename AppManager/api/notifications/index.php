<?php
	require_once("../../API.php");
	class Notifications extends API {	
		public function GET() {
			$stmt = $this->dbConnection->mysqli->stmt_init();
			$stmt->prepare('CALL GetPage_Notifications(?)');
			$UserID = 1;
			$stmt->bind_param("i", $UserID);
			$stmt->execute();
			$row = $this->bind_result_array($stmt);
			
			$notifications = array();
			if(!$stmt->error) {
				while($stmt->fetch()) {
					$notification = array();
					$results = $this->getCopy($row);
					$notification['adName'] = $results['cpnName'];
					$notification['adStatus'] = ($results['ntfTypeID'] == 1 ? 'Denied' : 'Accepted');
					$notification['deniedReason'] = $results['ntfReason'];
					array_push($notifications, $notification);
				}
			}
			$this->response($this->json($notifications), 200);
		}
		public function POST() {
		}
	}
	$api = new Notifications();
	require_once("../../processRequest.php");
?>