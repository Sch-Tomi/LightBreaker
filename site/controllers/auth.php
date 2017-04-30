<?php

    class Auth extends LightController{

        function __construct(){
            parent::__construct();

            $this->view->set_template("basic");

            $this->view->add_style("css/style.css");
            $this->view->add_style("css/modal.css");
            $this->view->add_style("css/welcome.css");

            $this->view->add_section("menu", "sections/menu");
            $this->view->add_section("footer", "sections/footer");
        }

        public function login(){
            if (isset($_POST["email"]) && isset($_POST["password"])) {

            }else {
                $this->view->show("welcome", array('errors' => ["Hiányzó belépési adatok."] ));
            }
        }

        public function register()
        {
            $this->view->show("register");
        }

        public function do_register()
        {
            var_dump($_POST);
        }
    }


 ?>
