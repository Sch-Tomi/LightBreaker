<?php

    class GameModel{

        private $db;
        private $auht;
        private $libMan;

        public function __construct(){
            $this->libMan = new LibManager;
            $this->db = $this->libMan->load_and_create("DataBase");
            $this->auth = $this->libMan->load_and_create("AuthenticationLib");
        }

        public function get($id){
            return $this->db->select("*")->from("games")->where("id == ".$id)->execute();
        }

        public function get_games(){
            $games_incomplete = $this->db->select(array("id", "name", "difficult" ))->from("games")->execute();
            $games = array();
            foreach ($games_incomplete as $game) {
                $game["solves"] = count($this->db->select("*")->from("success")->where("game_id == ".$game["id"])->execute());
                if ($this->auth->is_logged()) {
                    $game["user_solved"] = count($this->db->select("*")->from("success")->where("game_id == ".$game["id"]." AND user_id == ".$this->auth->get_data_from_logged_user("id"))->execute()) > 0;
                } else {
                    $game["user_solved"] = false;
                }

                $games[] = $game;
            }

            return $games;
        }

        public function add($newLvl) {

            foreach ($newLvl as $key => $value) {
                $newLvl[$key] = $this->strip_data($value);
            }

            $newLvlObj = $this->parseLvl($newLvl["lvl"]);

            unset($newLvl["lvl"]);

            $newLvl["field"] = $newLvlObj["field"];
            $newLvl["parking"] = $newLvlObj["parking"];

            $this->db->insert_into("games")->values($newLvl)->execute();
        }

        public function del($id){
            $this->db->delete()->from("games")->where("id == ".$id)->execute();
        }

        public function report($game_id, $status)
        {
            if(isset($game_id) && isset($status) && $this->auth->is_logged() && $status == "success"){
                $this->db->insert_into("success")->values(array('user_id' => $this->auth->get_data_from_logged_user("id"),
                                                                'game_id' => $game_id))->execute();
            }
        }

        private function strip_data($data){
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

        private function parseLvl($lvl) {

            $lvl = str_replace("\r\n", " ", $lvl);

            $lvl = str_replace("[Field]", "", $lvl);
            $places = explode("[Parking]", $lvl);

            $field = explode(" ", $places[0]);
            $parking = explode(" ", $places[1]);

            return array('field' => $this->parsePlace($field), "parking" => $this->parsePlace($parking));

        }
        private function parsePlace($place){

            $placeObj = array();

            foreach ($place as $block) {
                if ($block != "") {
                    $placeObj[] = $this->parseBlock($block);
                }
            }

            return $placeObj;
        }

        private function parseBlock($block) {
            $block = explode(":", $block);

            return array("type"     => $block[0],
                         "heading"  => $block[1],
                         "col"      => $block[2],
                         "row"      => $block[3],
                         "moving"   => $block[4],
                         "rotating" => $block[5] );
        }
    }



 ?>
