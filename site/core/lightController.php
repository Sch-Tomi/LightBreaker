<?php

    class LightController{

        private $libMan;

        function __construct(){
            $this->modelMan = new ModelManager;
            $this->libMan = new LibManager;
            $this->view = new ViewManager;
        }

    }


 ?>
