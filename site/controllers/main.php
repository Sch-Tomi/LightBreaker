<?php


    class Main extends LightController{

        public function __construct(){
            parent::__construct();

            $this->view->set_template("basic");

            $this->view->add_style("css/style.css");
            $this->view->add_style("css/modal.css");
            $this->view->add_style("css/welcome.css");
            $this->view->add_style("css/login.css");



            $this->view->add_section("menu", "sections/menu");
            $this->view->add_section("footer", "sections/footer");
        }

        public function index(){
            $this->view->add_section("sidebar", "sections/sidebar");
            $this->view->show("welcome");

        }

    }


 ?>
