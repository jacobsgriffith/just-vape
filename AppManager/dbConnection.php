<?php
	class dbConnection {
		const DB_SERVER = "mysql51-159.perso";
		const DB_USER = "fadboardbiz";
		const DB_PASSWORD = "xBNx6qcE";
		const DB = "fadboardbiz";
		private $db = NULL;
		public $mysqli = NULL;
		
		public function __construct() {
			$this->dbConnect();
		}

		private function dbConnect() {
			$this->mysqli = new mysqli(self::DB_SERVER, self::DB_USER, self::DB_PASSWORD, self::DB);
		}
		
		public function executeQuery($sql) {
			if (mysqli_connect_errno()) {
				die(printf('MySQL Server connection failed: %s', mysqli_connect_error()));
			}
			if ($this->mysqli->multi_query($sql)) {			
				do {
					// Lets work with the first result set
					if ($result = $this->mysqli->use_result())
					{
						// Loop the first result set, reading it into an array
						while ($row = $result->fetch_array(MYSQLI_ASSOC))
						{
							//ANYTHING YOU PRINT IN THIS FILE, CAN BE READ BACK 
							echo $row['cpnName'];
						}
						// Close the result set
						$result->close();
					}
				} while ($this->mysqli->next_result());
			} else {
				mysqli_connect_errno();
				echo mysql_error();
				echo mysql_errno();
			}
		}
	}
?>