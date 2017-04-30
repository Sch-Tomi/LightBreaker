<?php

    class DataBase extends AnotherClass{

        private $currentDB;
        private $currentStructure;

        private $from;
        private $where;

        private $queryType;


        function __construct(){
            # code...
        }

        public function where($expresson){
            $this->where = $expresson;
        }

        public function from($db){
            $this->from = $db;
        }

        public function insert($values){
            $this->queryType = "insert";
        }

        public function select($values) {
            $this->queryType = "select";
        }

        public function delete(){
            $this->queryType = "delete";
        }

        public function update($values){
            $this->queryType = "update";
        }

        private function read_db($db){
             $this->currentDB = json_decode(file_get_contents(__DIR__."/db/".strtolower($db).json), true);
        }

        private function save_db(){
            file_put_contents(json_encode($this->currentDB,JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK));
        }
    }


 ?>
