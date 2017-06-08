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

            $config =  $this->libMan->load_and_create("Config");
            $new_url = $config->get("app_folder").$url;
            header('Location: ' . $new_url, true, $statusCode);
            die();
        }

    }


 ?>
