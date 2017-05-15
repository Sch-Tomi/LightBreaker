<?php

    class GameModel{

        private $db;
        private $libMan;

        public function __construct(){
            $this->libMan = new LibManager;
            $this->db = $this->libMan->load_and_create("DataBase");
        }

        public function get($id){
            return $this->db->select("*")->from("games")->where("id == ".$id)->execute();
        }

        public function get_games(){
            return $this->db->select(array("id", "name", "difficult" ))->from("games")->execute();
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
