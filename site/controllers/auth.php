<?php

    class Auth extends LightController{

        private $auth;

        function __construct(){
            parent::__construct();

            $this->auth = $this->modelMan->load_and_create("AuthenticationModel");

            $this->view->set_template("basic");

            $this->view->add_style("/css/style.css");
            $this->view->add_style("/css/modal.css");
            $this->view->add_style("/css/welcome.css");
            $this->view->add_style("/css/login.css");

            $this->view->add_section("menu", "sections/menu");
            $this->view->add_section("footer", "sections/footer");
        }

        public function login() {
            $this->view->show("login");
        }

        public function do_login(){
            if (isset($_POST["email"]) && isset($_POST["password"])) {
                $loginResult = $this->auth->login($_POST["email"], $_POST["password"]);
                var_dump($loginResult);
                if ($loginResult[0]) {
                    $this->redirect("/game");
                }else {
                    $this->view->show("welcome", array('errors' => $loginResult[1] ));
                }
            }else {
                $this->view->show("welcome", array('errors' => ["Hiányzó belépési adatok."] ));
            }
        }

        public function register(){
            $this->view->show("register");
        }

        public function do_register(){
            $result = $this->auth->register([
                "name" => $_POST["name"],
                "email1" => $_POST["email1"],
                "email2" => $_POST["email2"],
                "pw1" => $_POST["pw1"],
                "pw2" => $_POST["pw2"]
            ]);

            var_dump($result);

            if ($result[0]) {
                $this->view->show("login");
            }

        }

        public function logout() {
            $this->auth->logout();
            $this->redirect('/');
        }


    }


 ?>
