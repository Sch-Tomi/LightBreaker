<?php

    class MenuHelperLib
    {

        private $url;

        function __construct()
        {
            $this->url = $_SERVER['REQUEST_URI'];

            echo $_SERVER['REQUEST_URI'];
        }

        public function get_menu_item_class($href)
        {
            return $this->is_fit($href) ? "current" : "";
        }

        private function is_fit($href)
        {
            return $href == $this->url;
        }
    }


 ?>
