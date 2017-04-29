<?php

    class ViewManager{

        private $template;
        private $sections;
        private $scripts;
        private $styles;

        public function __construct()
        {
            $this->sections = array();
            $this->scripts = array();
            $this->styles = array();
        }

        public function set_template($template)
        {
            $this->template = $template;
        }

        public function add_section($name, $section){
            $this->sections[$name] = $section;
        }

        public function add_script($file){
            array_push($this->scripts, $file);
        }

        public function add_style($file){
            array_push($this->styles, $file);
        }

        public function show($view, $data=''){
            require_once __DIR__."/../views/templates/".$this->template.".php";

        }

        protected function get_section($name){
            return file_get_contents(__DIR__."/../views/".$this->sections[$name].".php");
        }

        protected function get_view($name){
            return file_get_contents(__DIR__."/../views/".$name.".php");
        }

    }

 ?>
