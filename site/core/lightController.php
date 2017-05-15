<?php

    class LightController{

        protected $libMan;
        protected $modelMan;
        protected $view;

        function __construct(){
            $this->modelMan = new ModelManager;
            $this->libMan = new LibManager;
            $this->view = new ViewManager;
        }

        protected function redirect($url, $statusCode = 303)
        {
           header('Location: ' . $url, true, $statusCode);
           die();
        }

    }


 ?>
