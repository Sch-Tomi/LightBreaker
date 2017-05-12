<?php

    class Game extends LightController
    {

        private $game_model;

        function __construct()
        {
            parent::__construct();
            $this->game_model = $this->modelMan->load_and_create("GameModel");
        }

        public function start($id)
        {
            var_dump($id);
            var_dump($this->game_model->get($id));
        }
    }


 ?>
