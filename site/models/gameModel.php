<?php

    class GameModel
    {

        private $db;
        private $libMan;

        public function __construct()
        {
            $this->libMan = new LibManager;
            $this->db = $this->libMan->load_and_create("DataBase");
        }

        public function get($id)
        {
            return $this->db->select("*")->from("games")->where("id == ".$id)->execute();
        }

    }



 ?>
