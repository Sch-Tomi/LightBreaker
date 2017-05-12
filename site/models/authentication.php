<?php


    class AuthenticationModel
    {

        private $libMan;
        private $AuthLib;

        function __construct(){
            $this->libMan = new LibManager;
            $this->AuthLib = $this->libMan->load_and_create("AuthenticationLib");
        }

        public function register($register_datas){

            $errors = [];
            $safety_inputs=[];
            foreach ($register_datas as $key => $field) {
                $safety_inputs[$key] = $this->strip_data($field);
            }

            if(!$this->validate_datas($safety_inputs["email1"], $safety_inputs["email2"], "is_valid_email")){
                array_push($errors, "Email is not valid.");
            }

            if(!$this->validate_datas($safety_inputs["pw1"], $safety_inputs["pw2"], "is_valid_pw")){
                array_push($errors, "Password is not valid.");
            }

            if(count($errors) == 0){
                $this->AuthLib->register($safety_inputs["name"], $safety_inputs["email1"], $safety_inputs["pw1"]);
                return [true];
            }else {
                return [false, $errors];
            }

        }

        public function login($email, $pw)
        {
            $email = $this->strip_data($email);
            $pw = $this->strip_data($pw);

            $errors = [];
            if (!$this->is_valid_email($email)) {
                array_push($errors, "Email is not valid.");
            }

            if(count($errors) == 0){
                if ($this->AuthLib->login($email, $pw)) {
                    return [true];
                }else {
                    return [false, array("Bejentkezési hiba")];
                }

            }else {
                return [false, $errors];
            }
        }

        public function logout()
        {
            $this->AuthLib->logout();
        }

        private function strip_data($data){
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

        private function validate_datas($data1, $data2, $validateFunction){
            if ($this->$validateFunction($data1) &&
                $this->$validateFunction($data2) &&
                ($data1 == $data2)) {
                    return true;
            }

            return false;
        }

        private function is_valid_email($email){
            return filter_var($email, FILTER_VALIDATE_EMAIL);
        }

        private function is_valid_pw($pw){
            # http://www.cafewebmaster.com/check-password-strength-safety-php-and-regex
            return preg_match("#.*^(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$#", $pw);
        }
    }


 ?>
