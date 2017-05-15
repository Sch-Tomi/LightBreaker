<?php

    class DataBase {

        private $currentDB;
        private $currentStructure;

        private $from;
        private $where;
        private $select;
        private $insert;
        private $update;

        private $queryType;


        function __construct(){
            # code...
        }

        public function where($expresson){
            $this->where = $expresson;
            return $this;
        }

        public function from($db){
            $this->from = $db;
            return $this;
        }

        public function insert_into($db){
            $this->queryType = "insert";
            $this->from = $db;
            return $this;
        }

        public function values($value){
            $this->insert = $value;
            return $this;
        }

        public function select($values) {
            $this->queryType = "select";
            $this->select = $values;
            return $this;
        }

        public function delete(){
            $this->queryType = "delete";
            return $this;
        }

        public function update($values){
            $this->queryType = "update";
            $this->update = $values;
            return $this;
        }

        public function execute(){
            $result;
            $this->read_db($this->from);
            switch ($this->queryType) {
                case 'insert':
                    $result = $this->background_insert();
                    break;
                case 'select':
                    $result = $this->background_select();
                    break;
                case 'update':
                    $result = $this->background_update();
                    break;
                case 'delete':
                    $result = $this->background_delete();
                    break;
            }
            $this->save_db();
            $this->clear();
            return $result;
        }

        public function clear() {
            $this->currentDB = "";
            $this->currentStructure = "";

            $this->from = "";
            $this->where = "";
            $this->select = "";
            $this->insert = "";
            $this->update = "";

            $this->queryType = "";
        }

        public function get_structure(){
            return $this->currentStructure;
        }

        private function read_db($db){
             $file = json_decode(file_get_contents(__DIR__."/db/".strtolower($db).".json"), true);

             $this->currentStructure = $file["structure"];
             $this->currentDB = $file["data"];
        }

        private function save_db(){

            $saveDB = array('structure' => $this->currentStructure , 'data' => $this->currentDB );

            file_put_contents(__DIR__."/db/".strtolower($this->from).".json", json_encode($saveDB ,JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK));
        }

        private function background_select(){
            $selected = [];

            foreach ($this->currentDB as $row) {
                if($this->is_fit_to_expresson($row)){

                    array_push($selected, $this->get_selected_col($row));
                }
            }
            return $selected;
        }

        private function is_fit_to_expresson($row){
            if (isset($this->where)) {
                foreach (explode("AND",$this->where) as $expresson) {
                    $explod_exp = explode(" ",trim($expresson));
                    switch ($explod_exp[1]) {
                        case '==':
                            if($row[$explod_exp[0]] != $explod_exp[2])
                                return false;
                            break;
                        case '!=':
                            if($row[$explod_exp[0]] == $explod_exp[2])
                                return false;
                            break;
                        case '>':
                            if($row[$explod_exp[0]] <= $explod_exp[2])
                                return false;
                            break;
                        case '<':
                            if($row[$explod_exp[0]] >= $explod_exp[2])
                                return false;
                            break;
                        case '>=':
                            if($row[$explod_exp[0]] < $explod_exp[2])
                                return false;
                            break;
                        case '<=':
                            if($row[$explod_exp[0]] > $explod_exp[2])
                                return false;
                            break;

                    }
                }
            }
            return true;

        }

        private function get_selected_col($row){
            $selected = array();
            if($this->select[0] == "*"){
                return $row;
            }

            foreach ($this->select as $value) {
                $selected[$value] = $row[$value];
            }

            return $selected;
        }

        private function background_insert(){
            $this->insert["id"] = $this->get_new_id();
            array_push($this->currentDB, $this->insert);
            return true;

        }

        private function get_new_id() {
            $current = 0;
            foreach ($this->currentDB as $key => $value) {
                if($value["id"] > $current){
                    $current = $value["id"];
                }
            }
            return $current + 1;
        }

        private function background_delete() {
            foreach ($this->currentDB as $key => $row) {
                if($this->is_fit_to_expresson($row)){
                    unset($this->currentDB[$key]);
                }
            }
            return true;
        }

        private function background_update(){
            foreach ($this->currentDB as $key => $row) {
                if($this->is_fit_to_expresson($row)){
                    foreach ($this->update as $key => $value) {
                        $row[$key] = $value;
                    }
                }
            }
        }

    }


 ?>
