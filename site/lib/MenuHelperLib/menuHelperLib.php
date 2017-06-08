<?php

    require_once(__DIR__.'/../libManager.php');

    class MenuHelperLib
    {

        private $url;
        private $libMan;
        private $config;

        function __construct()
        {
            $this->libMan = new LibManager;
            $this->config= $this->libMan->load_and_create("Config");
            $this->url = $_SERVER['REQUEST_URI'];
        }

        public function get_menu_item_class($href)
        {
            return $this->is_fit($this->config->get("app_folder").''.$href) ? "current" : "";
        }

        private function is_fit($href)
        {
            return $href == $this->url;
        }
    }


 ?>
