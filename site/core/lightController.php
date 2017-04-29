<?php

    class LightController{

        private $libMan;

        function __construct(){
            $this->libMan = new LibManager;
            $this->view = new ViewManager;
        }

    }


 ?>
