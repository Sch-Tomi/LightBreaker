<?php

    class ModelManager
    {

        function __construct(){}

        function load($className){
            require_once(__DIR__."/".lcfirst($className).".php");
        }

        function load_and_create($className){
            $this->load($className);
            return new $className();
        }

    }


 ?>
