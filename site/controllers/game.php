<?php

    class Game extends LightController
    {

        private $gameModel;

        function __construct()
        {
            parent::__construct();
            $this->gameModel = $this->modelMan->load_and_create("GameModel");

            $this->view->set_template("basic");

            $this->view->add_style("/css/style.css");
            $this->view->add_style("/css/modal.css");
            $this->view->add_style("/css/welcome.css");
            $this->view->add_style("/css/login.css");

            $this->view->add_section("menu", "sections/menu");
            $this->view->add_section("footer", "sections/footer");
        }

        public function show_games()
        {
            $this->view->add_style("/css/table.css");
            $this->view->show("games",array('games' => $this->gameModel->get_games() ));
        }

        public function start($id)
        {
            $this->view->add_script("/js/lightBreaker.js");
            $this->view->add_section("sidebar", "sections/game-sidebar");
            $this->view->show("game", array('game-data' => json_encode($this->gameModel->get($id))));
        }

        public function report()
        {
            echo join(", ", $this->gameModel->report($_POST["id"], $_POST["status"]));
        }
    }


 ?>
