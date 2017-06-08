<?php

    class Admin extends LightController{

        private $authLib;
        private $gameModel;

        function __construct(){
            parent::__construct();

            $this->authLib = $this->libMan->load_and_create("AuthenticationLib");
            $this->gameModel = $this->modelMan->load_and_create("GameModel");
            $this->view->set_template("basic");

            $this->view->add_style("css/style.css");

            $this->view->add_section("menu", "sections/menu");
            $this->view->add_section("footer", "sections/footer");

            $this->authoritization();
        }

        public function adminDash(){
            $this->view->add_style("css/table.css");
            $this->view->add_style("css/adminDash.css");
            $this->view->add_script("js/adminHelper.js");
            $this->view->show("admin/dash", array('games' => $this->gameModel->get_games()  ));
        }

        public function add(){
            $this->gameModel->add($_POST);
            $this->redirect("/admin");
        }

        public function del($id){
            $this->gameModel->del($id);
            $this->redirect("/admin");
        }

        private function authoritization(){
            if (!$this->authLib->is_admin()) {
                $this->redirect("/error/403");
            }
        }

    }



 ?>
