<?php

    class Config
    {

        public $app_folder;

        function __construct()
        {
            require(__DIR__.'/../../config/config.php');
        }

        public function get($name)
        {
            return $this->{$name};
        }
    }


 ?>
