<?php

    class LibManager
    {

        function __construct()
        {

        }

        function load($className){
            require_once(__DIR__."/".$className."/".lcfirst($className).".php");
        }

        function load_and_create($className){
            $this->load($className);
            return new $className();
        }

    }


 ?>
