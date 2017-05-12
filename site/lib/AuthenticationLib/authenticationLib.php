<?php

    require_once(__DIR__.'/../libManager.php');

    class AuthenticationLib{


        private $db;
        private $libMan;

        public function __construct(){
            $this->libMan = new LibManager;
            $this->db = $this->libMan->load_and_create("DataBase");
        }

        public function register($name,$email,$pw){

            $new_user = array();
            $new_user["name"] = $name;
            $new_user["email"] = $email;
            $new_user["password"] = $this->hash_pw($pw);


            $this->db->insert_into("user")->values($new_user)->execute();
        }

        public function login($email, $pw){
            $search = $this->db->from("user")->select("*")->where("email == ".$email." AND password == ".$this->hash_pw($pw))->execute();
            if(count($search) == 1){
                $this->safety_start_session();
                $_SESSION['username'] = $email;
                $_SESSION['admin'] = ($email == "admin@admin.hu");
                return true;
            }
            return false;
        }

        public function is_logged(){
            $this->safety_start_session();
            return (isset($_SESSION["username"]));
        }

        public function is_admin(){
            $this->safety_start_session();
            return ($this->is_logged() && $_SESSION['admin']);
        }

        public function logout(){
            $this->safety_start_session();
            unset($_SESSION["username"]);
            unset($_SESSION["admin"]);
        }

        private function hash_pw($pw) {
            return hash("sha256", $pw);
        }

        private function safety_start_session(){
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }
        }
    }


 ?>
